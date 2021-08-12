using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Domain.Entities;
using EyeglassBay.Persistence;
using MediatR;

namespace EyeglassBay.Application.Handlers
{
    public class EyeGlassCreateCommandHandler
    {
        public class Command : IRequest
        {
            public EyeGlass EyeGlass { get; set; }
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
                await _context.EyeGlasses.AddAsync(request.EyeGlass, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}