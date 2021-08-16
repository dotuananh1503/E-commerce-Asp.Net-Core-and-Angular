using AutoMapper;
using MangaEcommerce.DatabaseContext;
using MangaEcommerce.DTOs;
using MangaEcommerce.Extensions;
using MangaEcommerce.Interface;
using MangaEcommerce.Models;
using MangaEcommerce.Models.OrderAggregate;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Controllers
{
    [ApiController]
    [Route("api/orders")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class OrderController: ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IOrderService orderService;
        private readonly IMapper mapper;
        private readonly ApplicationDbContext context;

        public OrderController(UserManager<ApplicationUser> userManager, IOrderService orderService, IMapper mapper, ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.orderService = orderService;
            this.mapper = mapper;
            this.context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDTO orderDTO)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var user = await userManager.FindByEmailAsync(email);
            var temp = await context.Addresses.Where(x => x.ApplicationUserId == user.Id).FirstOrDefaultAsync(p => p.IsMainAddress);  
            var address = mapper.Map<AddressDTO, Models.OrderAggregate.Address>(orderDTO.ShipToAddress);
            var order = await orderService.CreateOrderAsync(email, orderDTO.DeliveryMethodId, orderDTO.PaymentMethodId, orderDTO.OrderNote ,orderDTO.cartId, address);
            if (order == null) return BadRequest("Problem creating order");
            return Ok(order);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Order>> UpdateOrderStatus(int id)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order = await orderService.UpdateOrderStatus(id, email);
            if (order == null) return BadRequest("Problem updating order status");
            return Ok(order);
        }

        [HttpPut("{id:int}/cancel")]
        public async Task<ActionResult<Order>> CancelOrder(int id)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order = await orderService.CancelOrderStatus(id, email);
            if (order == null) return BadRequest("Đơn hàng này không thể hủy");
            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDTO>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var orders = await orderService.GetOrdersForUserAsync(email);
            return Ok(mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDTO>>(orders));
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<OrderToReturnDTO>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order = await orderService.GetOrderByIdAsync(id, email);

            if (order == null) return NotFound();
            return mapper.Map<Order, OrderToReturnDTO>(order);
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await orderService.GetDeliveryMethodAsync());
        }

        [HttpGet("paymentMethods")]
        public async Task<ActionResult<IReadOnlyList<PaymentMethod>>> GetPaymentMethods()
        {
            return Ok(await orderService.GetPaymentMethodAsync());
        }
    }
}
