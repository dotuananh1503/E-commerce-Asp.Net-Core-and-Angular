using AutoMapper;
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
        private readonly IMapper mapper;

        public RatingController(ApplicationDbContext context, 
            UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            this.context = context;
            this.userManager = userManager;
            this.mapper = mapper;
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

        [HttpGet("product/{id:int}")]
        public async Task<RatingValuePercentageDTO[]> GetRatingValuePerCentByProductId(int id)
        {
            var ratings = await context.Ratings
                .Where(x => x.ProductId == id)
                .ToArrayAsync();

            var ratingValue = new RatingValuePercentageDTO[5];
            var j = 5;
            if(ratings.Length != 0)
            {
                for(int i = 0; i < ratingValue.Length; i++)
                {
                    var temp = await context.Ratings.Where(x => x.ProductId == id && x.Rate == j).ToArrayAsync();
                    double percent = (temp.Length / (double)ratings.Length) * 100;
                    ratingValue[i] = new RatingValuePercentageDTO()
                    {
                        Star = j,
                        Value = percent
                    };
                    j--;
                }    
            }
            else
            {
                for (int i = 0; i < ratingValue.Length; i++)
                {
                    ratingValue[i] = new RatingValuePercentageDTO()
                    {
                        Star = j,
                        Value = 0
                    };
                    j--;
                }
            }    

            return ratingValue;
        }
    }
}
