using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.DTOs
{
    public class OrderDTO
    {
        public string cartId { get; set; }
        public int DeliveryMethodId { get; set; }
        public int PaymentMethodId { get; set; }
        public string OrderNote { get; set; }
        public AddressDTO ShipToAddress { get; set; }
    }
}
