using AutoMapper;
using MangaEcommerce.DatabaseContext;
using MangaEcommerce.DTOs;
using MangaEcommerce.Helper;
using MangaEcommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private readonly IPhotoService photoService;
        private string container = "products";

        public ProductController(ApplicationDbContext context, IMapper mapper,
            IFileStorageService fileStorageService,
            IPhotoService photoService)
        {
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
            this.photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<HomeDTO>> Get()
        {
            var top = 6;
            var today = DateTime.Today;

            var upcomingProducts = await context.Products
                .Where(x => x.ReleaseDate > today)
                .Include(x => x.ProductGenres).ThenInclude(x => x.Genre)
                .Include(x => x.Category)
                .Include(x => x.Publisher)
                .Include(x => x.Photos)
                .OrderBy(x => x.ReleaseDate)
                .Take(top)
                .ToListAsync();

            var latestProducts = await context.Products
                .Where(x => x.ReleaseDate <= today)
                .Include(x => x.ProductGenres).ThenInclude(x => x.Genre)
                .Include(x => x.Category)
                .Include(x => x.Publisher)
                .Include(x => x.Photos)
                .OrderByDescending(x => x.ReleaseDate)
                .Take(top)
                .ToListAsync();

            var homeDTO = new HomeDTO();
            homeDTO.UpComingProducts = mapper.Map<List<ProductDTO>>(upcomingProducts);
            homeDTO.LatestProducts = mapper.Map<List<ProductDTO>>(latestProducts);
            return homeDTO;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDTO>> Get(int id)
        {
            var product = await context.Products
                .Include(x => x.ProductGenres).ThenInclude(x => x.Genre)
                .Include(x => x.Category)
                .Include(x => x.Photos)
                .Include(x => x.Ratings)
                .Include(x => x.Publisher)
                .FirstOrDefaultAsync(x => x.Id == id);
            if(product == null)
            {
                return NotFound();
            }

            var averageVote = 0.0;
            if(await context.Ratings.AnyAsync(x => x.ProductId == id))
            {
                averageVote = await context.Ratings.Where(x => x.ProductId == id)
                    .AverageAsync(x => x.Rate);
            }    

            var dto = mapper.Map<ProductDTO>(product);
            dto.AverageVote = averageVote;
            return dto;
        }

        [HttpGet("{id:int}/ratings")]
        public async Task<ActionResult<List<RatingForReturnDTO>>> GetRatings(int id)
        {
            var ratings = await context.Ratings.Where(x => x.ProductId == id).ToListAsync();

            return Ok(mapper.Map<List<Rating>, List<RatingForReturnDTO>>(ratings));
        }

        [HttpGet("{id:int}/related")]
        public async Task<ActionResult<List<ProductDTO>>> GetRelatedProducts(int id)
        {
            var product = await context.Products
                .Include(x => x.ProductGenres).ThenInclude(x => x.Genre)
                .Include(x => x.Category)
                .Include(x => x.Photos)
                .Include(x => x.Publisher)
                .FirstOrDefaultAsync(x => x.Id == id);
            var productRelated = await context.Products
                .Include(x => x.ProductGenres).ThenInclude(x => x.Genre)
                .Include(x => x.Category)
                .Include(x => x.Photos)
                .Include(x => x.Publisher)
                .Where(x => x.Id != product.Id && x.CategoryId == product.CategoryId).ToListAsync();
            if (product == null)
            {
                return NotFound();
            }
            var dto = mapper.Map<List<ProductDTO>>(productRelated);
            return dto;
        }

        [HttpGet("sort/{direction}")]
        public async Task<ActionResult<List<ProductDTO>>> Sort(string direction)
        {
            var productsQueryable = context.Products
                .Include(x => x.ProductGenres).ThenInclude(x => x.Genre)
                .Include(x => x.Category)
                .Include(x => x.Photos)
                .Include(x => x.Publisher)
                .AsQueryable();
            if(direction.Equals("nameatoz"))
            {
                var products = await productsQueryable.OrderBy(x => x.Name).ToListAsync();
                return mapper.Map<List<ProductDTO>>(products);
            }
            else if (direction.Equals("nameztoa"))
            {
                var products = await productsQueryable.OrderByDescending(x => x.Name).ToListAsync();
                return mapper.Map<List<ProductDTO>>(products);
            }
            else if (direction.Equals("priceatoz"))
            {
                var products = await productsQueryable.OrderBy(x => x.Price).ToListAsync();
                return mapper.Map<List<ProductDTO>>(products);
            }
            else if (direction.Equals("priceztoa"))
            {
                var products = await productsQueryable.OrderByDescending(x => x.Price).ToListAsync();
                return mapper.Map<List<ProductDTO>>(products);
            }
            else if (direction.Equals("dateatoz"))
            {
                var products = await productsQueryable.OrderBy(x => x.ReleaseDate).ToListAsync();
                return mapper.Map<List<ProductDTO>>(products);
            }
            else if (direction.Equals("dateztoa"))
            {
                var products = await productsQueryable.OrderByDescending(x => x.ReleaseDate).ToListAsync();
                return mapper.Map<List<ProductDTO>>(products);
            };
            var productDefault = await context.Products.ToListAsync();
            return mapper.Map<List<ProductDTO>>(productDefault);
        }

        //[HttpGet("getSortProducts")]
        //public async Task<ActionResult<List<ProductDTO>>> SortFilter(string sortBy)
        //{

        //}

        [HttpGet("filter")]
        public async Task<ActionResult<List<ProductDTO>>> Filter([FromQuery] FilterProducsDTO filterProducsDTO)
        {
            var productsQueryable = context.Products
                .Include(x => x.ProductGenres).ThenInclude(x => x.Genre)
                .Include(x => x.Category)
                .Include(x => x.Photos)
                .Include(x => x.Publisher)
                .AsQueryable();
            if(!string.IsNullOrEmpty(filterProducsDTO.Name))
            {
                productsQueryable = productsQueryable
                    .Where(x => x.Name.Contains(filterProducsDTO.Name));
            };

            switch (filterProducsDTO.SortBy)
            {
                case "nameatoz":
                    productsQueryable = productsQueryable.OrderBy(x => x.Name);
                    break;

                case "nameztoa":
                    productsQueryable = productsQueryable.OrderByDescending(x => x.Name);
                    break;

                case "priceatoz":
                    productsQueryable = productsQueryable.OrderBy(x => x.Price);
                    break;

                case "priceztoa":
                    productsQueryable = productsQueryable.OrderByDescending(x => x.Price);
                    break;

                case "dateatoz":
                    productsQueryable = productsQueryable.OrderBy(x => x.ReleaseDate);
                    break;

                case "dateztoa":
                    productsQueryable = productsQueryable.OrderByDescending(x => x.ReleaseDate);
                    break;

                default:
                    productsQueryable = productsQueryable.OrderBy(x => x.Name);
                    break;
            }
 

            if(filterProducsDTO.PriceFilter1)
            {
                productsQueryable = productsQueryable
                    .Where(x => x.Price > 0 && x.Price <= 150000);
            };

            if (filterProducsDTO.PriceFilter2)
            {
                productsQueryable = productsQueryable
                    .Where(x => x.Price >= 150000 && x.Price <= 300000);
            };

            if (filterProducsDTO.PriceFilter3)
            {
                productsQueryable = productsQueryable
                    .Where(x => x.Price >= 300000 && x.Price <= 500000);
            };

            if (filterProducsDTO.PriceFilter4)
            {
                productsQueryable = productsQueryable
                    .Where(x => x.Price >= 500000 && x.Price <= 700000);
            };

            if (filterProducsDTO.GenreId != 0)
            {
                productsQueryable = productsQueryable
                    .Where(x => x.ProductGenres.Select(y => y.GenreId)
                    .Contains(filterProducsDTO.GenreId));
            };

            if (filterProducsDTO.CategoryId != 0)
            {
                productsQueryable = productsQueryable
                    .Where(x => x.CategoryId == filterProducsDTO.CategoryId);
            };

            if (filterProducsDTO.PublisherId != 0)
            {
                productsQueryable = productsQueryable
                    .Where(x => x.PublisherId == filterProducsDTO.PublisherId);
            };

            await HttpContext.InsertParametersPaginationInHeader(productsQueryable);
            var products = await productsQueryable
                .OrderBy(x => x.Name).Paginate(filterProducsDTO.PaginationDTO)
                .ToListAsync();
            return mapper.Map<List<ProductDTO>>(products);
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<ProductPostGetDTO>> PostGet()
        {
            var genres = await context.Genres.OrderBy(x => x.Name).ToListAsync();
            var genresDTO = mapper.Map<List<GenreDTO>>(genres);
            var categories = await context.Categories.OrderBy(x => x.Name).ToListAsync();
            var categoriesDTO = mapper.Map<List<CategoryDTO>>(categories);
            var publishers = await context.Publishers.OrderBy(x => x.Name).ToListAsync();
            var publishersDTO = mapper.Map<List<PublisherDTO>>(publishers);
            return new ProductPostGetDTO() { Genres = genresDTO, Categories = categoriesDTO, Publishers = publishersDTO };
        }

        [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<ProductPutGetDTO>> PutGet(int id)
        {
            var productActionResult = await Get(id);
            if(productActionResult.Result is NotFoundResult) { return NotFound(); }
            var product = productActionResult.Value;

            var genresSeletedIds = product.Genres.Select(x => x.Id).ToList();
            var nonSelectedGenres = await context.Genres.Where(x => !genresSeletedIds.Contains(x.Id))
                .ToListAsync();
            var nonSelectedGenresDTOs = mapper.Map<List<GenreDTO>>(nonSelectedGenres);
            var response = new ProductPutGetDTO();
            response.Product = product;
            response.SelectedGenres = product.Genres;
            response.NonSelectedGenres = nonSelectedGenresDTOs;
            return response;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ProductCreationDTO productCreationDTO)
        {
            var product = await context.Products
                .Include(x => x.ProductGenres)
                .FirstOrDefaultAsync(x => x.Id == id);
            if(product == null)
            {
                return NotFound();
            }
            product = mapper.Map(productCreationDTO, product);
            if(productCreationDTO.ProductImage != null)
            {
                product.ProductImage = await fileStorageService.EditFile(container, productCreationDTO.ProductImage, 
                    product.ProductImage);
            }
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] ProductCreationDTO productCreationDTO)
        {
            var product = mapper.Map<Product>(productCreationDTO);
            if(productCreationDTO.ProductImage != null)
            {
                product.ProductImage = await fileStorageService.SaveFile(container, productCreationDTO.ProductImage);
            }
            context.Add(product);
            await context.SaveChangesAsync();
            return product.Id;
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var product = await context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if(product == null)
            {
                return NotFound();
            }
            context.Remove(product);
            await context.SaveChangesAsync();
            await fileStorageService.DeleteFile(product.ProductImage, container);
            return NoContent();
        }
    }
}
