import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from '../model/grupo.interface';
import { Usuario } from '../model/usuario.interface';
import { UsuarioService } from './usuario.service';

import { CrearGrupo } from '../model/crearGrupo.interface';
import { Router } from '@angular/router';

import { Gasto } from '../model/gasto.interface';

import { Categoria } from '../model/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private urlApi = 'http://localhost:8080/jwt/grupo';

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }


  getGruposDeUsuario(username: string): Observable<Grupo[]>{
    let grupos = this.usuarioService.getGrupos(username);
    return grupos;
  }


   crearGrupo(username: String, idC:string, integrantes: Usuario[], form: CrearGrupo): Observable<Grupo>{
    console.log("estoy por crear un grupo");
    return this.http.post<Grupo>(this.urlApi + "/crearGrupo", {form,idC,username,integrantes});
    
  }

  actualizarGrupo(id: string, form: CrearGrupo): Observable<Grupo>{
    return this.http.put<Grupo>(this.urlApi + '/' + id, form);
  }
  getGrupo(id: string | null){
    return this.http.get<Grupo>(this.urlApi + '/' + id)
  }

  getIntegrantes(id: string | null):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlApi + '/' + id + '/miembros')
  }

  getGastos(id: string | null):Observable<Gasto[]>{
    return this.http.get<Gasto[]>(this.urlApi + '/' + id + '/gastos') 
  }

  getCategorias(){
    return this.http.get<Categoria[]>('http://localhost:8080/jwt/categoria')
  }

  createGasto(id: string | null,gasto: Gasto): Observable<any>{
    console.log("grupo service")
    return this.http.post<Grupo>(this.urlApi + '/' + id + '/agregarGasto', gasto);
  }

  actualizarGasto(id: string, form: Gasto){
    return this.http.put<Gasto>('http://localhost:8080/jwt/gasto' + '/' + id, form);
   }
  
   agregarMiembro(id: number, username: string){
    return this.http.put<Grupo>(this.urlApi + '/nuevoMiembro' + '/' + username, id);
   }
}
   