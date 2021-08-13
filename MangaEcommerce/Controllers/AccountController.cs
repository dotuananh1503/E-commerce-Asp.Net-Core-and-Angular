using AutoMapper;
using AutoMapper.Configuration;
using MangaEcommerce.DatabaseContext;
using MangaEcommerce.DTOs;
using MangaEcommerce.Extensions;
using MangaEcommerce.Helper;
using MangaEcommerce.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace MangaEcommerce.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController: ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly IFileStorageService fileStorageService;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IEmailSender emailSender;
        private string container = "accounts";

        public AccountController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration,
            IFileStorageService fileStorageService,
            ApplicationDbContext context,
            IMapper mapper,
            IEmailSender emailSender)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.fileStorageService = fileStorageService;
            this.context = context;
            this.mapper = mapper;
            this.emailSender = emailSender;
        }

        [HttpPost("create")]
        public async Task<ActionResult<AuthenticationResponse>> Create([FromBody] UserCredentials userCredentials)
        {
            var user = new ApplicationUser()
            {
                UserName = userCredentials.Email,
                Email = userCredentials.Email,
                DisplayName = userCredentials.DisplayName,
                Gender = userCredentials.Gender,
                ProfileImageURL = null
            };
            var result = await userManager.CreateAsync(user, userCredentials.Password);
            //await emailSender.SendEmailAsync(userCredentials.Email, "Đăng ký tài khoản thành công",
            //    $"Cám ơn {userCredentials.FullName} đã đăng kí tài khoản trên trang web của chúng tôi");
            if (result.Succeeded)
            {
                return BuildToken(userCredentials);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login([FromBody] UserLogin userCredentials)
        {
            var result = await signInManager.PasswordSignInAsync(userCredentials.Email,
                userCredentials.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return BuildTokenLogin(userCredentials);
            }
            else
            {
                return BadRequest("Incorrect Login");
            }
        }

        [HttpPost("changepassword")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> ChangePassword([FromBody] UserChangePassword userChangePassword)
        {
            //var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                var result = await userManager.ChangePasswordAsync(user, userChangePassword.CurrentPassword, userChangePassword.NewPassword);
                if (result.Succeeded)
                {
                    return NoContent();
                }
                else
                {
                    return BadRequest("Failed to change password");
                }
            }     
        }


        [HttpGet("listUsers")]
        public async Task<ActionResult<List<UserDTO>>> GetListUsers([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Users.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var users = await queryable.OrderBy(x => x.Email).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<UserDTO>>(users);
        }

        [HttpGet("user")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<UserDTO>> GetUserInfo()
        {
            var user = await userManager.FindByEmailWithAddressAsync(HttpContext.User);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                var dto = mapper.Map<UserDTO>(user);
                return dto;
            }    
        }

        [HttpGet("user/addresses")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<List<AddressDTO>>> GetUserAddresses()
        {
            var user = await userManager.FindByEmailWithAddressAsync(HttpContext.User);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return mapper.Map<List<Address>, List<AddressDTO>>(user.Addresses);
            }
        }

        [HttpPut("user/addresses")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<AddressDTO>> UpdateUserAddresses(AddressDTO addressDTO, int addressId)
        {
            var user = await userManager.FindByEmailWithAddressAsync(HttpContext.User);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                var userAddress = await context.Addresses.FirstOrDefaultAsync(x => x.Id == addressId);
                userAddress = mapper.Map(addressDTO, userAddress);
                var result = await userManager.UpdateAsync(user);
                if (result.Succeeded) return Ok(mapper.Map<Address, AddressDTO>(userAddress));
                return BadRequest("Problem updating the user addresses");
            }
        }


        [HttpPost("user/addresses")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<AddressDTO>> CreateUserAddresses([FromForm] AddressCreationDTO addressCreationDTO)
        {
            var user = await userManager.FindByEmailWithAddressAsync(HttpContext.User);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                addressCreationDTO.ApplicationUserId = user.Id;
                var address = mapper.Map<Address>(addressCreationDTO);
                user.Addresses.Add(address);
                var temp = await context.SaveChangesAsync() > 0;
                if (temp)
                {
                    var addressToReturn = mapper.Map<AddressDTO>(address);
                    return Ok(addressToReturn);
                }
                return BadRequest("Could not add the photo");
            }
        }

        private AuthenticationResponse BuildToken(UserCredentials userCredentials)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", userCredentials.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["keyjwt"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
                expires: expiration, signingCredentials: creds);

            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }

        private AuthenticationResponse BuildTokenLogin(UserLogin userCredentials)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", userCredentials.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["keyjwt"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
                expires: expiration, signingCredentials: creds);

            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }

    }
}
