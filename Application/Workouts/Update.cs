using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;

namespace Application.Workouts
{
    public class Update
    {
        public class Command : IRequest <Result<Unit>>
        {
            public Workout? Workout { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {

                RuleFor(x => x.Workout).SetValidator(new WorkoutValidator());

            }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly Persistence.DataContext _context;
            private readonly IMapper _mapper;

            public Handler(Persistence.DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, System.Threading.CancellationToken cancellationToken)
            {
                var workout = await _context.Workouts.FindAsync(request.Workout.Id);
                _mapper.Map(request.Workout, workout);

                if(workout == null)
                    return Result<Unit>.Failure("Workout not found");

                var result = await _context.SaveChangesAsync() > 0;
                if (result) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Failed to update workout");
            }
        }
    }
}