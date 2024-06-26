import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario/usuario.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { GrupoDetalleComponent } from './grupo-detalle/grupo-detalle.component';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { RegistrarseDetalleComponent } from './registrarse-detalle/registrarse-detalle.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { CrearGrupoComponent } from './crear-grupo/crear-grupo.component';
import { ActualizarGrupoComponent } from './actualizar-grupo/actualizar-grupo.component';
import { LoginErrorComponent } from './login-error/login-error.component';
import { ActualizarGastoComponent } from './actualizar-gasto/actualizar-gasto.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GrupoComponent } from './grupo/grupo.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginErrorComponent, 
    UsuarioComponent,    
    RegistrarseComponent,
    RegistrarseDetalleComponent,
    GrupoDetalleComponent,
    GrupoComponent,
    CrearGrupoComponent,
    ActualizarGrupoComponent,
    ActualizarGastoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot([]),
    NgMultiSelectDropDownModule.forRoot(),
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})   
export class AppModule { }
