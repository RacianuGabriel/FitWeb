using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Workouts
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>?> Handle(Command request, System.Threading.CancellationToken cancellationToken)
            {
                var workout = await _context.Workouts.FindAsync(request.Id);
                if (workout == null)
                    return null;
                _context.Remove(workout);
                var result = await _context.SaveChangesAsync();
                if (result == 0)
                    return Result<Unit>.Failure("Failed to delete workout");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}