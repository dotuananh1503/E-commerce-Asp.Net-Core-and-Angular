using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.DTOs
{
    public class FilterProducsDTO
    {
        public int Page { get; set; }
        public int RecordsPerPage { get; set; }
        public PaginationDTO PaginationDTO 
        {
            get { return new PaginationDTO() { Page = Page, RecordsPerPage = RecordsPerPage }; }
        }
        public string Name { get; set; }
        public string SortBy { get; set; }
        public int GenreId { get; set; }
        public int CategoryId { get; set; }
        public int PublisherId { get; set; }
        public bool PriceFilter1 { get; set; }
        public bool PriceFilter2 { get; set; }
        public bool PriceFilter3 { get; set; }
        public bool PriceFilter4 { get; set; }
    }
}
