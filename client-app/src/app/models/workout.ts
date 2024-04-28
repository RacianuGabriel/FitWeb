import { Profile } from "./profile"

export interface Workout {
	id: string
	title: string
	description: string
	category: string
	date: Date
	difficulty: string
	hostUsername: string
	isLiked: boolean
	isGoing: boolean
	isHost: boolean
	host?: Profile
	attendees: Profile[]
  }
  
export class WorkoutFormValues {
	id?: string = undefined;
	title: string = '';
	description: string = '';
	category: string = '';
	date?: Date | null = null;
	difficulty: string = '';


	constructor(workout?: WorkoutFormValues) {
		if(workout) {
			this.id = workout.id;
			this.title = workout.title;
			this.description = workout.description;
			this.category = workout.category;
			this.date = workout.date;
			this.difficulty = workout.difficulty;
		}
	}
}

export class Workout implements Workout {
	constructor(init?: WorkoutFormValues) {
		Object.assign(this, init);
	}
}