using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CommonMvc.Utils;

namespace CommonMvc.Entities.Base;

public class BaseEntity
{
    public BaseEntity()
    {
        Visible = true;
        CreateDate = DateTime.Now;
    }
    [Key()]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [NotListed]
    public int Id { get; set; }
    [NeverUpdate]
    [NotListed]
    public DateTime CreateDate { get; set; }
    [NeverUpdate]
    [NotListed]
    public bool Visible { get; set; }
}
