using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.DataAccess;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutorsController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public AutorsController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/Autors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Autor>>> GetAutor()
        {
            return await _context.Autor.ToListAsync();
        }

        // GET: api/Autors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Autor>> GetAutor(int id)
        {
            var autor = await _context.Autor.FindAsync(id);

            if (autor == null)
            {
                return NotFound();
            }

            return autor;
        }

        // PUT: api/Autors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAutor(int id, Autor autor)
        {
            if (id != autor.idAutor)
            {
                return BadRequest();
            }

            _context.Entry(autor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AutorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(true);
        }

        // POST: api/Autors
        [HttpPost]
        public async Task<ActionResult<Autor>> PostAutor(Autor autor)
        {
            _context.Autor.Add(autor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAutor", new { id = autor.idAutor }, autor);
        }

        // DELETE: api/Autors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Autor>> DeleteAutor(int id)
        {
            var autor = await _context.Autor.FindAsync(id);
            if (autor == null)
            {
                return NotFound();
            }

            _context.Autor.Remove(autor);
            await _context.SaveChangesAsync();

            return autor;
        }

        private bool AutorExists(int id)
        {
            return _context.Autor.Any(e => e.idAutor == id);
        }
    }
}