using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Workouts
{
    public class List
    {
        public class Query : IRequest<Result<List<Workout>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Workout>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Workout>>> Handle(Query request, System.Threading.CancellationToken cancellationToken)
            {
                return Result<List<Workout>>.Success( await _context.Workouts.ToListAsync());
            }
        }
    }
}