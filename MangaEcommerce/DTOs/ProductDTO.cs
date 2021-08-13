using MangaEcommerce.Helper;
using MangaEcommerce.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
        public int Price { get; set; }
        public string Cover { get; set; }
        public string Pages { get; set; }
        public string Translators { get; set; }
        public string ProductImage { get; set; }
        public int Quantity { get; set; }
        public double AverageVote { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string CategoryName { get; set; }
        public string PublisherName { get; set; }
        public List<GenreDTO> Genres { get; set; }
        public List<PhotoDTO> Photos { get; set; }
        public List<RatingForReturnDTO> Ratings { get; set; }
    }
}
