namespace CommonMvc;

public interface ICustomDbContext
{
    IEnumerable<object> GetTable(Type type, bool cast);
    List<KeyValuePair<object, string>> GetTable(Type type);
}
