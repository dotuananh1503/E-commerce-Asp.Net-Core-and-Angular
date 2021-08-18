using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.DTOs
{
    public class CustomerCartDTO
    {
        public string Id { get; set; }
        public List<CartItemDTO> Items { get; set; }
        public int? DeliveryMethodId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        public int shippingPrice { get; set; }
    }
}
