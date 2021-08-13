using MangaEcommerce.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MangaEcommerce.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<ApplicationUser> FindByEmailWithAddressAsync(this UserManager<ApplicationUser> input, 
            ClaimsPrincipal user)
        {
            var email = user?.Claims.FirstOrDefault(x => x.Type == "email").Value;

            return await input.Users.Include(x => x.Addresses).SingleOrDefaultAsync(x => x.Email == email);
        }

        public static async Task<ApplicationUser> FindByEmailFromClaimsPrinciple(this UserManager<ApplicationUser> input,
        ClaimsPrincipal user)
        {
            var email = user?.Claims.FirstOrDefault(x => x.Type == "email").Value;

            return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}
