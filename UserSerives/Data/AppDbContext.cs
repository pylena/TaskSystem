﻿using Microsoft.EntityFrameworkCore;
using UserSerives.Models;

namespace UserSerives.Data
{
    public class AppDbContext : DbContext
    {

        public DbSet<User> Users { get; set; }


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {}



    }
}
