using System.ComponentModel.DataAnnotations;

namespace TaskMicroservice.Models.Dto
{
    public class TaskDto
    {
        public string title { get; set; }

        public string description { get; set; }

        public bool Completed { get; set; } = false; // by default uncompleted 

    }
}
