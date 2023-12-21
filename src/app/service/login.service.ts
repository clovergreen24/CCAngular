import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '../model/login.interface';
import { Usuario } from '../model/usuario.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl: string = "http://localhost:8080/usuario/login"

  constructor(private http: HttpClient) { }

  login(form: Login): Observable<Usuario> {
    return this.http.post<Usuario>(this.loginUrl, form,  { withCredentials: true });
    /*  .pipe(
        catchError((err: any) => {
          console.error('Error en el inicio de sesión:', err);
          return of({} as Usuario);
        })
      );*/
  }
}

