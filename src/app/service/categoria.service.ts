import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private urlApi = 'http://localhost:8080/jwt/categoria';

  constructor(private http: HttpClient) { }

  getCategoriasDeGrupos(): Observable<Categoria[]>{
      return this.http.get<Categoria[]>(this.urlApi , { withCredentials: true });
  }

  getCategoria(id: Number): Observable<Categoria>{
    return this.http.get<Categoria>(this.urlApi + '/categoriaId/' + id);
  }
}
