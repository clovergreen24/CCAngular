import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from '../model/grupo.interface';
import { UsuarioService } from './usuario.service';

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

  public getGrupo(id: string | null){
    return this.http.get<Grupo>(this.urlApi + '/' + id)
  }
}
