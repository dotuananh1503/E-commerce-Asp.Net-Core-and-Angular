using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Models.OrderAggregate
{
    public class Order
    {
        public Order()
        {

        }
        public Order(IReadOnlyList<OrderItem> orderItems, string buyerEmail, Address shipToAddress, 
            DeliveryMethod deliveryMethod, PaymentMethod paymentMethod ,int subtotal, string orderNote)
        {
            BuyerEmail = buyerEmail;
            ShipToAddress = shipToAddress;
            DeliveryMethod = deliveryMethod;
            PaymentMethod = paymentMethod;
            OrderNote = orderNote;
            OrderItems = orderItems;
            Subtotal = subtotal;
        }

        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public Address ShipToAddress { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public string OrderNote { get; set; }
        public int Subtotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string PaymentIntendId { get; set; }

        public int GetTotal()
        {
            return Subtotal + DeliveryMethod.Price;
        }
    }
}
