import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '../model/login.interface';
import { Usuario } from '../model/usuario.interface';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl: string = "http://localhost:8080/jwt/usuario/login"

  constructor(private http: HttpClient, private router: Router) { }

  login(form: Login) {
    this.http.post<Usuario>(this.loginUrl, form,  { withCredentials: true }).subscribe(data => {
      if (data) {
        localStorage.setItem("idUsuario", data.idUsuario.toString());
        this.router.navigate(["usuario/" + data.idUsuario])

      }
    });
   // this.http.post<Usuario>(this.loginUrl, form,  { withCredentials: true }).subscribe(data => console.log(data));
    /* .pipe(
        catchError((err: any) => {
          console.error('Error en el inicio de sesión:', err);
          return of({} as Usuario);
        })
      );*/
  }

  
}

