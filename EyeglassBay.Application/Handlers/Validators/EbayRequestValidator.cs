using EyeglassBay.Domain.DTOs;
using FluentValidation;

namespace EyeglassBay.Application.Handlers.Validators
{
    public class EbayRequestValidator : AbstractValidator<EbayRequestDto>
    {
        public EbayRequestValidator()
        {
            RuleFor(x => x.SearchString).NotEmpty();
            RuleFor(x => x.OriginalPrice).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Percentage).GreaterThanOrEqualTo(0);
        }
    }
}