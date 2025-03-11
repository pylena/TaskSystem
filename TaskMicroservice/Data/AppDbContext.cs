using Microsoft.EntityFrameworkCore;
using TaskMicroservice.Models;

namespace TaskMicroservice.Data
{
    public class AppDbContext : DbContext
    {

       public  DbSet<TaskModel> Tasks { get; set; }


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {


        }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskModel>()
                .HasKey(t => t.Id);
        }

    }
}
