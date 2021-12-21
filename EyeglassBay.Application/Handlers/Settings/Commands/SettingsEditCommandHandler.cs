using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using EyeglassBay.Application.Core;
using EyeglassBay.Application.Handlers.Validators;
using EyeglassBay.Domain.DTOs;
using EyeglassBay.Persistence;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EyeglassBay.Application.Handlers.Settings.Commands
{
    public class SettingsEditCommandHandler
    {
        public class Command : IRequest<Result<Unit>>
        {
            public List<SettingsDto> EbayStoreSettings { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.EbayStoreSettings).SetValidator(new SettingsValidator());
            }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private const string CalculationCoefficient = "CalculationCoefficient";
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var settings = await _context.Settings.ToListAsync(cancellationToken);
                if (settings == null) return null;
                var dictionary = request?.EbayStoreSettings?.ToDictionary(key => key.Key, value => value.Value);
                foreach (var setting in settings)
                {
                    if (dictionary != null && dictionary.ContainsKey(setting.Key))
                    {
                        switch (setting.Key)
                        {
                            case CalculationCoefficient:
                                var newValue = dictionary[setting.Key];
                                if (!decimal.TryParse(newValue, out _))
                                {
                                    return Result<Unit>.Failure($"Failed to convert {newValue} to decimal");
                                }
                                setting.Value = newValue;
                                break;
                        }
                    }
                }

                _context.Settings.UpdateRange(settings);
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                return !success ? Result<Unit>.Failure("Failed to update settings") : Result<Unit>.Success(Unit.Value);
            }
        }
    }
}