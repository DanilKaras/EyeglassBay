using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Application.Core;
using EyeglassBay.Application.Handlers.Validators;
using EyeglassBay.Domain.DTOs;
using EyeglassBay.Domain.Models;
using EyeglassBay.Infrastructure.EbayParser;
using FluentValidation;
using MediatR;

namespace EyeglassBay.Application.Handlers
{
    public class EbayGetItemsQueryHandler
    {
        public class Query : IRequest<Result<IList<EbayProductItem>>>
        {
            public EbayRequestDto EbayRequest { get; set; }
        }
        
        public class GetItemsValidator : AbstractValidator<Query>
        {
            public GetItemsValidator()
            {
                RuleFor(x => x.EbayRequest).SetValidator(new EbayRequestValidator());
            }
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
                var ebayItems = await _ebayParser.GetItemsAsync(request.EbayRequest);
                return Result<IList<EbayProductItem>>.Success(ebayItems);
            }
        }
    }
}