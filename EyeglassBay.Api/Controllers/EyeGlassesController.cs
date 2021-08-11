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
            var query = new GetEyeGlassesQueryHandler.Query();
            var result = await Mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EyeGlass>> GetEyeGlassById(Guid id, CancellationToken cancellationToken)
        {
            var query = new GetEyeGlassByIdQueryHandler.Query {Id = id};
            var result = await Mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}