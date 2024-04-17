using Application.Workouts;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [AllowAnonymous]
    public class WorkoutsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetWorkouts()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkout(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]

        public async Task<IActionResult> CreateWorkout(Workout workout)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Workout = workout }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorkout(Guid id, Workout workout)
        {
            workout.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { Workout = workout }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkout(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}