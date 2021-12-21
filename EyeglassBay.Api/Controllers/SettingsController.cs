using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Application.Handlers;
using EyeglassBay.Application.Handlers.Settings.Commands;
using EyeglassBay.Domain.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace EyeglassBay.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetItems(CancellationToken cancellationToken)
        {
            var query = new SettingsGetQueryHandler.Query();
            var result = await Mediator.Send(query, cancellationToken);
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateSettings([FromBody] List<SettingsDto> settings,
            CancellationToken cancellationToken)
        {
            var command = new SettingsEditCommandHandler.Command {EbayStoreSettings = settings};
            var result = await Mediator.Send(command, cancellationToken);
            return HandleResult(result);
        }
        
        [HttpGet("Coefficient")]
        public async Task<ActionResult> GetItemCoefficient(CancellationToken cancellationToken)
        {
            var query = new SettingsGetCoefficientQueryHandler.Query();
            var result = await Mediator.Send(query, cancellationToken);
            return HandleResult(result);
        }
    }
}