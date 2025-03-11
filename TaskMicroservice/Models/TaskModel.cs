using System.ComponentModel.DataAnnotations;

namespace TaskMicroservice.Models
{
    public class TaskModel
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string title { get; set; }

        [Required]
        public string description { get; set; }

        public bool Completed { get; set; } = false; // by default uncompleted 


    }
}
