import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from '../model/grupo.interface';
import { UsuarioService } from './usuario.service';
import { CrearGrupo } from '../model/crearGrupo.interface';
import { Router } from '@angular/router';
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

  public getGrupo(id: string | null){
    return this.http.get<Grupo>(this.urlApi + '/' + id);
  }

  crearGrupo(username: String, form: CrearGrupo): Observable<Grupo>{
    console.log("estoy por crear un grupo");
    console.log(this.urlApi + "/" + username + "/crearGrupo", form);
    return this.http.post<Grupo>(this.urlApi + "/" + username + "/crearGrupo", form);
    
  }

  actualizarGrupo(id: string, form: CrearGrupo){
   return this.http.put<Grupo>(this.urlApi + '/' + id, form);
  }

  
}
   