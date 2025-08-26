using System.ComponentModel.DataAnnotations;

namespace Blanchisserie.Api.DTOs.Commandes
{
    public class OrderCreateDto
    {
        [Required]
        public string Items { get; set; } = default!;
        [Required]
        public DateTime Date { get; set; }
        public string? Reason { get; set; }
        public string? Comment { get; set; }
    }
}
