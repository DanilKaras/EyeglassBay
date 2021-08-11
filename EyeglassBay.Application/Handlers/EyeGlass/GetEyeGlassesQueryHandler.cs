using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EyeglassBay.Application.Handlers
{
    public class GetEyeGlassesQueryHandler
    {
        public class Query : IRequest<IList<Domain.Entities.EyeGlass>>
        {
            
        }

        public class Handler : IRequestHandler<Query, IList<Domain.Entities.EyeGlass>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<IList<Domain.Entities.EyeGlass>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.EyeGlasses.ToListAsync(cancellationToken);
            }
        }
    }
}