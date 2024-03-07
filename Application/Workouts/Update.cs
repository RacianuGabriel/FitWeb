using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Workouts
{
    public class Update
    {
        public class Command : IRequest
        {
            public Workout? Workout { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly Persistence.DataContext _context;
            private readonly IMapper _mapper;

            public Handler(Persistence.DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, System.Threading.CancellationToken cancellationToken)
            {
                var workout = await _context.Workouts.FindAsync(request.Workout.Id);
                _mapper.Map(request.Workout, workout);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}