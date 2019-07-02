using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace WebApi.DataAccess
{
    public class ApiDbContext : DbContext
    {
        public virtual DbSet<Autor> Autor { get; set; }

        public virtual DbSet<Categoria> Categoria { get; set; }
        public virtual DbSet<Libro> Libro { get; set; }

        public ApiDbContext()
        {
        }

        //Constructor con parametros para la configuracion
        public ApiDbContext(DbContextOptions options)
            : base(options)
        {
        }
    }
}