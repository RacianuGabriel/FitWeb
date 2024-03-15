import axios, { AxiosResponse } from "axios";
import { Workout } from "../models/workout";

const sleep =(delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async response => {
	await sleep(2000);
	return response;
}, (error) => {
	const {data, status, config} = error.response;
	if (status === 404) {
		throw error;
	}
	if (status === 400 && config.method === 'get') {
		return data;
	}
	if (status === 500) {
		console.log(data);
	}
	throw error;
});

const responseBody =<T> (response: AxiosResponse<T>) => response.data;

const requests = {
	get:<T> (url: string) => axios.get<T>(url).then(responseBody),
 	post:<T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Workouts = {
	list: () => requests.get<Workout[]>('/workouts'),
	details: (id: string) => requests.get<Workout>(`/workouts/${id}`),
	create: (workout: Workout) => requests.post<void>('/workouts', workout),
	update: (workout: Workout) => requests.put<void>(`/workouts/${workout.id}`, workout),
	delete: (id: string) => requests.del<void>(`/workouts/${id}`)
};

const agent = {
	Workouts
};


export default agent;