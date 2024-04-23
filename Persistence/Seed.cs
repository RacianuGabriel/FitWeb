using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.Roles.Any())
            {
                var roles = new List<IdentityRole>
                {
                    new IdentityRole{Name = "Member"},
                    new IdentityRole{Name = "Admin"},
                    new IdentityRole{Name = "Trainer"}
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
            }

            if (!userManager.Users.Any() && !context.Workouts.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "trainer@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "admin@test.com"
                    }
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
                await userManager.AddToRoleAsync(users[0], "Member");
                await userManager.AddToRoleAsync(users[1], "Trainer");
                await userManager.AddToRoleAsync(users[2], "Admin");


                var workouts = new List<Workout>
                {
                    new Workout
                    {
                        Title = "Upper Body Workout",
                        Description = "Workout 1 Description",
                        Category = "Category 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Difficulty = "Beginner",
                        Attendees = new List<WorkoutAttendee>
                            {
                                new WorkoutAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                }
                            }
                    },
                    new Workout
                    {
                        Title = "Lower Body Workout",
                        Description = "Workout 2 Description",
                        Category = "Category 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Difficulty = "Intermediate",
                        Attendees = new List<WorkoutAttendee>
                            {
                                new WorkoutAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new WorkoutAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                }
                            }
                    },
                    new Workout
                    {
                        Title = "Cardio Workout",
                        Description = "Workout 3 Description",
                        Category = "Category 3",
                        Date = DateTime.Now.AddMonths(-5),
                        Difficulty = "Advanced",
                        Attendees = new List<WorkoutAttendee>
                            {
                                new WorkoutAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = true
                                },
                                new WorkoutAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = false
                                }
                            }
                    }
                };

                await context.Workouts.AddRangeAsync(workouts);
                await context.SaveChangesAsync();
            }
        }
    }
}