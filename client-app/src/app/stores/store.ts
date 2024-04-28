import { createContext, useContext } from "react";
import WorkoutStore from "./workoutStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";

interface Store{
	workoutStore: WorkoutStore;
	commonStore: CommonStore;
	userStore: UserStore;
	modalStore: ModalStore;
	profileStore: ProfileStore;
}

export const store: Store = {
	workoutStore: new WorkoutStore(),
	commonStore: new CommonStore(),
	userStore: new UserStore(),
	modalStore: new ModalStore(),
	profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore(){
	return useContext(StoreContext);
}
