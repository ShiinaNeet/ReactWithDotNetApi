using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ReactWithWebApi.Server.Models
{
    public class Products
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string type { get; set; }
        [Required]
        public int quantity { get; set; }
    }
}
