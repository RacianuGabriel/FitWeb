using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Workouts
{
    public class Details
    {
        public class Query : IRequest<Result<Workout>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Workout>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Workout>> Handle(Query request, System.Threading.CancellationToken cancellationToken)
            {
                var workout= await _context.Workouts.FindAsync(request.Id);

                return Result<Workout>.Success(workout);
            }
        }
    }
}