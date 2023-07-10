using BenchmarkDotNet.Attributes;
using CommonMvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;

namespace ReflactionPerformance;

[MemoryDiagnoser]
public class ReflectionBenchmarks
{
    #region Fields
    private TranditionalReflaction.Controllers.UserController _traditionalController;
    private OptimizeTranditionalReflaction.Controllers.UserController _optimizeTraditionalController;
    private IConfiguration _configuration;
    private IWebHostEnvironment _webHostEnvironment;
    private GenericMvcDbContext _context;
    #endregion

    #region Ctor
    public ReflectionBenchmarks()
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<GenericMvcDbContext>();
        optionsBuilder.UseSqlServer(configuration.GetConnectionString("Default"),
            x => x.MigrationsAssembly("CommonMvc"));

        _context = new GenericMvcDbContext(optionsBuilder.Options);
        _webHostEnvironment = EnvironmentFactory.GetEnvironment();
        _traditionalController = new TranditionalReflaction.Controllers.UserController(_context, _configuration, _webHostEnvironment);
        _optimizeTraditionalController = new OptimizeTranditionalReflaction.Controllers.UserController(_context, _configuration, _webHostEnvironment);
    }
    #endregion

    #region Benchmarks

    [Benchmark]
    public IActionResult TraditionalReflectionIndexAction()
    {
        return _traditionalController.Index(1, 10);
    }

    [Benchmark]
    public IActionResult OptimizeReflectionIndexAction()
    {
        return _optimizeTraditionalController.Index(1, 10);
    }
    #endregion
}

public class ConsoleEnvironment : IWebHostEnvironment
{
    public ConsoleEnvironment(string environmentName, string applicationName, string contentRootPath)
    {
        EnvironmentName = environmentName;
        ApplicationName = applicationName;
        ContentRootPath = contentRootPath;
    }

    public string WebRootPath { get; set; }
    public IFileProvider WebRootFileProvider { get; set; }
    public string ApplicationName { get; set; }
    public IFileProvider ContentRootFileProvider { get; set; }
    public string ContentRootPath { get; set; }
    public string EnvironmentName { get; set; }
}

public static class EnvironmentFactory
{
    private static readonly IWebHostEnvironment Environment = CreateEnvironment();

    public static IWebHostEnvironment GetEnvironment()
    {
        return Environment;
    }

    private static IWebHostEnvironment CreateEnvironment()
    {
        string environmentName = "Development"; // Set the desired environment name
        string applicationName = AppDomain.CurrentDomain.FriendlyName;
        string contentRootPath = AppDomain.CurrentDomain.BaseDirectory;

        return new ConsoleEnvironment(environmentName, applicationName, contentRootPath);
    }
}
