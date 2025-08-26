using Blanchisserie.Api.Models;

namespace Blanchisserie.Api.DTOs
{
    public class OrderCreateDto
    {
        public string Items { get; set; } = default!;
        public string? Reason { get; set; }
        public string? Comment { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
    }
}
