using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.DataAccess
{
    public class Libro
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idLibro { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public Autor IdAutor { get; set; }

        [Required]
        public Categoria IdCategoria { get; set; }

        [Required]
        public string ISBN { get; set; }
    }
}