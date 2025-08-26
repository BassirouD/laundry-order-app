using System.ComponentModel.DataAnnotations;
 
using System.Text.Json.Serialization;

namespace Blanchisserie.Api.Models
{

 public class Order
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        [Required]
        public string Items { get; set; } = default!;

        public string? Reason { get; set; }

        public string? Comment { get; set; }

        [Required]
        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        [Required]
        public int UserId { get; set; }

        // Ignore la propriété complexe User pour éviter l’erreur de validation
        [JsonIgnore] 
        public User? User { get; set; }  // <-- nullable

    }


}
