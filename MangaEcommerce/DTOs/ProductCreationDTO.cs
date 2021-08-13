using MangaEcommerce.Helper;
using MangaEcommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.DTOs
{
    public class ProductCreationDTO
    {
        public string Name { get; set; }
        public string Size { get; set; }
        public int Price { get; set; }
        public string Cover { get; set; }
        public string Pages { get; set; }
        public string Translators { get; set; }
        public int Quantity { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public IFormFile ProductImage { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int CategoryId { get; set; }
        public int PublisherId { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> GenresIds { get; set; }
        public List<PhotoDTO> Photos { get; set; }
    }
}
