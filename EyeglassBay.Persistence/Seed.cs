using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EyeglassBay.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace EyeglassBay.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, IConfiguration configuration)
        {
            if (!userManager.Users.Any())
            {
                var email = configuration["User:Email"];
                var password = configuration["User:Password"];

                var user = new AppUser
                {
                    UserName = "Admin",
                    Email = email
                };
                await userManager.CreateAsync(user, password);
            }

            if (!context.EyeGlasses.Any())
            {

                var eyeGlasses = new List<EyeGlass>
                {
                    new()
                    {
                        ProductName = "PERSOL PO3175V 9057 Tortoise Grey Demo Lens Men's Eyeglasses 52 mm",
                        Brand = "Versace",
                        Model = "ve4359",
                        Color = "521771",
                        Price = 109
                    },
                    new()
                    {
                        ProductName = "SAINT LAURENT SL7 006 Black Havana Demo Lens Unisex Eyeglasses 51mm B7",
                        Brand = "SAINT LAURENT",
                        Model = "SL7",
                        Color = "006",
                        Price = 124.44
                    },
                    new()
                    {
                        ProductName = "Burberry BE4273 30015V Black Men's Authentic Sunglasses 52-21",
                        Brand = "Burberry",
                        Model = "BE4273",
                        Color = "30015V",
                        Price = 139
                    }
                };

                await context.EyeGlasses.AddRangeAsync(eyeGlasses);
            }

            await context.SaveChangesAsync();
        }
    }
}