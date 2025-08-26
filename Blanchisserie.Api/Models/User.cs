namespace Blanchisserie.Api.Models;

public class User
{
    public int Id { get; set; }
    public string LastName { get; set; } = default!;
    public string FirstName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    public string Role { get; set; } = "USER"; // User | Admin

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
