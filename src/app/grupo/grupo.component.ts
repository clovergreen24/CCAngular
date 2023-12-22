import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../service/grupo.service';
import { NgFor } from '@angular/common';
import { Grupo } from '../model/grupo.interface';
import { Categoria } from '../model/categoria.interface';

@Component({
  standalone: true,
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css',
  imports: [NgFor],
  providers: [GrupoService]
})
export class GrupoComponent implements OnInit {

  misGrupos: Grupo[] = [{ idGrupo: BigInt(0), nombre: '', categoria: {}, gastos: [], imagen: ''}];
  urlGrupo: String = "login.component.html";
  constructor(private grupoService: GrupoService ) { }

  ngOnInit(): void {
    this.llenarGrupos();
  }

  llenarGrupos() {
    const id = Number(localStorage.getItem("usuarioId"));
    this.grupoService.getGruposDeUsuario(id).subscribe(grupos => {
      this.misGrupos.pop();
      this.misGrupos = grupos;
      console.log(this.misGrupos)
    })
  }
}
