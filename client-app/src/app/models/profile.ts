import { User } from "./user";

export interface Profile {
	username: string;
	displayName: string;
	image?: string;
	bio?: string;
	following?: boolean;
	followersCount?: number;
	followingCount?: number;
}

export class Profile implements Profile {
	constructor(user: User) {
		this.username = user.username;
		this.displayName = user.displayName;
		this.image = user.image;
	}
}