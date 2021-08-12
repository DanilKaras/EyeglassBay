using System;
using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Domain.Entities;
using EyeglassBay.Persistence;
using MediatR;

namespace EyeglassBay.Application.Handlers
{
    public class EyeGlassDeleteCommandHandler
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.EyeGlasses.Remove(new EyeGlass{Id = request.Id});
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
                
            }
        }
    }
}