import { createContext, useContext } from "react";
import WorkoutStore from "./workoutStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";

interface Store{
	workoutStore: WorkoutStore;
	commonStore: CommonStore;
	userStore: UserStore;
	modalStore: ModalStore;
}

export const store: Store = {
	workoutStore: new WorkoutStore(),
	commonStore: new CommonStore(),
	userStore: new UserStore(),
	modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore(){
	return useContext(StoreContext);
}
