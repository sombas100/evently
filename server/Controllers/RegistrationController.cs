using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using server.Data;
using server.Models;
using System.Security.Claims;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RegistrationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        public IActionResult RegisterForEvent([FromBody] int eventId)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var registration = new Registration
            {
                UserId = userId,
                EventId = eventId,
                RegistrationDate = DateTime.UtcNow
            };

            _context.Registrations.Add(registration);
            _context.SaveChanges();
            return Ok("Registered successfully");
        }

        [HttpGet("user")]
        [Authorize]
        public IActionResult GetUserRegistrations()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var registrations = _context.Registrations
            .Where(r => r.UserId == userId)
            .Select(r => new { r.Event.Title, r.RegistrationDate })
            .ToList();

            return Ok(registrations);
        }
    }
}