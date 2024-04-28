import axios, { AxiosError, AxiosResponse } from "axios";
import { Workout, WorkoutFormValues } from "../models/workout";
import { toast } from "react-toastify";
import eventEmitter from "../../features/emitter/eventEmitter";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { Photo, Profile } from "../models/profile";

const sleep =(delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(config => {
	const token = store.commonStore.token;
	if (token) config.headers
		.Authorization = `Bearer ${token}`;
	return config;
})

axios.interceptors.response.use(async response => {
	return response;
}, (error: AxiosError) => {
	const {data, status, config} = error.response as AxiosResponse;
	switch(status) {
		case 400: 
			if(typeof data === 'string') {
				toast.error(data);
			}
			if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
				eventEmitter.emit('redirect', '/not-found');
			}
			if (data.errors) {
				const modalStateErrors = [];
				for (const key in data.errors) {
					if (data.errors[key]) {
						modalStateErrors.push(data.errors[key])
					}
				}
				// eventEmitter.emit('redirect', '/workouts');
				// toast.error(data);
				throw modalStateErrors.flat();
			}
			break;
		case 401:
			toast.error('unauthorized');
			break;
		case 404:
			eventEmitter.emit('redirect', '/not-found');
			break;
		case 500:
			store.commonStore.setServerError(data);
			eventEmitter.emit('redirect', '/server-error');
			break;
	}
	return Promise.reject(error);
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
	create: (workout: WorkoutFormValues) => requests.post<void>('/workouts', workout),
	update: (workout: WorkoutFormValues) => requests.put<void>(`/workouts/${workout.id}`, workout),
	delete: (id: string) => requests.del<void>(`/workouts/${id}`),
	attend: (id: string) => requests.post<void>(`/workouts/${id}/like`, {})
};

const Account = {
	current: () => requests.get<User>('/account'),
	login: (user: UserFormValues) => requests.post<User>('/account/login', user),
	register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Profiles = {
	get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
	uploadPhoto: (photo: Blob) => {
		let formData = new FormData();
		formData.append('File', photo);
		return axios.post<Photo>('photos', formData, {
			headers: {'Content-type': 'multipart/form-data'}
		});
	},
	// setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
	// deletePhoto: (id: string) => requests.del(`/photos/${id}`),
	updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile),
	// follow: (username: string) => requests.post(`/profiles/${username}/follow`, {}),
	// unfollow: (username: string) => requests.del(`/profiles/${username}/follow`),
	// listFollowings: (username: string, predicate: string) => requests.get<Profile[]>(`/profiles/${username}/follow?predicate=${predicate}`)
}

const agent = {
	Workouts,
	Account,
	Profiles
};


export default agent;