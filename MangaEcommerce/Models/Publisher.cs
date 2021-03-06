using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Models
{
    public class Publisher
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "The field with name {0} is required")]
        [StringLength(50)]
        public string Name { get; set; }
        public string Picture { get; set; }
        public List<Product> Products { get; set; }
    }
}
