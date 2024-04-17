import { createContext, useContext } from "react";
import WorkoutStore from "./workoutStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store{
	workoutStore: WorkoutStore;
	commonStore: CommonStore;
	userStore: UserStore;
}

export const store: Store = {
	workoutStore: new WorkoutStore(),
	commonStore: new CommonStore(),
	userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore(){
	return useContext(StoreContext);
}
