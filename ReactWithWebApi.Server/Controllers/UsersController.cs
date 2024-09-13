using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Text.Json;

namespace ReactWithWebApi.Server.Controllers
{
    [Route("/api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        [Route("/users/all")]
        public IActionResult Index()
        {
            var response = new { message = "Hello from GetUsers" };
            return Ok(response);
        }


        [HttpPost]
        [Route("/user/{id:int}")]
        public IActionResult PostUser(int id)
        {
            var response = new { message = "Hello from userzxc " + id };
            return Ok(response);
        }


        [HttpGet]
        [Route("/user/details")]
        public IActionResult GetUserDetails()
        {
            var response = new { message = "User Details...." };
            return Ok(response);
        }


        [HttpGet]
        public IActionResult GetEmployeeUsers()
        {
            var response = new { message = "Employee Users...." };
            return Ok(response);
        }
    }
}
