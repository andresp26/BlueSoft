import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Autor } from '../Models/Autor.class';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  readonly token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFuZHJlcyJ9.Aa2_YawSOceAQGzqiIBkq5JM2ThMaNrY3HMXxkDPG38';
  readonly rootURL = 'https://localhost:44349/api';
  
  constructor(private http: HttpClient) { }

  postAutor(data: Autor) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
    return this.http.post(this.rootURL + '/Autors', data);
  }
  putAutor(data: Autor) {
    return this.http.put(this.rootURL + '/Autors/' + data.idAutor , data);
  }
  deleteAutor(id: any) {
    return this.http.delete(this.rootURL + '/Autors/' + id);
  }

  GetAutores() {
   return  this.http.get(this.rootURL + '/Autors');
  }
}
