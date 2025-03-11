using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TaskMicroservice.Data;
using TaskMicroservice.Models;
using TaskMicroservice.Models.Dto;

namespace TaskMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly AppDbContext _db;
        public TaskController(AppDbContext db)
        {
            _db = db; 
        }

        //get list of task
        [HttpGet]

        public IActionResult getListOfTasks()
        {
            var allTasks = _db.Tasks.ToList(); 
            return Ok(allTasks);
        }
        // add new task

        [HttpPost]
        public IActionResult addTask(TaskDto newTask)
        {
            var TaskEntity = new TaskModel()
            {
                Id = Guid.NewGuid().ToString(), // random id
                title = newTask.title,
                description = newTask.description,
                Completed = newTask.Completed



            };
            _db.Tasks.Add(TaskEntity); 
            _db.SaveChanges(); // add it to task table
            return Ok(TaskEntity);
        }

        [HttpGet("{id}")] // Unique route

        public IActionResult getTaskById(string id)
        {
            var task = _db.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound(); // if there is no matching task
            }
            return Ok(task);

        }


        //delete task
        [HttpDelete]
        public IActionResult deleteTask(string taskId) { 

            var task = _db.Tasks.FirstOrDefault(t => t.Id == taskId); // find matching task id
            _db.Tasks.Remove(task);
            _db.SaveChanges();
            return Ok(task);
        }

        //update task
        [HttpPut]
        public IActionResult updateTask(string id, TaskDto updatTask)
        {
            var task = _db.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }
            task.title = updatTask.title;
            task.description = updatTask.description;
            task.Completed = updatTask.Completed;

            _db.SaveChanges();
            return Ok(task);

        }
    }
}
