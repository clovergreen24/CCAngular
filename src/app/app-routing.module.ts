import { Login } from './model/login.interface';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';

import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';

import { GrupoComponent } from './grupo/grupo.component';
import { CommonModule } from '@angular/common';
import { GrupoDetalleComponent } from './grupo-detalle/grupo-detalle.component';
import { CrearGrupoComponent } from './crear-grupo/crear-grupo.component';
import { ActualizarGrupoComponent } from './actualizar-grupo/actualizar-grupo.component';
import { ActualizarGastoComponent } from './actualizar-gasto/actualizar-gasto.component';



const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},

  {path:'login', component:LoginComponent},
  {path: 'registrarse', component:RegistrarseComponent},
  {path: 'crearGrupo', component: CrearGrupoComponent } ,
  {path: 'home', component: UsuarioComponent},
  {path:'misGrupos', component:GrupoComponent},
  {path:'misGrupos/grupoDetalle/:id', component:GrupoDetalleComponent},
  {path:':id/actualizarGrupo', component: ActualizarGrupoComponent},
  {path: ':id/actualizarGasto', component: ActualizarGastoComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule ], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
