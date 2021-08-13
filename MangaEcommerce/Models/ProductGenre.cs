using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Models
{
    public class ProductGenre
    {
        public int ProductId { get; set; }
        public int GenreId { get; set; }
        public Product Product { get; set; }
        public Genre Genre { get; set; }
    }
}
