using AutoMapper;
//using Blanchisserie.Api.DTOs;
using Blanchisserie.Api.Models;
using Blanchisserie.Api.DTOs.Commandes;

namespace Blanchisserie.Api.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Order, OrderReadDto>();
            CreateMap<OrderCreateDto, Order>();
        }
    }
}
