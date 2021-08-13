using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.Models.OrderAggregate
{
    public class Address
    {
        public Address()
        {

        }
        public Address(string firstName, string lastName, string phone, string country, string street, string city, string ward, string district)
        {
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
            Country = country;
            Street = street;
            City = city;
            Ward = ward;
            District = district;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Ward { get; set; }
        public string District { get; set; }
    }
}
