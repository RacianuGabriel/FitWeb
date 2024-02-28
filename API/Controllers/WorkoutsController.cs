using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class WorkoutsController : BaseApiController
    {
        private readonly DataContext _context;
        public WorkoutsController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Workout>>> GetWorkouts()
        {
            return await _context.Workouts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Workout>> GetWorkout(Guid id)
        {
            var workout = await _context.Workouts.FindAsync(id);

            return workout;
        }
    }
}