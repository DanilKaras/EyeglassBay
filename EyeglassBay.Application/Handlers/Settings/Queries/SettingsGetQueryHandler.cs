using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EyeglassBay.Application.Core;
using EyeglassBay.Domain.Entities;
using EyeglassBay.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EyeglassBay.Application.Handlers
{
    public class SettingsGetQueryHandler
    {
        public class Query : IRequest<Result<IList<EbayStoreSettings>>>
        {
            
        }
        
        public class Handler : IRequestHandler<Query, Result<IList<EbayStoreSettings>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<IList<EbayStoreSettings>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var settings = await _context.Settings.ToListAsync(cancellationToken);
                
                return Result<IList<EbayStoreSettings>>.Success(settings);
            }
        }
    }
}