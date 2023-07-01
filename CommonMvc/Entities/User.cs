using CommonMvc.Entities.Base;
using CommonMvc.Utils;

namespace CommonMvc.Entities;

[DisplayTableName(Name = "User")]
public class User : BaseEntity
{
    public string UserName { get; set; }
    public string Password { get; set; }
    [NotShowInList]
    public string Email { get; set; }
    public override string ToString()
    {
        return UserName;
    }
}
