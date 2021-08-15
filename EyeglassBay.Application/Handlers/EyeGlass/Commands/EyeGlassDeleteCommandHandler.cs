using System;
using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Application.Core;
using EyeglassBay.Domain.Entities;
using EyeglassBay.Persistence;
using MediatR;

namespace EyeglassBay.Application.Handlers
{
    public class EyeGlassDeleteCommandHandler
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var eyeGlass = await _context.EyeGlasses.FindAsync(request.Id);
                if (eyeGlass == null) return null;
                
                _context.EyeGlasses.Remove(eyeGlass);
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                return !result ? Result<Unit>.Failure("Failed to delete eyeglass") : Result<Unit>.Success(Unit.Value);
            }
        }
    }
}