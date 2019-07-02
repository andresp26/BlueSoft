import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../Models/Categoria.class';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  readonly rootURL = 'https://localhost:44349/api';
  readonly token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFuZHJlcyJ9.Aa2_YawSOceAQGzqiIBkq5JM2ThMaNrY3HMXxkDPG38";

  constructor(private http: HttpClient) { }

  postCategoria(data: Categoria) {
    return this.http.post(this.rootURL + '/Categorias', data);
  }
  putCategoria(data: Categoria) {
    return this.http.put(this.rootURL + '/Categorias/' + data.idCategoria , data);
  }
  deleteCategoria(id: any) {
    return this.http.delete(this.rootURL + '/Categorias/' + id);
  }

  GetCategoria() {
   return  this.http.get(this.rootURL + '/Categorias');
  }
}
