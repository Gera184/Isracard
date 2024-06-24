
namespace backend.Models.Responses
{
    public class BeResponse<T>
    {
        public bool isSuccess { get; set; }
        public required int statusCode { get; set; }
        public string? message { get; set; }
        public T? payload { get; set; }


    }
}