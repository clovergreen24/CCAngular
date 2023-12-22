import { Login } from './model/login.interface';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { GrupoComponent } from './grupo/grupo.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'usuario', component:UsuarioComponent},
  {path:'misGrupos', component:GrupoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
