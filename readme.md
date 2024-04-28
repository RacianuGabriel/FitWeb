# Fitweb

## Description

This project is a fitness application that allows users to track their workouts. It uses ASP.NET Core for the backend, React for the frontend, and PostgreSQL for the database.

### Frontend

On the frontend i used react, bootstrap and axios (for handling the connections)

### Backend

On the backend i used ASP.Net with multiple packets such as:

- EntityFramework for database connection
- IdentityUser for users tables
- AutoMapper for maping atributes between classes
  etc

The Backend project is structured on 5 diffrent projects

- Api where the connection between the server and client take place
- Application where i put the business logic
- Domain where the application entities are defined
- Infrastructure where there are some services defined
- Persistence where i saved the database migrations

### Database

For the database i chose PostgreSQL

## Installation

1. Github repository: `https://github.com/RacianuGabriel/FitWeb`
2. Navigate to the project directory: `cd API` for dotnet `cd client-app` for react
3. Install the dependencies: `dotnet restore` for the backend and `npm install` for the frontend.
4. Start the backend server: `dotnet run`
5. Start the frontend server: `npm start`

or

enter on `4b6e-2a0d-5600-5d-3001-a138-4a07-55a7-cffb.ngrok-free.app`

## Flow

The first page is a homepage where there are 4 options (login/signup/start training/learn more)
the learn more page contains a carousel and a short description about the site
login credential for testing: bob@test.com Pa$$w0rd(membru normal)
							  admin@test.com Pa$$w0rd(admin)

after we login we can observe 3 elements (navmenu/ content/ footer)

On the navmenu we have the option of creating a new workout or to view our profile

on the content we can see the workouts ordered by the difficulty tier and if we click them we are redirected to the detailed page of the workout

on the footer we find general information such as the location a short description and a map seted to our address

if we go to the profile page we can observe the workout that we liked and the workouts we created, also we can edit our general information

if we log in as the admin we have another option of editing the users

on the details page we can like an workout or (if we are the creator or the admin) we can edit or delete them
