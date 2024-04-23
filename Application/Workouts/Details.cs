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
    public class Details
    {
        public class Query : IRequest<Result<WorkoutDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<WorkoutDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<WorkoutDto>> Handle(Query request, System.Threading.CancellationToken cancellationToken)
            {
                var workout= await _context.Workouts
                    .ProjectTo<WorkoutDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<WorkoutDto>.Success(workout);
            }
        }
    }
}