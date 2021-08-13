using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Models
{
    public class Rating
    {
        public int Id { get; set; }
        [Range(1,5)]
        public int Rate { get; set; }
        public string Comment { get; set; }
        public DateTimeOffset RatingDate { get; set; } = DateTimeOffset.Now;
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
