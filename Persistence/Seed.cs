using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Workouts.Any()) return;
            var workouts = new List<Domain.Workout>
            {
                new Domain.Workout
                {
                    Title = "Upper Body Workout",
                    Description = "Workout 1 Description",
                    Category = "Category 1",
                    Date = DateTime.Now.AddMonths(-2),
                    //Difficulty = "Beginner"
                },
                new Domain.Workout
                {
                    Title = "Lower Body Workout",
                    Description = "Workout 2 Description",
                    Category = "Category 2",
                    Date = DateTime.Now.AddMonths(-1),
                    //Difficulty = "Intermediate"
                },
                new Domain.Workout
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