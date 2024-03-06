using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Workouts
{
    public class List
    {
        public class Query : IRequest<List<Workout>> { }

        public class Handler : IRequestHandler<Query, List<Workout>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Workout>> Handle(Query request, System.Threading.CancellationToken cancellationToken)
            {
                return await _context.Workouts.ToListAsync();
            }
        }
    }
}