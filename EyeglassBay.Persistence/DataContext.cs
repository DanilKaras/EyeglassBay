using EyeglassBay.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EyeglassBay.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<EyeGlass> EyeGlasses { get; set; }
    }
}