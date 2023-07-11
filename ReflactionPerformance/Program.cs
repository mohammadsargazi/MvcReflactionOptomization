using BenchmarkDotNet.Running;
using CommonMvc;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ReflactionPerformance;


////var builder = WebApplication.CreateBuilder(args);

////builder.Services.AddDbContext<GenericMvcDbContext>(options =>
////                 options.UseSqlServer(builder
////                        .Configuration.GetConnectionString("Default"),
////                         x => x.MigrationsAssembly("CommonMvc")));


////builder.Services.AddScoped<DbContext, GenericMvcDbContext>();

//var bch = new ReflectionBenchmarks();
//bch.TraditionalReflectionIndexAction();
//bch.OptimizeReflectionIndexAction();


BenchmarkRunner.Run<ReflectionBenchmarks>();