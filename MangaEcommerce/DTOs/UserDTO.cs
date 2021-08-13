using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MangaEcommerce.DTOs
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Gender { get; set; }
        public AddressDTO MainAddress { get; set; }
        public string ProfileImageURl { get; set; }
        public List<AddressDTO> Addresses { get; set; }
    }
}
