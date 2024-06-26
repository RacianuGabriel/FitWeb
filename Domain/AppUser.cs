using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; } = "";

        public string Bio { get; set; } = "";

        public ICollection<WorkoutAttendee> Workouts { get; set; } = new List<WorkoutAttendee>();

        public ICollection<Photo> Photos { get; set; } = new List<Photo>();
        
    }
}