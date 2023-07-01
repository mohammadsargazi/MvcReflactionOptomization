using CommonMvc.Entities;
using CommonMvc.Entities.Base;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace CommonMvc;

public class GenericMvcDbContext : DbContext, ICustomDbContext
{
    #region DbSets
    public DbSet<User> Users { get; set; }
    #endregion
    public GenericMvcDbContext(DbContextOptions<GenericMvcDbContext> options)
      : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder modelbuilder)
    {
        #region User
        modelbuilder.Entity<User>().HasData(GetUsers());
        #endregion


        base.OnModelCreating(modelbuilder);
    }

    /// <summary>
    /// Get a dictionary of a table values with the database Key property and Value as the representation string of the class
    /// </summary>
    /// <param name="type">Type of the requested Table</param>
    /// <returns></returns>
    public List<KeyValuePair<object, string>> GetTable(Type type)
    {
        //Get the DbContext Type
        var ttype = GetType();
        //The DbContext properties
        var props = ttype.GetProperties().ToList();
        // The DbSet property with base type @type
        var prop = props.Where(i => i.PropertyType.GenericTypeArguments.Any() && i.PropertyType.GenericTypeArguments.First() == type).FirstOrDefault();

        //The DbSet instance
        var pvalue = prop?.GetValue(this);

        // Dictionary to return
        var l = new Dictionary<object, string>();

        var pv = (IEnumerable<object>)pvalue;

        //The entity Key property
        var keyprop = type.GetProperties().First(i => i.CustomAttributes.Any(j => j.AttributeType == typeof(KeyAttribute)));

        //Fills the dictionary
        foreach (BaseEntity item in pv)
        {
            //with the key and the ToString() entity result
            l.Add(keyprop.GetValue(item), item.ToString());
        }
        return l.ToList();
    }

    /// <summary>
    /// Get a table casted to Objects
    /// </summary>
    /// <param name="type">Type of the requested Table</param>
    /// <param name="cast">Only to generate a different method signature</param>
    /// <returns></returns>
    public IEnumerable<object> GetTable(Type type, bool cast = true)
    {
        //Get the DbContext Type
        var ttype = GetType();
        //The DbContext properties
        var props = ttype.GetProperties().ToList();
        // The DbSet property with base type @type
        var prop = props.Where(i => i.PropertyType.GenericTypeArguments.Any() && i.PropertyType.GenericTypeArguments.First() == type).FirstOrDefault();

        //The DbSet instance
        var pvalue = prop?.GetValue(this);

        // Dictionary to return
        var l = new Dictionary<object, string>();

        var pv = (IEnumerable<object>)pvalue;

        return pv;
    }

    private List<User> GetUsers()
    {
        var users = new List<User>();
        for (int i = 1; i <= 10; i++)
        {
            users.Add(new User
            {
                Id = i,
                CreateDate = DateTime.Now,
                Email = "Admin@yahoo.com",
                UserName = "admin" + i,
                Password = "123456@a",
                Visible = true
            });
        }
        return users;
    }
}
