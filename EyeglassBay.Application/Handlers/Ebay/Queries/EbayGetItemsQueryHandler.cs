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
    public class EbayGetItemsQueryHandler
    {
        public class Query : IRequest<Result<IList<EbayProductItem>>>
        {
            public string SearchString { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IList<EbayProductItem>>>
        {
            private readonly EbayParser _ebayParser;

            public Handler(EbayParser ebayParser)
            {
                _ebayParser = ebayParser;
            }

            public async Task<Result<IList<EbayProductItem>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ebayItems = await _ebayParser.GetItemsAsync(request.SearchString);
                return Result<IList<EbayProductItem>>.Success(ebayItems);
            }
        }
    }
}