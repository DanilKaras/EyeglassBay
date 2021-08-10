using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EyeglassBay.Domain.Entities
{
    [Table("EyeGlass")]
    public class EyeGlass
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(1024)]
        public string ProductName { get; set; }
        public double Price { get; set; }
        [MaxLength(256)]
        public string Brand { get; set; }
        [MaxLength(256)]
        public string Model { get; set; }
        [MaxLength(256)]
        public string Color { get; set; }
    }
}