import { makeAutoObservable, runInAction } from "mobx";
import { Workout } from "../models/workout";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class WorkoutStore{
	workoutRegistry = new Map<string, Workout>();
	selectedWorkout: Workout | undefined = undefined;
	editMode = false;
	submitting = false;
	loadingInitial = true;

	constructor(){
		makeAutoObservable(this)
	}

	get workoutsByDate(){
		return Array.from(this.workoutRegistry.values()).sort((a, b) => 
			Date.parse(a.date) - Date.parse(b.date));
	}

	loadWorkouts = async () => {
		try{
		  	const workouts = await agent.Workouts.list();
		  	runInAction(() => {
		  		this.workoutRegistry.clear(); 
				workouts.forEach(workout => {
					workout.date = workout.date.split('T')[0];
					this.workoutRegistry.set(workout.id, workout);
				})
			})
				this.setLoadingInitial(false);
			} catch (error){
				console.log(error);
				this.setLoadingInitial(false);
			}
	  }

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	}

	selectWorkout = (id: string) => {
		this.selectedWorkout = this.workoutRegistry.get(id);
	}

	cancelSelectedWorkout = () => {
		this.selectedWorkout = undefined;
	}

	openForm = (id?: string ) => {
		id ? this.selectWorkout(id) : this.cancelSelectedWorkout();
		this.editMode = true;
	}

	closeForm = () => {
		this.editMode = false;
	}

	createWorkout = async (workout: Workout) => {
		this.submitting = true;
		workout.id = uuid();
		try{
			await agent.Workouts.create(workout);
			runInAction(() => {
				this.workoutRegistry.set(workout.id, workout);
				this.submitting = false;
				this.editMode = false;
			})
		} catch (error){
			console.log(error);
			runInAction(() => {
				this.submitting = false;
			})
		}
	}

	updateWorkout = async (workout: Workout) => {
		this.submitting = true;
		try{
			await agent.Workouts.update(workout);
			runInAction(() => {
				this.workoutRegistry.set(workout.id, workout);
				this.selectedWorkout = workout;
				this.submitting = false;
				this.editMode = false;
			})
		} catch (error){
			console.log(error);
			runInAction(() => {
				this.submitting = false;
			})
		}
	}

	deleteWorkout = async (id: string) => {
		this.submitting = true;
		try{
			await agent.Workouts.delete(id);
			runInAction(() => {
				this.workoutRegistry.delete(id);
				this.submitting = false;
				this.selectedWorkout = undefined;
			})
		} catch (error){
			console.log(error);
			runInAction(() => {
				this.submitting = false;
			})
		}
	}
}