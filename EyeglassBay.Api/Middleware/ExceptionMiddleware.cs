using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using EyeglassBay.Application.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace EyeglassBay.Api.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                if (context == null)
                {
                    throw new Exception("Context is empty!");
                }
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                if (context != null)
                {
                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                    var response = _env.IsDevelopment()
                        ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
                        : new AppException(context.Response.StatusCode, "Server Error");

                    var option = new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                    var json = JsonSerializer.Serialize(response, option);
                    if (string.IsNullOrEmpty(json))
                    {
                        json = "Something bad and unknown happened";
                    }
                    await context.Response.WriteAsync(json);
                }
            }
        }
    }
}