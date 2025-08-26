using Blanchisserie.Api.Models;

namespace Blanchisserie.Api.DTOs.Commandes


{
    public class OrderReadDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Items { get; set; } = default!;
        public string? Reason { get; set; }
        public string? Comment { get; set; }
        public OrderStatus Status { get; set; }
        public int UserId { get; set; }
    }
}


