using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;
using SQLitePCL;
using Application.Activities;


namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(){
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id){
            return await Mediator.Send(new Details.Query(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddActivity(Activity activity){
            await Mediator.Send(new Create.Command(){ Activity = activity});
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateActivity(Activity activity){
            await Mediator.Send(new Edit.Command(){Activity = activity});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            await Mediator.Send(new Delete.Command(){Id=id});
            return Ok();
        }
    }
}