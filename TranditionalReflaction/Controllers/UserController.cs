using CommonMvc.Entities;
using CommonMvc;
using Microsoft.AspNetCore.Mvc;

namespace TranditionalReflaction.Controllers;

public class UserController : GenericController<User, GenericMvcDbContext>
{
    public UserController(GenericMvcDbContext context, IConfiguration config, IWebHostEnvironment webHostEnvironment)
        : base(context, config, webHostEnvironment) { }
}
