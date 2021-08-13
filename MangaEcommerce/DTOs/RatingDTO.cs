using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.DTOs
{
    public class RatingDTO
    {
        [Range(1,5)]
        public int Rating { get; set; }
        public string Comment { get; set; }
        public int ProductId { get; set; }
    }
}
