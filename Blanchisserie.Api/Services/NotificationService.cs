using Microsoft.AspNetCore.SignalR;
using Blanchisserie.Api.Models;

public interface INotificationService
{
    Task NotifyAdminsOrderCreated(Order order);
    Task NotifyUserOrderUpdated(Order order);
}

public class NotificationService : INotificationService
{
    private readonly IHubContext<NotificationHub> _hub;

    public NotificationService(IHubContext<NotificationHub> hub)
    {
        _hub = hub;
    }

    public Task NotifyAdminsOrderCreated(Order order)
    {
        var payload = new {
            type = "OrderCreated",
            orderId = order.Id,
            customer = order.UserId,
            message = $"Nouvelle commande #{order.Id} créée"
        };

        return _hub.Clients.Group("role:ADMIN").SendAsync("notify", payload);
    }

    public Task NotifyUserOrderUpdated(Order order)
    {
        var payload = new {
            type = "OrderUpdated",
            orderId = order.Id,
            status = order.Status.ToString(),
            message = $"Votre commande #{order.Id} est {order.Status}"
        };

        return _hub.Clients.Group($"user:{order.UserId}").SendAsync("notify", payload);
    }
}
