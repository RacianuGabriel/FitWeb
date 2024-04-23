using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostOrAdminRequirement : IAuthorizationRequirement
    {

    }

    public class IsHostOrAdminRequirementHandler : AuthorizationHandler<IsHostOrAdminRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsHostOrAdminRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostOrAdminRequirement requirement)
        {
            if (context.User.HasClaim(ClaimTypes.Role, "Admin"))
            {
                context.Succeed(requirement);
            }

            var userID = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userID == null) return Task.CompletedTask;

            var workoutID = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues["id"].ToString());

            var attendee = _dbContext.WorkoutAttendees
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.AppUserId == userID && x.WorkoutId == workoutID)
                .Result;

            if (attendee == null) return Task.CompletedTask;

            if (attendee.IsHost) context.Succeed(requirement);



            return Task.CompletedTask;
        }
    }
}