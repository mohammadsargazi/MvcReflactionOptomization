using CommonMvc.Entities;
using CommonMvc;

namespace OptimizeTranditionalReflaction.Controllers;

public class UserController : GenericController<User, GenericMvcDbContext>
{
    public UserController(GenericMvcDbContext context, IConfiguration config, IWebHostEnvironment webHostEnvironment)
        : base(context, config, webHostEnvironment) { }
}
