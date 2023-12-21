import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import 'rxjs/add/observable/of';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioUrl = 'localhost:8080/usuario';

  constructor(private http: HttpClient) { }

  /*getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuarioUrl)
      .pipe( //pipe se utiliza para composición de operadores separados por coma
        catchError((err: any) => {
          return Observable.of([])})
      );
  }*/
}
