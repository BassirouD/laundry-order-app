using Blanchisserie.Api.Models;

using System.ComponentModel.DataAnnotations;

namespace Blanchisserie.Api.DTOs.Commandes
{
    public class OrderStatusUpdateDto
    {
        [Required]
        public OrderStatus Status { get; set; }
    }
   
}