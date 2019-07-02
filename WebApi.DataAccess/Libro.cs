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

        [ForeignKey("IdAutor")]
        public Autor Autor { get; set; }

        public int IdAutor { get; set; }

        [ForeignKey("IdCategoria")]
        public Categoria Categoria { get; set; }

        public int IdCategoria { get; set; }

        [Required]
        public string ISBN { get; set; }
    }
}