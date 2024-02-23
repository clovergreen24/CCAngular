import { Grupo } from './../model/grupo.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Usuario } from '../model/usuario.interface';
import * as jwt_decode from 'jwt-decode';
import { CrearGrupo } from '../model/crearGrupo.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioUrl: string = "http://localhost:8080/jwt/usuario"

  constructor(private http: HttpClient, private router: Router) { }

  /*getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuarioUrl)
      .pipe( //pipe se utiliza para composición de operadores separados por coma
        catchError((err: any) => {
          return Observable.of([])})
      );
  }*/

  
  getUsuario(username: string): Observable<Usuario> {
    const url = `${this.usuarioUrl}/username/${username}`;
    return this.http.get<Usuario>(url, { withCredentials: true });
  }
  
  getGrupos(username: string): Observable<Grupo[]>{
    console.log("llegue a usuario service");
    
    return this.http.get<Grupo[]>(this.usuarioUrl + "/" + username + "/grupos");
  }

  crearGrupo(username: String, form: CrearGrupo){
    console.log("estoy por crear un grupo");
    
    this.http.post<Usuario>(this.usuarioUrl + "/" + username + "/crearGrupo", form,  { withCredentials: true });
    console.log("lo cree?");
    this.router.navigate([username + "/misGrupos"])
  }
}
  