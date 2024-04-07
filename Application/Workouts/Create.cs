using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Workouts
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
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
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, System.Threading.CancellationToken cancellationToken)
            {
                _context.Workouts.Add(request.Workout!);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create workout");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}