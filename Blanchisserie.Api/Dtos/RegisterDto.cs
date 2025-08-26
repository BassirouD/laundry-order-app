using System.ComponentModel.DataAnnotations;

namespace Blanchisserie.Api.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string FirstName { get; set; } = default!;

        [Required]
        public string LastName { get; set; } = default!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = default!;

        [Required]
        [MinLength(6, ErrorMessage = "Le mot de passe doit contenir au moins 6 caractères.")]
        public string Password { get; set; } = default!;
    }
}
