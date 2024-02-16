import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../service/grupo.service';
import { NgFor, NgIf } from '@angular/common';
import { Grupo } from '../model/grupo.interface';
import { Categoria } from '../model/categoria.interface';
import { UsuarioService } from '../service/usuario.service';
import * as jwt_decode  from 'jwt-decode';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css',
  imports: [NgFor, NgIf, RouterModule],
  providers: [GrupoService]
})
export class GrupoComponent implements OnInit {
  
  misGrupos: Grupo[] = [{ idGrupo: 0, nombre: '', categoria: {}, gastos: [], imagen: '', integrantes: [], saldos: [], pagos: []}];

  constructor(
    private grupoService: GrupoService) {
       
    }

  ngOnInit(): void {
    this.llenarGrupos();
  }

  llenarGrupos() {
    let usuario = localStorage.getItem("currentUser" || '');
    const tokenData= jwt_decode.jwtDecode(String(usuario));
    let username = tokenData.sub as string;
    this.grupoService.getGruposDeUsuario(username).subscribe(grupos => {
      this.misGrupos.pop();
      this.misGrupos = grupos;
    })
  }
}
