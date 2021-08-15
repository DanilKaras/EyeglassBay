using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Application.Core;
using EyeglassBay.Application.Validation;
using EyeglassBay.Domain.Entities;
using EyeglassBay.Persistence;
using FluentValidation;
using MediatR;

namespace EyeglassBay.Application.Handlers
{
    public class EyeGlassCreateCommandHandler
    {
        public class Command : IRequest<Result<Unit>>
        {
            public EyeGlass EyeGlass { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.EyeGlass).SetValidator(new EyeGlassValidator());
            }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                await _context.EyeGlasses.AddAsync(request.EyeGlass, cancellationToken);
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                return !result ? Result<Unit>.Failure("Failed to create eyeglass") : Result<Unit>.Success(Unit.Value);
            }
        }
    }
}