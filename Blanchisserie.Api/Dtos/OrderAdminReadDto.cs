using Blanchisserie.Api.Models;


namespace Blanchisserie.Api.DTOs.Commandes
{
    public class OrderAdminReadDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Items { get; set; } = default!;
        public string? Reason { get; set; }
        public string? Comment { get; set; }
        public OrderStatus Status { get; set; }

        public int UserId { get; set; }
        public string UserNom { get; set; } = default!;
        public string UserPrenom { get; set; } = default!;
    }
}
