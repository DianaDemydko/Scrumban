using Microsoft.AspNetCore.Mvc;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class ErrorThrowController: Controller

    {
        [HttpGet]
        [Route("Throw404")]
        public IActionResult Throw404()
        {
            throw new Startup.HttpException(404, "File Not Found");
        }

        [HttpGet]
        [Route("Throw401")]
        public IActionResult Throw401()
        {
            throw new Startup.HttpException(401,"UnAutorized");
        }
        [HttpGet]
        [Route("Throw400")]
        public IActionResult Throw400()
        {
            throw new Startup.HttpException(400, "BadRequest");
        }

        [HttpGet]
        [Route("Throw403")]
        public IActionResult Throw403()
        {
            throw new Startup.HttpException(403, "Forbiden");
        }

    }
}
