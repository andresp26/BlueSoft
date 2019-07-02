import { Autor } from './Autor.class';
import { Categoria } from './Categoria.class';
export class Libro {
    idLibro: number;
    Nombre: string;
    IdAutor: Autor;
    IdCategoria: Categoria;
    ISBN: string;
}
