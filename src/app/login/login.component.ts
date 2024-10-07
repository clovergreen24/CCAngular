import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Login } from '../model/login.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { first } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { LoginErrorComponent } from '../login-error/login-error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  providers: [LoginService, AuthenticationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required)

  });
  loading = false;
  submitted = false;
  returnUrl: undefined | string;
  error = '';


  constructor(
    private login: LoginService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    // elimino las credenciales del usuario, si es que existen
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onLogin() {
    const form = this.loginForm.value as Login;
    this.authenticationService.login(this.f.usuario.value, this.f.contrasenia.value)
      .pipe(first())
      .subscribe(
        () => {
          

          // Construye la URL de redirección utilizando el username
          const returnUrl = `/home`;


          // Redirige al usuario a la URL construida
          this.router.navigate([returnUrl]); //esta variable la podes usar para redireccionar al home
          console.log(this.authenticationService.currentUserValue); //esto es para mirar en la consola del navegador si se genero
        },
        (error) => {

          this.error = 'Nombre de usuario o Contraseña incorrectas';
          this.openDialog(this.error);
          this.loading = false;

        });


  }

  openDialog(error: string): void {
    this.dialog.open(LoginErrorComponent, {
      width: '250px',
      data: { error: error } // Pasa el mensaje de error al MatDialog
    });

    // dialogRef.afterClosed().subscribe(result => {
    //console.log('The dialog was closed');
    // });
  }
}

