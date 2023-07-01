using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace CommonMvc.Controllers.Base;

public class BaseController<T> : Controller where T : DbContext, ICustomDbContext
{
    protected T _context;
    protected IConfiguration _config;
    private readonly IWebHostEnvironment _webHostEnvironment;
    public BaseController(T context, IConfiguration config, IWebHostEnvironment webHostEnvironment)
    {
        _context = context;
        _config = config;
        _webHostEnvironment = webHostEnvironment;
    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        base.OnActionExecuting(context);
        //Get the current assembly
        var assembly = typeof(BaseController<T>).Assembly;
        var types = assembly.GetTypes();
        //load types of Base type GenericController
        var types1 = types.Where(i => i.BaseType != null && i.BaseType.Name.Contains("GenericController")).ToList();
        ViewBag.LControllers = types1;
        ViewBag.Host = (Request.IsHttps ? "https://" : "http://") + Request.Host;
        ViewBag.Controller = RouteData.Values["controller"];
        ViewBag.Action = RouteData.Values["action"];

    }
}
