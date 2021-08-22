using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Application.Handlers;
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
        
        [HttpGet("{searchString}")]
        public async Task<ActionResult<EbayProductItem>> GetItems(string searchString, CancellationToken cancellationToken)
        {
            var query = new EbayGetItemsQueryHandler.Query { SearchString = searchString };
            var result = await Mediator.Send(query, cancellationToken);
            return HandleResult(result);
        }
        
        [HttpGet("min/{searchString}")]
        public async Task<ActionResult<EbayProductItem>> GetMinItem(string searchString, CancellationToken cancellationToken)
        {
            var query = new EbayGetMinPriceItemQueryHandler.Query { SearchString = searchString };
            var result = await Mediator.Send(query, cancellationToken);
            return HandleResult(result);
        }
    }
}