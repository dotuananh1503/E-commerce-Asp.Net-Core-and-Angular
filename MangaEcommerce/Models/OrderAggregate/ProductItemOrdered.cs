using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Models.OrderAggregate
{
    public class ProductItemOrdered
    {
        public ProductItemOrdered()
        {

        }
        public ProductItemOrdered(int productItemId, string productName, string productImage)
        {
            ProductItemId = productItemId;
            ProductName = productName;
            ProductImage = productImage;
        }

        public int ProductItemId { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
    }
}
