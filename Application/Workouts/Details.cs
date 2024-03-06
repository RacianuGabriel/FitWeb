using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Workouts
{
    public class Details
    {
        public class Query : IRequest<Workout>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Workout>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Workout> Handle(Query request, System.Threading.CancellationToken cancellationToken)
            {
                return await _context.Workouts.FindAsync(request.Id);
            }
        }
    }
}