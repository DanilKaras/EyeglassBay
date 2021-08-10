using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EyeglassBay.Domain.Entities;

namespace EyeglassBay.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.EyeGlasses.Any()) return;

            var eyeGlasses = new List<EyeGlass>
            {
                new ()
                {
                    ProductName = "PERSOL PO3175V 9057 Tortoise Grey Demo Lens Men's Eyeglasses 52 mm",
                    Brand = "",
                    Model = "",
                    Color = "",
                    Price = 119
                },
                new ()
                {
                    ProductName = "SAINT LAURENT SL7 006 Black Havana Demo Lens Unisex Eyeglasses 51mm B7",
                    Brand = "",
                    Model = "",
                    Color = "",
                    Price = 124.44
                },
                new()
                {
                    ProductName = "Burberry BE4273 30015V Black Men's Authentic Sunglasses 52-21",
                    Brand = "",
                    Model = "",
                    Color = "",
                    Price = 139
                }
            };

            await context.EyeGlasses.AddRangeAsync(eyeGlasses);
            await context.SaveChangesAsync();
        }
    }
}