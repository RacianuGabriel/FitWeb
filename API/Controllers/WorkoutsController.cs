using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Workouts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API.Controllers
{
    public class WorkoutsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Workout>>> GetWorkouts()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Workout>> GetWorkout(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]

        public async Task<IActionResult> CreateWorkout(Workout workout)
        {
            return Ok(await Mediator.Send(new Create.Command { Workout = workout }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorkout(Guid id, Workout workout)
        {
            workout.Id = id;
            return Ok(await Mediator.Send(new Update.Command { Workout = workout }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkout(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}