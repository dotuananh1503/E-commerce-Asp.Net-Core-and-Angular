using MangaEcommerce.DatabaseContext;
using MangaEcommerce.DTOs;
using MangaEcommerce.Models;
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
    [Route("api/ratings")]
    public class RatingController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<ApplicationUser> userManager;

        public RatingController(ApplicationDbContext context, 
            UserManager<ApplicationUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] RatingDTO ratingDTO)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var currentRate = await context.Ratings
                .FirstOrDefaultAsync(x => x.ProductId == ratingDTO.ProductId &&
                x.UserId == userId);
            if(currentRate == null)
            {
                var rating = new Rating();
                rating.ProductId = ratingDTO.ProductId;
                rating.Rate = ratingDTO.Rating;
                rating.Comment = ratingDTO.Comment;
                rating.UserName = user.DisplayName;
                rating.UserId = userId;
                context.Add(rating);
            }    
            else
            {
                currentRate.Rate = ratingDTO.Rating;
            }
            await context.SaveChangesAsync();
            return NoContent();
        }

    }
}
