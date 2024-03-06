using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;

namespace Application.Workouts
{
    public class Update
    {
        public class Command : IRequest
        {
            public Workout ?Workout { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly Persistence.DataContext _context;
            public Handler(Persistence.DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, System.Threading.CancellationToken cancellationToken)
            {
                var workout = await _context.Workouts.FindAsync(request.Workout.Id);
                if (workout == null)
                {
                    throw new Exception("Could not find workout");
                }
                workout.Title = request.Workout.Title ?? workout.Title;
                workout.Description = request.Workout.Description ?? workout.Description;
                workout.Date = request.Workout.Date;
                workout.Category = request.Workout.Category ?? workout.Category;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}