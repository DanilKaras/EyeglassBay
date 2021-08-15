using System;
using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Application.Core;
using EyeglassBay.Domain.Entities;
using EyeglassBay.Persistence;
using MediatR;

namespace EyeglassBay.Application.Handlers
{
    public class EyeGlassGetByIdQueryHandler
    {
        public class Query : IRequest<Result<EyeGlass>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<EyeGlass>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<EyeGlass>> Handle(Query request, CancellationToken cancellationToken)
            {
                var eyeglass = await _context.EyeGlasses.FindAsync(request.Id);
                return Result<EyeGlass>.Success(eyeglass);
            }
        }
    }
}