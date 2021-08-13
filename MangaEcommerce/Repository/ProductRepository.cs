using MangaEcommerce.DatabaseContext;
using MangaEcommerce.Interface;
using MangaEcommerce.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Include(x => x.ProductGenres).ThenInclude(x => x.Genre)
                .Include(x => x.Category)
                .Include(x => x.Photos)
                .Include(x => x.Publisher)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await _context.Products
                .Include(x => x.ProductGenres).ThenInclude(x => x.Genre)
                .Include(x => x.Category)
                .Include(x => x.Photos)
                .Include(x => x.Publisher)
                .ToListAsync();
        }
    }
}
