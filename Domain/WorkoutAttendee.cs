using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{

    public class WorkoutAttendee
    {
        public string AppUserId { get; set; } = "";
        public AppUser AppUser { get; set; } = null!;
        public Guid WorkoutId { get; set; }
        public Workout Workout { get; set; } = null!;
        public bool IsHost { get; set; }
    }
}