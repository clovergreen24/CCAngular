import { Login } from './model/login.interface';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';

import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';

import { GrupoComponent } from './grupo/grupo.component';
import { CommonModule } from '@angular/common';
import { GrupoDetalleComponent } from './grupo-detalle/grupo-detalle.component';



const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},

  {path:'login', component:LoginComponent},
  {path: 'registrarse', component:RegistrarseComponent},
  {path: 'usuario/username/:username', component: UsuarioComponent},
  {path:'usuario/:id/misGrupos', component:GrupoComponent},
  {path:'usuario/:id/misGrupos/grupoDetalle', component:GrupoDetalleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
