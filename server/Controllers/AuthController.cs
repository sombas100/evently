using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly FirebaseService _firebaseService;

        public AuthController(FirebaseService firebaseService)
        {
            _firebaseService = firebaseService;
        }

        [HttpPost("verify-token")]
        public async Task<IActionResult> VerifyToken([FromBody] string idToken)
        {
            try
            {
                var uid = await _firebaseService.VerifyToken(idToken);
                return Ok(new { uid });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An unexpected error occurred.", details = ex.Message });
            }
        }
    }
}
