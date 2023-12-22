import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from '../model/grupo.interface';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private urlApi = 'http://localhost:8080/grupo';

  constructor(private http: HttpClient) { }

  public getGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.urlApi);
  }
}
