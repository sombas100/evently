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
            _context.Events.Add(newEvent);
            _context.SaveChanges();
            return Ok(newEvent);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult UpdateEvent(int id, [FromBody] Event updatedEvent)
        {
            var eventInDb = _context.Events.Find(id);
            if (eventInDb != null) return NotFound();

            eventInDb.Title = updatedEvent.Title;
            eventInDb.Description = updatedEvent.Description;
            eventInDb.Date = updatedEvent.Date;
            eventInDb.Location = updatedEvent.Location;

            _context.SaveChanges();
            return Ok(eventInDb);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult DeleteEvent(int id)
        {
            var eventInDb = _context.Events.Find(id);
            if (eventInDb != null) return NotFound();

            _context.Events.Remove(eventInDb);
            _context.SaveChanges();
            return Ok();
        }
    }
}