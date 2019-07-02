import { Component, OnInit, ViewChild } from '@angular/core';
import { Autor } from '../../Models/Autor.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutorService } from '../../services/autor.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

  columnDefs = [];
  infoData = [];
  Autor = new Autor();
  editable = false;
  frm: FormGroup;
  constructor(private service: AutorService ,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
      this.LoadForm();
     
    }

    LoadForm() {
      this.columnDefs = [
        { headerName: 'ID', field: 'idAutor', filter: true },
        { headerName: 'Nombre', field: 'Nombre',  filter: true },
        { headerName: 'Apellido', field: 'Apellido',  filter: true },
        { headerName: 'Fecha Nacimiento', field: 'Fecha_Nacimiento',  filter: true },
        ];
      this.frm = new FormGroup({
          Nombre: new FormControl('', [Validators.required]),
          Apellido: new FormControl('' , [Validators.required]),
          Fecha: new FormControl('' , [Validators.required])
        });
      this.LoadInfo();
      this.editable = false;
    }

    LoadInfo() {
      this.spinner.show();
      this.service.GetAutores()
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe(
          (data : Autor[]) => {
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
      try {
        if (this.frm.valid) {
          this.Autor.Nombre = this.frm.controls.Nombre.value;
          this.Autor.Apellido = this.frm.controls.Apellido.value;
          this.Autor.Fecha_Nacimiento = this.frm.controls.Fecha.value;
          this.spinner.show();
          this.service.postAutor(this.Autor)
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
      } catch (error) {
      console.log(error);
      }
    }

    EditarCell = (fila) => {
      console.log(fila);
      if (fila) {
        this.editable = true;
        this.Autor = fila;
        this.frm.controls.Nombre.setValue(fila.Nombre);
        this.frm.controls.Apellido.setValue(fila.Apellido);
        this.frm.controls.Fecha.setValue(fila.Fecha_Nacimiento);
      } else {
        this.editable = false;
      }
    }

    Editar() {
      if (this.frm.valid && this.editable) {
        this.Autor.Nombre = this.frm.controls.Nombre.value;
        this.Autor.Apellido = this.frm.controls.Apellido.value;
        this.Autor.Fecha_Nacimiento = this.frm.controls.Fecha.value;
        this.spinner.show();
        this.service.putAutor(this.Autor)
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
        if (this.Autor.idAutor != undefined) {
          this.spinner.show();
          this.service.deleteAutor(this.Autor.idAutor)
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
