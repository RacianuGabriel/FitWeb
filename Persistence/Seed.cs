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
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
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
                        Email = "tom@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    }
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

            }
            if (context.Workouts.Any()) return;
            var workouts = new List<Workout>
            {
                new Workout
                {
                    Title = "Upper Body Workout",
                    Description = "Workout 1 Description",
                    Category = "Category 1",
                    Date = DateTime.Now.AddMonths(-2),
                    //Difficulty = "Beginner"
                },
                new Workout
                {
                    Title = "Lower Body Workout",
                    Description = "Workout 2 Description",
                    Category = "Category 2",
                    Date = DateTime.Now.AddMonths(-1),
                    //Difficulty = "Intermediate"
                },
                new Workout
                {
                    Title = "Cardio Workout",
                    Description = "Workout 3 Description",
                    Category = "Category 3",
                    Date = DateTime.Now.AddMonths(-5),
                    //Difficulty = "Advanced"
                }
            };

            await context.Workouts.AddRangeAsync(workouts);
            await context.SaveChangesAsync();
        }
    }
}