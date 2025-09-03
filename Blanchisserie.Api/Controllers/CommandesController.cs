using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Blanchisserie.Api.Data;
using Blanchisserie.Api.Models;
//using Blanchisserie.Api.DTOs;
using Blanchisserie.Api.DTOs.Commandes;

namespace Blanchisserie.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Protection par JWT
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly INotificationService _notifier;

        public OrdersController(AppDbContext context, INotificationService notifier)
        {
            _context = context;
            _notifier = notifier;
        }

        private int? GetCurrentUserId()
        {
            var userIdClaim = User.FindFirstValue("sub") ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim))
                return null;

            return int.Parse(userIdClaim);
        }

        [HttpGet("all")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAllCommandes()
        {
            var commandes = await _context.Commandes
                .Include(c => c.User)
                .OrderByDescending(c => c.Id)
                .Select(c => new OrderAdminReadDto
                {
                    Id = c.Id,
                    Date = c.Date,
                    Items = c.Items,
                    Reason = c.Reason,
                    Comment = c.Comment,
                    Status = c.Status,
                    UserId = c.UserId,
                    UserNom = c.User!.FirstName,
                    UserPrenom = c.User.LastName
                })
                .ToListAsync();

            return Ok(commandes);
        }


        [HttpGet]
        public async Task<IActionResult> GetCommandes()
        {
            var userId = GetCurrentUserId();
            if (userId == null)
                return Unauthorized();

            var commandes = await _context.Commandes
                .Where(c => c.UserId == userId)
                .Include(c => c.User)
                .OrderByDescending(c => c.Id) 
                .ToListAsync();

            return Ok(commandes);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCommande([FromBody] OrderCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = GetCurrentUserId();
            if (userId == null)
                return Unauthorized();

            var commande = new Order
            {
                Items = dto.Items,
                Reason = dto.Reason,
                Comment = dto.Comment,
                Date = dto.Date,
                UserId = userId.Value
            };

            _context.Commandes.Add(commande);
            await _context.SaveChangesAsync();
            await _notifier.NotifyAdminsOrderCreated(commande);

            var result = new OrderReadDto
            {
                Id = commande.Id,
                Date = commande.Date,
                Items = commande.Items,
                Reason = commande.Reason,
                Comment = commande.Comment,
                Status = commande.Status
            };

            return CreatedAtAction(nameof(GetCommandes), new { id = commande.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCommande(int id, [FromBody] Order updatedCommande)
        {
            if (id != updatedCommande.Id)
                return BadRequest("ID de la commande invalide.");

            var userId = GetCurrentUserId();
            if (userId == null)
                return Unauthorized();

            var existingCommande = await _context.Commandes.FindAsync(id);
            if (existingCommande == null || existingCommande.UserId != userId)
                return NotFound("Commande non trouvée ou accès refusé.");

            existingCommande.Items = updatedCommande.Items;
            existingCommande.Reason = updatedCommande.Reason;
            existingCommande.Comment = updatedCommande.Comment;
            existingCommande.Status = updatedCommande.Status;

            _context.Entry(existingCommande).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommandeExists(id, userId.Value))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateCommandeStatus(int id, [FromBody] OrderStatusUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var commande = await _context.Commandes.FindAsync(id);
            if (commande == null)
                return NotFound("Commande non trouvée.");

            if (dto.Status != OrderStatus.Approved && dto.Status != OrderStatus.Rejected)
                return BadRequest("Statut invalide. Seuls VALIDE ou REFUSE sont acceptés.");

            commande.Status = dto.Status;
            _context.Entry(commande).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                await _notifier.NotifyUserOrderUpdated(commande);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Commandes.Any(c => c.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommande(int id)
        {
            var userId = GetCurrentUserId();
            if (userId == null)
                return Unauthorized();

            var commande = await _context.Commandes.FindAsync(id);
            if (commande == null || commande.UserId != userId)
                return NotFound("Commande non trouvée ou accès refusé.");

            _context.Commandes.Remove(commande);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool CommandeExists(int id, int userId)
        {
            return _context.Commandes.Any(c => c.Id == id && c.UserId == userId);
        }
    }
}
