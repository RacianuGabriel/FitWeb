using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;

namespace Application.Workouts
{
    public class WorkoutDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string Category { get; set; } = "";
        public DateTime Date { get; set; }

        public string Difficulty { get; set; } = "";

        public string HostUsername { get; set; }
        
        public bool IsLiked { get; set; }
        public ICollection<Profile> Attendees { get; set; }
    }
}