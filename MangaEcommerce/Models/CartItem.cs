using System;

namespace MangaEcommerce.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int Price { get; set; }
        public string ProductImage { get; set; }
        public int Quantity { get; set; }
        public DateTime releaseDate { get; set; }
        public string CategoryName { get; set; }
        public string PublisherName { get; set; }
    }
}