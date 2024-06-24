namespace backend.Models
{
    public class Bank
    {
        public required string Name { get; set; }
        public int Code { get; set; }
        public string? Description { get; set; }
    }
}
