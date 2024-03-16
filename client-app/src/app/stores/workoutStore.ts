import { makeAutoObservable, runInAction } from "mobx";
import { Workout } from "../models/workout";
import agent from "../api/agent";

export default class WorkoutStore{
	workoutRegistry = new Map<string, Workout>();
	selectedWorkout: Workout | undefined = undefined;
	editMode = false;
	submitting = false;
	loadingInitial = false;

	constructor(){
		makeAutoObservable(this)
	}

	get workoutsByDate(){
		return Array.from(this.workoutRegistry.values()).sort((a, b) => 
			Date.parse(a.date) - Date.parse(b.date));
	}

	loadWorkouts = async () => {
		this.setLoadingInitial(true);

		try{
		  	const workouts = await agent.Workouts.list();
			workouts.forEach(workout => {
				this.setWorkout(workout);
			})
			this.setLoadingInitial(false);
		} catch (error){
			console.log(error);
			this.setLoadingInitial(false);
		}
	}
	
	loadWorkout = async (id: string) => {
		let workout = this.getWorkout(id);
		if(workout){
			this.selectedWorkout = workout;
			return workout;
		} else {
			this.setLoadingInitial(true);
			try{
				workout = await agent.Workouts.details(id);
				runInAction(() => {
					if (workout) {
						this.selectedWorkout = workout;
						this.setWorkout(workout);
					}
					this.setLoadingInitial(false);
				})
				return workout;
			} catch (error){
				console.log(error);
				this.setLoadingInitial(false);
			}
		}
	}

	private getWorkout = (id: string) => {
		return this.workoutRegistry.get(id);
	}

	private setWorkout = (workout: Workout) => {
		workout.date = workout.date.split('T')[0];
		this.workoutRegistry.set(workout.id, workout);
	}

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	}

	createWorkout = async (workout: Workout) => {
		this.submitting = true;
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