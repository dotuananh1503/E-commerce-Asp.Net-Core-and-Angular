using AutoMapper;
using MangaEcommerce.Interface;
using MangaEcommerce.Models;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Controllers
{
    [ApiController]
    [Route("api/carts")]
    public class CartController: ControllerBase
    {
        private readonly ICartRepository _cartRepository;
        private readonly IMapper _mapper;

        public CartController(ICartRepository cartRepository, IMapper mapper)
        {
            _mapper = mapper;
            _cartRepository = cartRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerCart>> GetBasketById(string id)
        {
            var basket = await _cartRepository.GetBasketAsync(id);

            return Ok(basket ?? new CustomerCart(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerCart>> UpdateBasket(CustomerCart cart)
        {

            var updatedCart = await _cartRepository.UpdateBasketAsync(cart);

            return Ok(updatedCart);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _cartRepository.DeleteBasketAsync(id);
        }
    }
}
