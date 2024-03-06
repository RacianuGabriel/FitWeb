using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Workouts
{
    public class Create
    {
        public class Command : IRequest
        {
            public Workout? Workout { get; set; }
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
                _context.Workouts.Add(request.Workout!);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}