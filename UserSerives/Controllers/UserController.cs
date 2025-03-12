using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserSerives.Data;
using UserSerives.Models;

namespace UserSerives.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _db;

        public UserController(AppDbContext db)
        {
            _db = db;
        }

        // GET list of userd
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return Ok(_db.Users);
        }

        // get user by id
        [HttpGet("{id}")]
        public ActionResult<User> GetUserById(string id)
        {
            var user = _db.Users.Find(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


      

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public ActionResult DeleteUser(int id)
        {
            var user = _db.Users.Find(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            _db.Users.Remove(user);
            return NoContent();
        }
    }
}

