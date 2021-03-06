using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Models
{
    public class CustomerCart
    {
        public CustomerCart()
        {

        }
        public CustomerCart(string id)
        {
            Id = id;
        }
        public string Id { get; set; }
        public List<CartItem> Items { get; set; } = new List<CartItem>();
        public int? DeliveryMethodId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        public int shippingPrice { get; set; }
    }
}
