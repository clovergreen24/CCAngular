import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from '../model/grupo.interface';
import { Usuario } from '../model/usuario.interface';
import { UsuarioService } from './usuario.service';
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
    return grupos
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

  createGasto(id: string | null,gasto: Gasto){
    console.log("grupo service")
    return this.http.post<Grupo>(this.urlApi + '/' + id + '/agregarGasto', gasto)
  }
  
}
