using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Workout> Workouts { get; set; }
        public DbSet<WorkoutAttendee> WorkoutAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<WorkoutAttendee>(x => x.HasKey(aa => new {aa.AppUserId, aa.WorkoutId}));

            builder.Entity<WorkoutAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Workouts)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<WorkoutAttendee>()
                .HasOne(a => a.Workout)
                .WithMany(u => u.Attendees)
                .HasForeignKey(a => a.WorkoutId);
        }
    }
}