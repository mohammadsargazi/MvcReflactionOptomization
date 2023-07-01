using Microsoft.EntityFrameworkCore;
using CommonMvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<GenericMvcDbContext>(options =>
                 options.UseSqlServer(builder
                        .Configuration.GetConnectionString("Default"),
                         x => x.MigrationsAssembly("CommonMvc")));

builder.Services.AddScoped<DbContext, GenericMvcDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=User}/{action=Index}/{id?}");

app.Run();
