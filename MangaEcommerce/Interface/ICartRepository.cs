using MangaEcommerce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Interface
{
    public interface ICartRepository
    {
        Task<CustomerCart> GetBasketAsync(string cartId);
        Task<CustomerCart> UpdateBasketAsync(CustomerCart cart);
        Task<bool> DeleteBasketAsync(string id);
    }
}
