using System;
using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Domain.Entities;
using EyeglassBay.Persistence;
using MediatR;

namespace EyeglassBay.Application.Handlers
{
    public class EyeGlassGetByIdQueryHandler
    {
        public class Query : IRequest<EyeGlass>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, EyeGlass>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<EyeGlass> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.EyeGlasses.FindAsync(request.Id);
            }
        }
    }
}