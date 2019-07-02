import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../Models/Libros.class';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { AutorService } from '../../services/autor.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../Models/Categoria.class';
import { Autor } from '../../Models/Autor.class';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  columnDefs = [];
  infoData = [];
  Libro = new Libro();
  frm: FormGroup;
  editable = false;
  categorias = [];
  autores = [];
  constructor(private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private service: LibrosService,
              private serviceAutor: AutorService,
              private serviceCategoria: CategoriaService
              ) { }

  ngOnInit() {
    this.LoadForm();
  }


  LoadForm() {
    this.columnDefs = [
      { headerName: 'ID', field: 'idLibro' , filter : true },
      { headerName: 'Nombre', field: 'Nombre' , filter : true },
      { headerName: 'Autor', field: 'IdAutor' , filter : true },
      { headerName: 'Categoria', field: 'IdCategoria' , filter : true },
      { headerName: 'ISBN', field: 'ISBN' , filter : true },
      ];
    this.frm = new FormGroup({
        Nombre: new FormControl('', [Validators.required]),
        Autor: new FormControl(undefined , [Validators.required]),
        Categoria: new FormControl(undefined , [Validators.required]),
        ISBN: new FormControl(undefined , [Validators.required])
      });
    this.LoadInfo();
    this.editable = false;
  }

  LoadInfo() {
    this.spinner.show();
    this.service.GetLibros()
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        (data: Libro[]) => {
          if (data) {
           this.infoData = data;
          }
        },
        (error: any) => {
         console.log(error);
        }
      );
    this.Categorias();
    this.Autores();
  }

  Autores() {
    this.spinner.show();
    this.serviceAutor.GetAutores()
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        (data: Autor[]) => {
          if (data) {
           this.autores = data;
          }
        },
        (error: any) => {
         console.log(error);
        }
      );
  }

  Categorias() {
    this.spinner.show();
    this.serviceCategoria.GetCategoria()
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        (data: Categoria[]) => {
          if (data) {
           this.categorias = data;
          }
        },
        (error: any) => {
         console.log(error);
        }
      );
  }

  Guardar() {
    if (this.frm.valid) {
      this.Libro.Nombre = this.frm.controls.Nombre.value;
      this.Libro.IdAutor = this.frm.controls.Autor.value;
      this.Libro.IdCategoria = this.frm.controls.Categoria.value;
      this.Libro.ISBN = this.frm.controls.ISBN.value;
      this.service.postLibro(this.Libro)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        data => {
          if (data) {
            this.toastr.success('Registro Insertado!', 'Aviso!');
            this.frm.reset();
            this.LoadInfo();
          }
        },
        (error: any) => {
         console.log(error);
        }
      );
    } else {
      this.toastr.warning('Formulario Incompleto!', 'Alerta!');
    }
  }

  EditarCell = (fila) => {
    console.log(fila);
    if (fila) {
      this.editable = true;
      this.Libro = fila;
      this.frm.controls.Nombre.setValue(fila.Nombre);
      this.frm.controls.Autor.setValue(fila.Autor);
      this.frm.controls.Categoria.setValue(fila.Categoria);
      this.frm.controls.ISBN.setValue(fila.ISBN);
    } else {
      this.editable = false;
    }
  }

  Editar() {
    if (this.frm.valid && this.editable) {
      this.Libro.Nombre = this.frm.controls.Nombre.value;
      this.Libro.IdAutor = this.frm.controls.Autor.value;
      this.Libro.IdCategoria = this.frm.controls.Categoria.value;
      this.spinner.show();
      this.service.putLibro(this.Libro)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        data => {
          if (data) {
            this.toastr.success('Registro Actualizado!', 'Aviso!');
            this.frm.reset();
            this.LoadInfo();
          }
        },
        (error: any) => {
         console.log(error);
        }
      );
    } else {
      this.toastr.warning('Debe Seleccionar un registro para editar!', 'Aviso!');
    }
  }


}
