using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using server.Data;
using server.Models;


namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetEvents()
        {
            var events = _context.Events.ToList();
            return Ok(events);
        }

        [HttpPost]
        [Authorize]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult CreateEvent([FromBody] Event newEvent)
        {
            var userIsAdmin = User.Claims.FirstOrDefault(c => c.Type == "IsAdmin")?.Value;

            if (userIsAdmin == "false")
            {
                return Forbid("You are not authorized to create events.");
            }

            if (newEvent.Date.Kind == DateTimeKind.Unspecified)
            {
                newEvent.Date = DateTime.SpecifyKind(newEvent.Date, DateTimeKind.Utc);
            }
            else
            {
                newEvent.Date = newEvent.Date.ToUniversalTime();
            }
            _context.Events.Add(newEvent);
            _context.SaveChanges();
            return Ok(newEvent);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult UpdateEvent(int id, [FromBody] Event updatedEvent)
        {
            var eventInDb = _context.Events.Find(id);
            if (eventInDb == null)
            {
                Console.WriteLine($"Event with ID {id} not found.");
                return NotFound();
            }

            eventInDb.Title = updatedEvent.Title;
            eventInDb.Description = updatedEvent.Description;
            eventInDb.Date = (updatedEvent.Date.Kind == DateTimeKind.Unspecified)
            ? DateTime.SpecifyKind(updatedEvent.Date, DateTimeKind.Utc)
            : updatedEvent.Date.ToUniversalTime();
            eventInDb.Location = updatedEvent.Location;

            _context.SaveChanges();
            return Ok(eventInDb);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult DeleteEvent(int id)
        {
            var eventInDb = _context.Events.Find(id);
            if (eventInDb == null) return NotFound();

            _context.Events.Remove(eventInDb);
            _context.SaveChanges();
            return Ok();
        }
    }
}