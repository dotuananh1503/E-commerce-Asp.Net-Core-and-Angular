using MangaEcommerce.DatabaseContext;
using MangaEcommerce.Interface;
using MangaEcommerce.Models.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Services
{
    public class OrderService : IOrderService
    {
        private readonly ICartRepository cartRepository;
        private readonly IProductRepository productRepository;
        private readonly ApplicationDbContext context;
        private readonly IPaymentService paymentService;

        public OrderService(ICartRepository cartRepository, IProductRepository productRepository, ApplicationDbContext context, IPaymentService paymentService)
        {
            this.cartRepository = cartRepository;
            this.productRepository = productRepository;
            this.context = context;
            this.paymentService = paymentService;
        }
        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, int paymentMethodId , string orderNote  ,string cartId, Address shippingAddress)
        {
            var cart = await cartRepository.GetBasketAsync(cartId);
            var items = new List<OrderItem>();
            foreach(var item in cart.Items)
            {
                var productItem = await productRepository.GetProductByIdAsync(item.Id);
                if(productItem.Quantity > 0)
                {
                    productItem.Quantity = productItem.Quantity - item.Quantity;
                    productItem.SoldQuantity = productItem.SoldQuantity + item.Quantity;
                    await context.SaveChangesAsync();
                }    
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, item.ProductImage);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }
            var deliveryMethod = await context.DeliveryMethods.FirstOrDefaultAsync(x => x.Id == deliveryMethodId);
            var paymentMethod = await context.PaymentMethods.FirstOrDefaultAsync(x => x.Id == paymentMethodId);
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            var existingOrder = await context.Orders.FirstOrDefaultAsync(x => x.PaymentIntendId == cart.PaymentIntentId);

            if(existingOrder != null)
            {
                context.Remove(existingOrder);
                await paymentService.CreateOrUpdatePaymentIntent(cart.PaymentIntentId);
            }    
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, paymentMethod, subtotal, orderNote, cart.PaymentIntentId);

            context.Add(order);

            var result = await context.SaveChangesAsync() > 0;

            if (result == false) return null;


            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodAsync()
        {
            return await context.DeliveryMethods.ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            return await context.Orders
                .Include(x => x.DeliveryMethod)
                .Include(x => x.PaymentMethod)
                .Include(x => x.OrderItems)
                .FirstOrDefaultAsync(x => x.Id == id && x.BuyerEmail == buyerEmail);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            return await context.Orders
                .Where(x => x.BuyerEmail == buyerEmail)
                .Include(x => x.DeliveryMethod)
                .Include(x => x.PaymentMethod)
                .Include(x => x.OrderItems)
                .OrderByDescending(x => x.OrderDate)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<PaymentMethod>> GetPaymentMethodAsync()
        {
            return await context.PaymentMethods.ToListAsync();
        }

        public async Task<Order> UpdateOrderStatus(int id, string buyerEmail)
        {
            var order = await GetOrderByIdAsync(id, buyerEmail);
            order.Status = OrderStatus.Accepted;
            return order;
        }

        public async Task<Order> CancelOrderStatus(int id, string buyerEmail)
        {
            var order = await GetOrderByIdAsync(id, buyerEmail);
            if(order.Status == OrderStatus.Shipping
                || order.Status == OrderStatus.PaymentFailed 
                || order.Status == OrderStatus.PaymentReceived)
            {
                return null;
            }
            else
            {
                foreach (var orderItem in order.OrderItems)
                {
                    var product = await productRepository.GetProductByIdAsync(orderItem.ItemOrdered.ProductItemId);
                    product.Quantity = product.Quantity + orderItem.Quantity;
                    product.SoldQuantity = product.SoldQuantity - orderItem.Quantity;
                    await context.SaveChangesAsync();
                }
                order.Status = OrderStatus.Canceled;
                var result = await context.SaveChangesAsync() > 0;

                if (result == false) return null;
            }    
            return order;
        }

        public async Task<IReadOnlyList<Order>> GetAllOrdersAsync()
        {
            return await context.Orders
                .Include(x => x.DeliveryMethod)
                .Include(x => x.PaymentMethod)
                .Include(x => x.OrderItems)
                .OrderByDescending(x => x.OrderDate)
                .ToListAsync();
        }
    }
}
