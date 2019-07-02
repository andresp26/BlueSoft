import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../Models/Libros.class';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  readonly rootURL = 'https://localhost:44349/api';
  readonly token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFuZHJlcyJ9.Aa2_YawSOceAQGzqiIBkq5JM2ThMaNrY3HMXxkDPG38';
  constructor(private http: HttpClient) { }

  postLibro(data: Libro) {
    return this.http.post(this.rootURL + '/Libros', data);
  }
  putLibro(data: Libro) {
    return this.http.put(this.rootURL + '/Libros/' + data.idLibro , data);
  }
  deleteLibro(id: any) {
    return this.http.delete(this.rootURL + '/Libros/' + id);
  }

  GetLibros() {
   return  this.http.get(this.rootURL + '/Libros');
  }
}
