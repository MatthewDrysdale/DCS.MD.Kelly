using DCS.MD.Kelly.Web;
using DCS.MD.Kelly.Web.Services;
using DCS.MD.Logging;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

#region Logger Setup
LoggerConfig? loggerConfig = builder.Configuration.GetSection("LoggerConfig").Get<LoggerConfig>();

Logger logger = DCS.MD.Logging.LoggerFactory.CreateFromConfig(loggerConfig!);

builder.Services.AddSingleton(logger);
#endregion

builder.Services.AddScoped<AuthService>();

builder.Services.AddScoped(sp =>
    new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.Services.AddScoped<DataService>();

await builder.Build().RunAsync();
