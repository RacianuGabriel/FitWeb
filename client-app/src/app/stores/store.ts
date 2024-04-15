import { createContext, useContext } from "react";
import WorkoutStore from "./workoutStore";
import CommonStore from "./commonStore";

interface Store{
	workoutStore: WorkoutStore;
	commonStore: CommonStore;
}

export const store: Store = {
	workoutStore: new WorkoutStore(),
	commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore(){
	return useContext(StoreContext);
}
