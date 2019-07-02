import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../Models/Categoria.class';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  columnDefs = [];
  infoData = [];
  categoria = new Categoria();
  frm: FormGroup;
  editable = false;
  constructor(private service: CategoriaService ,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService
              ) { }

  ngOnInit() {
    this.LoadForm();
  }



  LoadForm() {
    this.columnDefs = [
      { headerName: 'ID', field: 'idCategoria' , filter : true },
      { headerName: 'Nombre', field: 'Nombre' , filter : true },
      { headerName: 'Descripcion', field: 'Descripcion' , filter : true },
      ];
    this.frm = new FormGroup({
        Nombre: new FormControl('', [Validators.required]),
        Descripcion: new FormControl('' , [Validators.required]),
      });
    this.LoadInfo();
  }

  LoadInfo() {
    this.service.GetCategoria()
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        (data : Categoria[]) => {
          if (data) {
           this.infoData = data;
          }
        },
        (error: any) => {
         console.log(error);
        }
      );
  }

  Guardar() {
    if (this.frm.valid) {
      this.categoria.Nombre = this.frm.controls.Nombre.value;
      this.categoria.Descripcion = this.frm.controls.Descripcion.value;
      this.service.postCategoria(this.categoria)
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
      this.categoria = fila;
      this.frm.controls.Nombre.setValue(fila.Nombre);
      this.frm.controls.Descripcion.setValue(fila.Descripcion);
    } else {
      this.editable = false;
    }
  }

  Editar() {
    if (this.frm.valid && this.editable) {
      this.categoria.Nombre = this.frm.controls.Nombre.value;
      this.categoria.Descripcion = this.frm.controls.Descripcion.value;
      this.spinner.show();
      this.service.putCategoria(this.categoria)
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

  Eliminar = () => {
    try {
      if (this.categoria.idCategoria != undefined) {
        this.spinner.show();
        this.service.deleteCategoria(this.categoria.idCategoria)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe(
          data => {
            if (data) {
              this.toastr.success('Registro Eliminado!', 'Aviso!');
              this.frm.reset();
              this.LoadInfo();
            }
          },
          (error: any) => {
           console.log(error);
          }
        );
      } else {
        this.toastr.warning('Debe Seleccionar un registro para eliminar!', 'Aviso!');
      }
    } catch (error) {
    }
  }

}
