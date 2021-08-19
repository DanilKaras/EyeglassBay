using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Application.Handlers.Ebay.Queries;
using EyeglassBay.Infrastructure.EbayParser.Models;
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
            var query = new EbayGetQueryItemsHandler.Query { SearchString = searchString };
            var result = await Mediator.Send(query, cancellationToken);
            return HandleResult(result);
        }
    }
}