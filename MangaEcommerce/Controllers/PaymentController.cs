using MangaEcommerce.Interface;
using MangaEcommerce.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Controllers
{
    [ApiController]
    [Route("api/payments")]
    public class PaymentController: ControllerBase
    {
        private readonly IPaymentService paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            this.paymentService = paymentService;
        }

        [HttpPost("{cartId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<CustomerCart>> CreateOrUpdatePaymentIntent(string cartId)
        {
            return await paymentService.CreateOrUpdatePaymentIntent(cartId); 
        }
    }
}
