using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, System.Threading.CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var attendee = new WorkoutAttendee
                {
                    AppUser = user!,
                    Workout = request.Workout!,
                    IsHost = true
                };

                request.Workout!.Attendees.Add(attendee);

                _context.Workouts.Add(request.Workout!); 
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create workout");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}