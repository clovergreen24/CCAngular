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

  misGrupos: Grupo[] = [{ nombre: '', categoria: {}, gastos: [], imagen: ''}];
  id = Number(localStorage.getItem("usuarioId"));
  urlGrupo: String = "localhost:4000/{id}/misGrupos/grupoDetalle";
  constructor(private grupoService: GrupoService ) { }

  ngOnInit(): void {
    this.llenarGrupos();
  }

  llenarGrupos() {
    this.grupoService.getGruposDeUsuario(this.id).subscribe(grupos => {
      this.misGrupos.pop();
      this.misGrupos = grupos;
      console.log(this.misGrupos)
    })
  }
}
