using Blanchisserie.Api.Models;

namespace Blanchisserie.Api.DTOs.Commandes
{
    public class OrderUpdateDto
    {
        public string Items { get; set; } = default!;
        public string? Reason { get; set; }
        public string? Comment { get; set; }
        public OrderStatus Status { get; set; }
    }
}
