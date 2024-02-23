import { Component } from '@angular/core';
import { GrupoService } from '../service/grupo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { Gasto } from '../model/gasto.interface';
import { Usuario } from '../model/usuario.interface';
import { FormControl } from '@angular/forms';
import { Grupo } from '../model/grupo.interface';
import { Categoria } from '../model/categoria.interface';

@Component({
  selector: 'app-actualizar-gasto',
  templateUrl: './actualizar-gasto.component.html',
  styleUrl: './actualizar-gasto.component.css'
})
export class ActualizarGastoComponent {
  usuario?: Usuario;
  gasto: Gasto = { idGasto:0, nombre:'', categoria:{}, monto:0, fecha: new Date(), imagen:'', tipoDivision: 1, usuario: this.usuario};
  nombreGasto= new FormControl('')
  categoriaGasto = new FormControl('')
  montoGasto = new FormControl('')
  grupo: Grupo = { idGrupo: 0, nombre: '', categoria: {}, gastos: [], imagen: '', integrantes: [], saldos: [], pagos: []};
  categorias?:Categoria[]
  
  constructor(private grupoService: GrupoService, 
    private usuarioServ: UsuarioService, 
    private router: Router, 
    private route: ActivatedRoute) {

  }

  
  onActualizarGasto(){
    const id = this.route.snapshot.params['id'];
    let nombreg = this.nombreGasto.value as string
  //let cat = this.categorias?.find(cat => cat.idCategoria = Number(this.categoriaGasto.value))
  this.gasto.nombre=nombreg
  //this.gasto.categoria=cat
  this.gasto.usuario=this.usuario
  this.gasto.grupo=this.grupo
  this.gasto.monto=Number(this.montoGasto.value)
    this.grupoService.actualizarGasto(id, this.gasto).subscribe(() =>{
      console.log('se actualizo el gasto ' + id)
   
    });

  }
}
