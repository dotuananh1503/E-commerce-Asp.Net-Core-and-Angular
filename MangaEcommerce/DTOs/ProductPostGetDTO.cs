using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.DTOs
{
    public class ProductPostGetDTO
    {
        public List<GenreDTO> Genres { get; set; }
        public List<CategoryDTO> Categories { get; set; }
        public List<PublisherDTO> Publishers { get; set; }
    }
}
