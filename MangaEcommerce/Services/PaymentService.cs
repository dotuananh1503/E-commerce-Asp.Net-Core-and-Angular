using MangaEcommerce.DatabaseContext;
using MangaEcommerce.Interface;
using MangaEcommerce.Models;
using Microsoft.Extensions.Configuration;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly ICartRepository cartRepository;
        private readonly IConfiguration config;
        private readonly ApplicationDbContext context;
        private readonly IProductRepository productRepository;

        public PaymentService(ICartRepository cartRepository, IConfiguration config, ApplicationDbContext context, IProductRepository productRepository)
        {
            this.cartRepository = cartRepository;
            this.config = config;
            this.context = context;
            this.productRepository = productRepository;
        }
        public async Task<CustomerCart> CreateOrUpdatePaymentIntent(string cartId)
        {
            StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
            var cart = await cartRepository.GetBasketAsync(cartId);
            var shippingPrice = 0m;

            if(cart.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = context.DeliveryMethods.FirstOrDefault(x => x.Id == cart.DeliveryMethodId);
                shippingPrice = deliveryMethod.Price;
            }
            
            foreach(var item in cart.Items)
            {
                var productItem = await productRepository.GetProductByIdAsync(item.Id);
                if(item.Price != productItem.Price)
                {
                    item.Price = productItem.Price;
                }    
            }

            var service = new PaymentIntentService();
            PaymentIntent paymentIntent;
            
            if(string.IsNullOrEmpty(cart.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long) cart.Items.Sum(i => i.Quantity * i.Price) + (long)
                    shippingPrice,
                    Currency = "vnd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                paymentIntent = await service.CreateAsync(options);
                cart.PaymentIntentId = paymentIntent.Id;
                cart.ClientSecret = paymentIntent.ClientSecret;
            }    
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)cart.Items.Sum(i => i.Quantity * i.Price) + (long)
                    shippingPrice
                };
                await service.UpdateAsync(cart.PaymentIntentId, options);
            }

            await cartRepository.UpdateBasketAsync(cart);
            return cart;
        }
    }
}
