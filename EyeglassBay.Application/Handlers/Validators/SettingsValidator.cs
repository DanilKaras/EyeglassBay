using System.Collections.Generic;
using EyeglassBay.Domain.DTOs;
using FluentValidation;

namespace EyeglassBay.Application.Handlers.Validators
{
    public class SettingsValidator: AbstractValidator<List<SettingsDto>>
    {
        public SettingsValidator()
        {
            RuleForEach(x => x).ChildRules(xx=>xx.RuleFor(x=>x.Key)).NotEmpty();
            RuleForEach(x => x).ChildRules(xx=>xx.RuleFor(x=>x.Value)).NotEmpty();
        }
    }
}