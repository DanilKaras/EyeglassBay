using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using EyeglassBay.Domain.Entities;
using EyeglassBay.Persistence;
using MediatR;

namespace EyeglassBay.Application.Handlers
{
    public class EyeGlassEditCommandHandler
    {
        public class Command : IRequest
        {
            public EyeGlass EyeGlass { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var eyeGlass = await _context.EyeGlasses.FindAsync(request.EyeGlass.Id);
                _mapper.Map(request.EyeGlass, eyeGlass);
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}