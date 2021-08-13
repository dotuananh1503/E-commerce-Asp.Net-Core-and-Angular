using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.DTOs
{
    public class HomeDTO
    {
        public List<ProductDTO> UpComingProducts { get; set; }
        public List<ProductDTO> LatestProducts { get; set; }
    }
}
