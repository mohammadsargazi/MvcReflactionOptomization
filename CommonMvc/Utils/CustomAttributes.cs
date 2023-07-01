namespace CommonMvc.Utils;

public enum DeleteBehaviorAttr
{
    Delete = 0,
    Hide = 1
}
public class DeleteBehaviorAttribute : Attribute
{
    public DeleteBehaviorAttr behavior;

    public DeleteBehaviorAttribute(DeleteBehaviorAttr behavior)
    {
        this.behavior = behavior;
    }
}

public class DisplayTableNameAttribute : Attribute
{
    public string Name { get; set; }
}
public class NotShowInListAttribute : Attribute
{

}
public class NotListedAttribute : Attribute
{
}
public class NeverUpdateAttribute : Attribute
{
}

public class ChainOfCreationAttribute : Attribute
{
    public Type[] types;

    public ChainOfCreationAttribute(params Type[] types)
    {
        this.types = types;
    }
}
public class CircularReferenceAttribute : Attribute
{

}
