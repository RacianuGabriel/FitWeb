namespace Domain
{
    public class Workout
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string Category { get; set; } = "";
        public DateTime Date { get; set; }

        public string Difficulty { get; set; } = "";

        public bool IsLiked { get; set; } = false;

        public ICollection<WorkoutAttendee> Attendees { get; set; } = new List<WorkoutAttendee>();

    }
}