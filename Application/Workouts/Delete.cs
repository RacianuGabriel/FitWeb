using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Workouts
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, System.Threading.CancellationToken cancellationToken)
            {
                var workout = await _context.Workouts.FindAsync(request.Id);
                if (workout == null)
                    throw new Exception("Could not find workout");
                _context.Remove(workout);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}