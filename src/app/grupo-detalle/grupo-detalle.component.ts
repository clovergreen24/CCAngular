import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from '../model/grupo.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from '../service/grupo.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-grupo-detalle',
  templateUrl: './grupo-detalle.component.html',
  styleUrl: './grupo-detalle.component.css'
})
export class GrupoDetalleComponent {
  grupo: Grupo = { idGrupo: 0, nombre: '', categoria: {}, gastos: [], imagen: '', integrantes: [], saldos: [], pagos: []};
  username: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private grupoService: GrupoService){
  }

ngOnInit(){
  const idGrupo = this.route.snapshot.paramMap.get('id');
  this.grupoService.getGrupo(idGrupo).subscribe(grupo => { this.grupo = grupo});
}


redirectActualizarGrupo() {
  let usuario = localStorage.getItem("currentUser" || '');
const tokenData= jwt_decode.jwtDecode(String(usuario));
this.username = tokenData.sub as string;
this.router.navigate([this.username, this.grupo.idGrupo, 'actualizarGrupo']);  
}

}
