using EyeglassBay.Domain.Entities;
using FluentValidation;

namespace EyeglassBay.Application.Validation
{
    public class EyeGlassValidator : AbstractValidator<EyeGlass>
    {
        public EyeGlassValidator()
        {
            RuleFor(x => x.ProductName).NotEmpty();
        }
    }
}