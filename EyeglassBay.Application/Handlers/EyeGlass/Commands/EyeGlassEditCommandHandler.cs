using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using EyeglassBay.Application.Core;
using EyeglassBay.Application.Validation;
using EyeglassBay.Domain.Entities;
using EyeglassBay.Persistence;
using FluentValidation;
using MediatR;

namespace EyeglassBay.Application.Handlers
{
    public class EyeGlassEditCommandHandler
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var eyeGlass = await _context.EyeGlasses.FindAsync(request.EyeGlass.Id);
                if (eyeGlass == null) return null;
                _mapper.Map(request.EyeGlass, eyeGlass);
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                return !result ? Result<Unit>.Failure("Failed to create eyeglass") : Result<Unit>.Success(Unit.Value);
            }
        }
    }
}