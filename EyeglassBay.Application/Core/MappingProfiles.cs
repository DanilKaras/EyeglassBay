using AutoMapper;
using EyeglassBay.Domain.Entities;

namespace EyeglassBay.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<EyeGlass, EyeGlass>();
        }
    }
}