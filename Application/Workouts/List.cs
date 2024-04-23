using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Workouts
{
    public class List
    {
        public class Query : IRequest<Result<List<WorkoutDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<WorkoutDto>>>
        {
            private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<WorkoutDto>>> Handle(Query request, System.Threading.CancellationToken cancellationToken)
            {
                var workouts = await _context.Workouts
                    .ProjectTo<WorkoutDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<WorkoutDto>>.Success(workouts);
            }
        }
    }
}