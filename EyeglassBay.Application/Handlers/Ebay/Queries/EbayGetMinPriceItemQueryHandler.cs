using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Application.Core;
using EyeglassBay.Domain.Models;
using EyeglassBay.Infrastructure.EbayParser;
using MediatR;

namespace EyeglassBay.Application.Handlers
{
    public class EbayGetMinPriceItemQueryHandler
    {
        public class Query : IRequest<Result<EbayProductItem>>
        {
            public string SearchString { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<EbayProductItem>>
        {
            private readonly EbayParser _ebayParser;

            public Handler(EbayParser ebayParser)
            {
                _ebayParser = ebayParser;
            }

            public async Task<Result<EbayProductItem>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ebayItems = await _ebayParser.GetMinPricedItemAsync(request.SearchString);
                return Result<EbayProductItem>.Success(ebayItems);
            }
        }
    }
}