using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Application.Handlers;
using EyeglassBay.Domain.DTOs;
using EyeglassBay.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EyeglassBay.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class EbaySearchController : BaseApiController
    {
        public EbaySearchController()
        {
            
        }
        
        [HttpGet]
        public async Task<ActionResult<EbayProductItem>> GetItems([FromQuery]EbayRequestDto search, CancellationToken cancellationToken)
        {
            var query = new EbayGetItemsQueryHandler.Query
            {
                EbayRequest = search
            };
            var result = await Mediator.Send(query, cancellationToken);
            return HandleResult(result);
        }
        
        [HttpGet("min")]
        public async Task<ActionResult<EbayProductItem>> GetMinItem([FromQuery]EbayRequestDto search, CancellationToken cancellationToken)
        {
            var query = new EbayGetMinPriceItemQueryHandler.Query 
            {
                EbayRequest = search
            };
            var result = await Mediator.Send(query, cancellationToken);
            return HandleResult(result);
        }
    }
}