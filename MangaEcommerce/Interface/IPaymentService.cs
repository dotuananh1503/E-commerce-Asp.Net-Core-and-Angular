using MangaEcommerce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Interface
{
    public interface IPaymentService
    {
        Task<CustomerCart> CreateOrUpdatePaymentIntent(string cartId);

    }
}
