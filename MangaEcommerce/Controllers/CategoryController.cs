using AutoMapper;
using MangaEcommerce.DatabaseContext;
using MangaEcommerce.DTOs;
using MangaEcommerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController: ControllerBase
    {
        private readonly ILogger<CategoryController> logger;

        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public CategoryController(ILogger<CategoryController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<CategoryDTO>>> Get()
        {

            var categories =  await context.Categories.ToListAsync();
            return mapper.Map<List<CategoryDTO>>(categories);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<CategoryDTO>> Get(int Id)
        {
            var category = await context.Categories.Include(x => x.Products).FirstOrDefaultAsync(x => x.Id == Id);
            if (category == null)
            {
                return NotFound();
            }
            return mapper.Map<CategoryDTO>(category);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CategoryCreationDTO categoryCreationDTO) 
        {
            var category = mapper.Map<Category>(categoryCreationDTO);
            context.Add(category);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] CategoryCreationDTO categoryCreationDTO)
        {
            var category = mapper.Map<Category>(categoryCreationDTO);
            category.Id = id;
            context.Entry(category).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int Id)
        {
            var category = await context.Categories.FirstOrDefaultAsync(x => x.Id == Id);

            if (category == null)
            {
                return NotFound();
            }

            context.Remove(category);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
