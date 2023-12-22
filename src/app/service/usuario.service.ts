import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Usuario } from '../model/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioUrl: string = "http://localhost:8080/usuario"

  constructor(private http: HttpClient) { }

  /*getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuarioUrl)
      .pipe( //pipe se utiliza para composición de operadores separados por coma
        catchError((err: any) => {
          return Observable.of([])})
      );
  }*/

  
  getUsuario(id: number): Observable<Usuario> {
    const url = `${this.usuarioUrl}/${id}`;
    return this.http.get<Usuario>(url, { withCredentials: true });
  }
  
}
