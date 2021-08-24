using EyeglassBay.Api.Extensions;
using EyeglassBay.Api.Middleware;
using EyeglassBay.Application.Handlers;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace EyeglassBay.Api
{
    public class Startup
    {
        private readonly IConfiguration _config;
        
        public Startup(IConfiguration config)
        {
            _config = config;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            }).AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssemblyContaining<EbayGetItemsQueryHandler>();
            });
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
            
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opt => opt.NoReferrer());
            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            app.UseXfo(opt => opt.Deny());
            app.UseCsp(opt => opt
                .BlockAllMixedContent()
                .StyleSources(s => s.Self().CustomSources(
                    "https://fonts.googleapis.com",
                    "sha256-/epqQuRElKW1Z83z1Sg8Bs2MKi99Nrq41Z3fnS2Nrgk=",
                    "sha256-2aahydUs+he2AO0g7YZuG67RGvfE9VXGbycVgIwMnBI=",
                    "sha256-+oGcdj5BhO6SoiIGYIkPOMYi7d2h2Pp/bkJLBfYL+kk=",
                    "sha256-wkAU1AW/h8YFx0XlzvpTllAKnFEO2tw8aKErs5a26LY="
                ))
                .FontSources(s => s.Self().CustomSources(
                    "https://fonts.gstatic.com", "data:"
                ))
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self().CustomSources(
                    "https://res.cloudinary.com",
                    "https://www.facebook.com",
                    "https://platform-lookaside.fbsbx.com",
                    "data:"
                ))
                .ScriptSources(s => s.Self()
                    .CustomSources(
                        "sha256-8cif3HVcZMQmz002SNt8xTuOGlfdcERoEg6QGIhyEXk=",
                        "sha256-Tui7QoFlnLXkJCSl1/JvEZdIXTmBttnWNxzJpXomQjg=",
                        "sha256-Tj9wVjD6J24cRQ8weyZ9hFZG0TLwgAk4Y++rUjhiuH8="
                    ))
            );
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EyeglassBay.Api v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            //use wwwroot
            app.UseDefaultFiles();
            app.UseStaticFiles();
            
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}