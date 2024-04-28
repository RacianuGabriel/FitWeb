import { makeAutoObservable, runInAction } from "mobx";
import { Workout, WorkoutFormValues } from "../models/workout";
import agent from "../api/agent";
import { store } from "./store";
import { Profile } from "../models/profile";

export default class WorkoutStore{
	workoutRegistry = new Map<string, Workout>();
	selectedWorkout: Workout | undefined = undefined;
	editMode = false;
	submitting = false;
	loadingInitial = false;
	

	constructor(){
		makeAutoObservable(this)
	}

	get attendeesNumber(){

		if(this.selectedWorkout?.isLiked ) return this.selectedWorkout?.attendees?.length;
		return this.selectedWorkout?.attendees?.length!-1;
	}

	get workoutsByDate(){
		return Array.from(this.workoutRegistry.values()).sort((a, b) => 
			a.date.getTime() - b.date.getTime());
	}

	get workoutsByHostname() {
		return (hostname: string) => {
			return Array.from(this.workoutRegistry.values()).filter(workout => workout.hostUsername === hostname);
		}
	  }
	
	get workoutByAttendee() {
		return (username: string) => {
			return Array.from(this.workoutRegistry.values()).filter(workout => 
				workout.attendees?.some(a => a.username === username) &&
				!(workout.hostUsername === username && workout.isLiked === false)
			  );
		}
	}

	get workoutsByDifficulty() {
		return Array.from(this.workoutRegistry.values()).sort((a, b) => {
			const difficultyLevels = {
				'Beginner': 1,
				'Intermediate': 2,
				'Advanced': 3
			};
	
			return difficultyLevels[a.difficulty as keyof typeof difficultyLevels] - difficultyLevels[b.difficulty as keyof typeof difficultyLevels];
		});
	}
	get groupedWorkouts() {
		return Object.entries(
			this.workoutsByDifficulty.reduce((workouts, workout) => {
				const difficulty = workout.difficulty;
				workouts[difficulty] = workouts[difficulty] ? [...workouts[difficulty], workout] : [workout];
				return workouts;
			}, {} as {[key: string]: Workout[]})
		)
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
						this.setWorkout(workout);
						this.selectedWorkout = this.getWorkout(workout.id);
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
		const user = store.userStore.user;
		if(user) {
			workout.isGoing = workout.attendees?.some(
				a => a.username === user.username
			)
			workout.isHost = workout.hostUsername === user.username;
			workout.host = workout.attendees?.find(x => x.username === workout.hostUsername);
			if(workout.isHost) workout.isGoing = workout.isLiked;
		}
		workout.date = new Date(workout.date);
		this.workoutRegistry.set(workout.id, workout);
	}

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	}

	createWorkout = async (workout: WorkoutFormValues) => {
		const user = store.userStore.user;
		const attendee = new Profile(user!);
		try{
			await agent.Workouts.create(workout);
			const newWorkout = new Workout(workout);
			newWorkout.hostUsername = user?.username!;
			newWorkout.attendees = [attendee];
			this.setWorkout(newWorkout);
			runInAction(() => {
				this.selectedWorkout = newWorkout;
			})
		} catch (error){
			console.log(error);
			return error;
		}
	}

	updateWorkout = async (workout: WorkoutFormValues) => {
		try{
			await agent.Workouts.update(workout);
			runInAction(() => {
				if(workout.id) {
					let updatedWorkout = {...this.getWorkout(workout.id), ...workout};
					this.workoutRegistry.set(workout.id, updatedWorkout as Workout);
					this.selectedWorkout = updatedWorkout as Workout;
				}
			})
		} catch (error){
			console.log(error);
			return error;
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

	updateAttendence = async () => {
		const user = store.userStore.user;
		this.submitting = true;
		try{
			await agent.Workouts.attend(this.selectedWorkout!.id);
			runInAction(() => {
				if(this.selectedWorkout?.isHost){
					if(this.selectedWorkout?.isGoing){
						this.selectedWorkout.isGoing = false;
						this.selectedWorkout.isLiked = false;
					} else {
						this.selectedWorkout!.isGoing = true;
						this.selectedWorkout!.isLiked = true;
					}
				} else {
					if(this.selectedWorkout?.isGoing){
						this.selectedWorkout.attendees = this.selectedWorkout.attendees?.filter(
							a => a.username !== user?.username
						);
						this.selectedWorkout.isGoing = false;
					} else {
						const attendee = new Profile(user!);
						this.selectedWorkout?.attendees?.push(attendee);
						this.selectedWorkout!.isGoing = true;
					}
				}
				
				this.workoutRegistry.set(this.selectedWorkout!.id, this.selectedWorkout!);
			})
		} catch (error){
			console.log(error);
		} finally {
			runInAction(() => {
				this.submitting = false;
			})
		}
	}
}