using MangaEcommerce.Models.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Interface
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, int paymentMethodId, string orderNote , string cartId, Address shippingAddress);
        Task<Order> UpdateOrderStatus(int id, string buyerEmail);
        Task<Order> CancelOrderStatus(int id, string buyerEmail);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
        Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodAsync();
        Task<IReadOnlyList<PaymentMethod>> GetPaymentMethodAsync();
    }
}
