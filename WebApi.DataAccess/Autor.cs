using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.DataAccess
{
    public class Autor
    {
        [Key]
        public int idAutor { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Apellido { get; set; }

        [Required]
        public string Fecha_Nacimiento { get; set; }
    }
}