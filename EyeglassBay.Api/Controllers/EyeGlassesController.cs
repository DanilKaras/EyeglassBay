using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EyeglassBay.Application.Handlers;
using EyeglassBay.Domain.Entities;


namespace EyeglassBay.Api.Controllers
{
    public class EyeGlassesController : BaseApiController
    {

        public EyeGlassesController()
        {
        }
        [HttpGet]
        public async Task<ActionResult<List<EyeGlass>>> GetEyeGlasses(CancellationToken cancellationToken)
        {
            var query = new EyeGlassesGetQueryHandler.Query();
            var result = await Mediator.Send(query, cancellationToken);
            return HandleResult(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EyeGlass>> GetEyeGlassById(Guid id, CancellationToken cancellationToken)
        {
            var query = new EyeGlassGetByIdQueryHandler.Query {Id = id};
            var result = await Mediator.Send(query, cancellationToken);
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEyeGlass([FromBody]EyeGlass eyeGlass, CancellationToken cancellationToken)
        {
            var command = new EyeGlassCreateCommandHandler.Command {EyeGlass = eyeGlass};
            var result = await Mediator.Send(command, cancellationToken);
            return HandleResult(result);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditEyeGlass(Guid id, EyeGlass eyeGlass, CancellationToken cancellationToken)
        {
            eyeGlass.Id = id;
            var command = new EyeGlassEditCommandHandler.Command {EyeGlass = eyeGlass};
            var result = await Mediator.Send(command, cancellationToken);
            return HandleResult(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEyeGlass(Guid id, CancellationToken cancellationToken)
        {
            var command = new EyeGlassDeleteCommandHandler.Command {Id = id};
            var result = await Mediator.Send(command, cancellationToken);
            return HandleResult(result);
        }
    }
}