using AutoMapper;
using MangaEcommerce.DatabaseContext;
using MangaEcommerce.DTOs;
using MangaEcommerce.Helper;
using MangaEcommerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Controllers
{
    [Route("api/publishers")]
    [ApiController]
    public class PublisherController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        public readonly string containerName = "publishers";

        public PublisherController(ApplicationDbContext context, IMapper mapper,
            IFileStorageService fileStorageService)
        {
            this.fileStorageService = fileStorageService;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<PublisherDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Publishers.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var publishers = await queryable.Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<PublisherDTO>>(publishers);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<PublisherDTO>> Get(int Id)
        {
            var publisher = await context.Publishers.FirstOrDefaultAsync(x => x.Id == Id);
            if (publisher == null)
            {
                return NotFound();
            }
            return mapper.Map<PublisherDTO>(publisher);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] PublisherCreationDTO publisherCreationDTO)
        {
            var publisher = mapper.Map<Publisher>(publisherCreationDTO);
            if(publisherCreationDTO.Picture != null)
            {
                publisher.Picture = await fileStorageService.SaveFile(containerName, publisherCreationDTO.Picture);
            }
            context.Add(publisher);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] PublisherCreationDTO publisherCreationDTO)
        {
            var publisher = await context.Publishers.FirstOrDefaultAsync(x => x.Id == id);

            if (publisher == null)
            {
                return NotFound();
            }

            publisher = mapper.Map(publisherCreationDTO, publisher);

            if (publisherCreationDTO.Picture != null)
            {
                publisher.Picture = await fileStorageService.EditFile(containerName,
                    publisherCreationDTO.Picture, publisher.Picture);
            }

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var publisher = await context.Publishers.FirstOrDefaultAsync(x => x.Id == id);

            if (publisher == null)
            {
                return NotFound();
            }

            context.Remove(publisher);
            await context.SaveChangesAsync();

            await fileStorageService.DeleteFile(publisher.Picture, containerName);

            return NoContent();
        }
    }
}
