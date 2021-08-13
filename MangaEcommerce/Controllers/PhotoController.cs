using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MangaEcommerce.DatabaseContext;
using MangaEcommerce.DTOs;
using MangaEcommerce.Helper;
using MangaEcommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Controllers
{
    [ApiController]
    [Route("api/products/{productId}/Photos")]
    public class PhotoController: ControllerBase
    {
        private readonly Cloudinary _cloudinary;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly IMapper mapper;
        private readonly ApplicationDbContext context;
        private readonly IPhotoService photoService;

        public PhotoController(IOptions<CloudinarySettings> cloudinaryConfig, IMapper mapper,
            ApplicationDbContext context, IPhotoService photoService)
        {
            _cloudinaryConfig = cloudinaryConfig;
            this.mapper = mapper;
            this.context = context;
            this.photoService = photoService;
            var acc = new Account
            (
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpPost]
        public async Task<ActionResult> AddPhotoForProduct(int productId, [FromForm] PhotoForCreationDTO photoForCreationDTO)
        {
            var product = await context.Products
                .Include(x => x.ProductGenres)
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Id == productId);
            if (product == null)
            {
                return NotFound();
            }
            var file = photoForCreationDTO.File;
            var uploadResult = await photoService.AddPhotoAsync(file);

            photoForCreationDTO.Url = uploadResult.Url.ToString();
            photoForCreationDTO.PublicId = uploadResult.PublicId;
            var photo = mapper.Map<Photo>(photoForCreationDTO);
            if (!product.Photos.Any(u => u.IsMain))
                photo.IsMain = true;

            product.Photos.Add(photo);
            var temp = await context.SaveChangesAsync() > 0;
            if (temp)
            {
                var photoToReturn = mapper.Map<PhotoForReturnDTO>(photo);
                return NoContent();
            }
            return BadRequest("Could not add the photo");
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> getPhoto(int id)
        {
            var photoFromRepo = await context.Photos.FirstOrDefaultAsync(x => x.Id == id);
            var photo = mapper.Map<PhotoForReturnDTO>(photoFromRepo);
            return Ok(photo);
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> setMainPhoto(int id, int productId)
        {
            var product = await context.Products
                .Include(x => x.ProductGenres)
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Id == productId);
            if (product == null)
            {
                return NotFound();
            }
            var photo = await context.Photos.FirstOrDefaultAsync(x => x.Id == id);

            if (photo.IsMain)
                return BadRequest("This is already the main Photo");

            var currentMainPhoto = await context.Photos.Where(u => u.ProductId == productId).FirstOrDefaultAsync(p => p.IsMain);

            if (currentMainPhoto != null)
                currentMainPhoto.IsMain = false;

            photo.IsMain = true;
            var temp = await context.SaveChangesAsync() > 0;
            if (temp)
                return NoContent();

            return BadRequest("Could not set photo to Main");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deletePhoto(int id, int productId)
        {
            var product = await context.Products
                .Include(x => x.ProductGenres)
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Id == productId);
            if (product == null)
            {
                return NotFound();
            }
            var photo = await context.Photos.FirstOrDefaultAsync(x => x.Id == id);

            if (photo == null) return NotFound();
            if (photo.IsMain) return BadRequest("You can't delete your main product photo");
            if (photo.PublicId != null)
            {
                var result = await photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            context.Remove(photo);
            var temp = await context.SaveChangesAsync() > 0;

            if (temp)
                return NoContent();

            return BadRequest("Could not Delete the Photo");
        }

    }
}
