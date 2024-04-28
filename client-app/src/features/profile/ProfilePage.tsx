import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import LoadingComponent from '../../app/layout/LoadingComponent';
import WorkoutCard from '../workouts/dashboard/WorkoutCard';
import ProfileLiked from './ProfileLiked';
import ProfileOriginals from './ProfileOriginals';
import ModalContainer from '../../app/common/modals/ModalContainer';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';
import ProfileEdit from './ProfileEdit';

export default observer( function ProfilePage() {

	const {username} = useParams<{username:string}>();
	const {profileStore, workoutStore, userStore: {user}, modalStore} = useStore();
	const {loadProfile, loadingProfile, profile} = profileStore;
	const workoutByAttendee = workoutStore.workoutByAttendee(username!);
	const workoutsByHostname = workoutStore.workoutsByHostname(username!);
	const [activeTab, setActiveTab] = useState('Liked');


	useEffect(() => {
		if (username) loadProfile(username);
	}, [loadProfile, username]);

	if (loadingProfile) return <LoadingComponent content='Loading profile...' />
	else return (
		<div className="body">
		<div className="header__wrapper">
		<header></header>
		<div className="cols__container">
		  <div className="left__col">
			<div className="img__container">
			  <img src={profile?.image || '/assets/user.png'}
			   onClick={() => modalStore.openModal(<PhotoUploadWidget/>)} />
			  <span></span>
			</div>
			<h2>{profile?.displayName}</h2>
			<p>Member</p>
			<p>test@test.com</p>
  
			<ul className="about">
			  <li><span>4,073</span>Followers</li>
			  <li><span>322</span>Following</li>
			  <li><span>200,543</span>Likes</li>
			</ul>
  
			<div className="content">
			  <p>
				{profile?.bio || 'No bio'}
			  </p>
			</div>
		  </div>
		  <div className="right__col">
			<nav>
			  <ul>
					<li><a href="#" onClick={() => setActiveTab('Liked')}>Liked</a></li>
					<li><a href="#" onClick={() => setActiveTab('Original')}>Original</a></li>
					{/* <li><a href="#" onClick={() => setActiveTab('Followers')}>Followers</a></li>
					<li><a href="#" onClick={() => setActiveTab('Following')}>Following</a></li> */}
					{
						user?.role === "Admin" &&
						<>
							<li><a href="#" onClick={() => setActiveTab('Users')}>Users</a></li>
							{/* <li><a href="#" onClick={() => setActiveTab('Workouts')}>Workouts</a></li> */}
						</>
					}
			  </ul>
			  {
				username===user?.username ?
				<button onClick={() => setActiveTab('Edit')}>Edit Profile</button> :
				<button>Follow</button>
			  }
			</nav>
			{activeTab === 'Liked' && <ProfileLiked workouts={workoutByAttendee} />}
			{activeTab === 'Original' && <ProfileOriginals workouts={workoutsByHostname} />}
			{activeTab === 'Followers' && <div>Followers Panel</div>}
			{activeTab === 'Following' && <div>Following Panel</div>}
			{activeTab === 'Users' && <div>Users Panel</div>}
			{activeTab === 'Workouts' && <div>Workouts Panel</div>}
			{activeTab === 'Edit' && <ProfileEdit setActiveTab={setActiveTab}/>}
			
		  </div>
		</div>
	  </div>
	  </div>
  );
})