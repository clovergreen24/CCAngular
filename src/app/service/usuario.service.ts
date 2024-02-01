import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Usuario } from '../model/usuario.interface';
import { Grupo } from '../model/grupo.interface';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioUrl: string = "http://localhost:8080/jwt/usuario"

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
  
  getGrupos(username: string): Observable<Grupo[]>{
    console.log("llegue a usuario service");
    
    return this.http.get<Grupo[]>(this.usuarioUrl + "/" +username + "/grupos");
  }
}
