import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../service/grupo.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent implements OnInit {

  grupos: any[] = [];

  constructor(private grupoService: GrupoService ) { }

  ngOnInit(): void {
    this.llenarGrupos();
  }

  llenarGrupos() {
    this.grupoService.getGrupos().subscribe(grupos => {
      this.grupos = grupos;
      console.log(this.grupos)
    })
  }
}
