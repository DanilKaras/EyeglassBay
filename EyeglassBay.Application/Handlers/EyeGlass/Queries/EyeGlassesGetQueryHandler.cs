using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Application.Core;
using EyeglassBay.Domain.Entities;
using EyeglassBay.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EyeglassBay.Application.Handlers
{
    public class EyeGlassesGetQueryHandler
    {
        public class Query : IRequest<Result<IList<EyeGlass>>>
        {
            
        }

        public class Handler : IRequestHandler<Query, Result<IList<EyeGlass>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<IList<EyeGlass>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var eyeglasses = await _context.EyeGlasses.ToListAsync(cancellationToken);
                return Result<IList<EyeGlass>>.Success(eyeglasses);
            }
        }
    }
}