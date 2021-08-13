using MangaEcommerce.Models;
using MangaEcommerce.Models.OrderAggregate;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.DatabaseContext
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductGenre> ProductGenres { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Models.Address> Addresses { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Order>().OwnsOne(o => o.ShipToAddress, a =>
            {
                a.WithOwner();
            });
            builder.Entity<Order>().Property(s => s.Status)
                .HasConversion(
                    o => o.ToString(),
                    o => (OrderStatus)Enum.Parse(typeof(OrderStatus), o)
                );
            builder.Entity<Order>().HasMany(o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<OrderItem>().OwnsOne(i => i.ItemOrdered, io => { io.WithOwner(); });
            builder.Entity<ProductGenre>()
                .HasKey(x => new { x.ProductId, x.GenreId });

            builder.Entity<Category>().HasData(
                new Category
                {
                    Id = 1,
                    Name = "Light Novel"
                },
                new Category
                {
                    Id = 2,
                    Name = "Manga"
                },
                new Category
                {
                    Id = 3,
                    Name = "Văn học"
                }

            );
            builder.Entity<Genre>().HasData(
                new Genre
                {
                    Id = 1,
                    Name = "Lãng mạn"
                },
                new Genre
                {
                    Id = 2,
                    Name = "Hành động"
                },
                new Genre
                {
                    Id = 3,
                    Name = "Kinh dị"
                },
                new Genre
                {
                    Id = 4,
                    Name = "Siêu nhiên"
                }
            );
            base.OnModelCreating(builder);
        }
    }
}
