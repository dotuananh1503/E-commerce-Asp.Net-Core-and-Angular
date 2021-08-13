using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        public string Size { get; set; }
        public int Price { get; set; }
        public string Cover { get; set; }
        public string Pages { get; set; }
        public string Translators { get; set; }
        public string ProductImage { get; set; }
        public int Quantity { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int PublisherId { get; set; }
        public Publisher Publisher { get; set; }
        public List<ProductGenre> ProductGenres { get; set; }
        public List<Photo> Photos { get; set; }
        public List<Rating> Ratings { get; set; }



    }
}
