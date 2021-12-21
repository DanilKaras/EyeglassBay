using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Application.Core;
using EyeglassBay.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EyeglassBay.Application.Handlers
{
    public class SettingsGetCoefficientQueryHandler
    {
        public class Query : IRequest<Result<decimal>>
        {
            
        }
        
        public class Handler : IRequestHandler<Query, Result<decimal>>
        {
            private readonly DataContext _context;
            private const string CalculationCoefficient = "CalculationCoefficient";
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<decimal>> Handle(Query request, CancellationToken cancellationToken)
            {
                var settings = await _context.Settings
                    .FirstOrDefaultAsync(x => x.Key.Equals(CalculationCoefficient), cancellationToken: cancellationToken);
                if (decimal.TryParse(settings.Value, out var result))
                {
                    return Result<decimal>.Success(result);
                }
                return Result<decimal>.Failure($"Cannot convert value {settings.Value} to decimal");
            }
        }
    }
}