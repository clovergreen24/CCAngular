import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from '../model/grupo.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from '../service/grupo.service';
import { Usuario } from '../model/usuario.interface';

@Component({
  selector: 'app-grupo-detalle',
  templateUrl: './grupo-detalle.component.html',
  styleUrl: './grupo-detalle.component.css'
})
export class GrupoDetalleComponent {
  grupo: Grupo = { idGrupo: 0, nombre: '', categoria: {}, gastos: [], imagen: '', integrantes: [], saldos: [], pagos: []};
  miembros?: Usuario[]
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private grupoService: GrupoService){
  }

ngOnInit(){
  const idGrupo = this.route.snapshot.paramMap.get('id');
  this.grupoService.getGrupo(idGrupo).subscribe(grupo => { this.grupo = grupo});
  this.grupoService.getIntegrantes(idGrupo).subscribe(miembros => {this.miembros=miembros})
}



}
