using AutoMapper;
using MangaEcommerce.DTOs;
using MangaEcommerce.Models;
using MangaEcommerce.Models.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Helper
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<GenreDTO, Genre>().ReverseMap();
            CreateMap<GenreCreationDTO, Genre>();
            CreateMap<CategoryDTO, Category>()
                .ForMember(x => x.Products, options => options.MapFrom(MapCategoryProduct))
                .ReverseMap();
            CreateMap<CategoryCreationDTO, Category>();
            CreateMap<PublisherDTO, Publisher>().ReverseMap();
            CreateMap<PublisherCreationDTO, Publisher>().ForMember(x => x.Picture, option => option.Ignore());
            CreateMap<ProductCreationDTO, Product>()
                .ForMember(x => x.ProductImage, option => option.Ignore())
                .ForMember(x => x.ProductGenres, option => option.MapFrom(MapProductGenres));
            CreateMap<Product, ProductDTO>()
                .ForMember(opt => opt.ProductImage, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(x => x.Genres, options => options.MapFrom(MapProductGenres))
                .ForMember(x => x.CategoryName, option => option.MapFrom(src => src.Category.Name));
            CreateMap<UserCredentials, ApplicationUser>()
                .ForMember(x => x.ProfileImageURL, option => option.Ignore());
            CreateMap<UserCredentials, UserLogin>();
            CreateMap<Rating, RatingForReturnDTO>();
            CreateMap<ApplicationUser, UserDTO>().ForMember(x => x.MainAddress, x => x.MapFrom(src => src.Addresses.FirstOrDefault(p => p.IsMainAddress)));
            CreateMap<AddressCreationDTO, Models.Address>();
            CreateMap<Models.Address, AddressDTO>()
                .ReverseMap();
            CreateMap<Models.OrderAggregate.Address, AddressDTO>().ReverseMap();
            CreateMap<PhotoDTO, Photo>().ReverseMap();
            CreateMap<PhotoForCreationDTO, Photo>();
            CreateMap<Photo, PhotoForReturnDTO>();
            CreateMap<Order, OrderToReturnDTO>()
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price))
                .ForMember(d => d.PaymentMethod, o => o.MapFrom(s => s.PaymentMethod.Description));
            CreateMap<OrderItem, OrderItemDTO>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d => d.ProductImage, o => o.MapFrom(s => s.ItemOrdered.ProductImage));
        }

        private List<ProductGenre> MapProductGenres(ProductCreationDTO productCreationDTO, Product product)
        {
            var result = new List<ProductGenre>();
            if(productCreationDTO.GenresIds == null) { return result; }
            foreach(int id in productCreationDTO.GenresIds)
            {
                result.Add(new ProductGenre() { GenreId = id });
            }
            return result;
        }

        private List<GenreDTO> MapProductGenres(Product product, ProductDTO productDTO)
        {
            var result = new List<GenreDTO>();

            if (product.ProductGenres != null)
            {
                foreach (var genre in product.ProductGenres)
                {
                    result.Add(new GenreDTO() { Id = genre.GenreId, Name = genre.Genre.Name });
                }
            }

            return result;
        }

        private List<ProductDTO> MapCategoryProduct(CategoryDTO categoryDTO, Category category)
        {
            var result = new List<ProductDTO>();

            if (category.Products != null)
            {
                foreach (var product in category.Products)
                {
                    result.Add(new ProductDTO() 
                        { 
                            Id = product.Id, 
                            Name = product.Name,
                            Size = product.Size,
                            Price = product.Price,
                            Cover = product.Cover,
                            Pages = product.Pages,
                            Translators = product.Translators,
                            ProductImage = product.ProductImage,
                            ReleaseDate = product.ReleaseDate,
                            PublisherName = product.Publisher.Name
                        });
                }
            }
            return result;
        }

    }
}
