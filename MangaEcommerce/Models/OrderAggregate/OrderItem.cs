using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Models.OrderAggregate
{
    public class OrderItem
    {
        public OrderItem()
        {

        }
        public OrderItem(ProductItemOrdered itemOrdered, int price, int quantity)
        {
            ItemOrdered = itemOrdered;
            Price = price;
            Quantity = quantity;
        }

        public int Id { get; set; }
        public ProductItemOrdered ItemOrdered { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
    }
}
