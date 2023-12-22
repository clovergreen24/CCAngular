import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registrarse } from '../model/registrarse.interface';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrarseService {
  usuarioUrl: string = "http://localhost:8080/usuario"

  constructor(private http: HttpClient) { }

//crear usuario
registrarUsuario(form: Registrarse): Observable<Usuario> {
  return this.http.post<Usuario>(this.usuarioUrl, form,  { withCredentials: true });
   /*.pipe(
     catchError((err: any) => {
       console.error('Error en el registro:', err);
       return of({} as Usuario);
     })
   );*/
}
  
}
