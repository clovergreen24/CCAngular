import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from '../model/grupo.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from '../service/grupo.service';

import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario.interface';
import { Gasto } from '../model/gasto.interface';
import { Categoria } from '../model/categoria.interface';
import { FormControl } from '@angular/forms';
import * as jwt_decode  from 'jwt-decode';


@Component({
  selector: 'app-grupo-detalle',
  templateUrl: './grupo-detalle.component.html',
  styleUrl: './grupo-detalle.component.css'
})
export class GrupoDetalleComponent {
  grupo: Grupo = { idGrupo: 0, nombre: '', categoria: {}, gastos: [], imagen: '', integrantes: [], saldos: [], pagos: []};

  miembros?: Usuario[]
  amigos?: Usuario[]
  gastos?: Gasto[]
  categorias?:Categoria[]
  crear: boolean=false
  agregar: boolean=false
  usuario?: Usuario
  nuevoMiembro: string = ""
  nombreGasto= new FormControl('')
  categoriaGasto = new FormControl()
  montoGasto = new FormControl('')
  gasto: Gasto = { idGasto:0, nombre:'', categoria:{}, monto:0, fecha: new Date(), imagen:'', tipoDivision: 1, usuario: this.usuario}
  username: string = "";


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private grupoService: GrupoService,
    private usuarioService: UsuarioService){
  }

ngOnInit(){
  const idGrupo = this.route.snapshot.paramMap.get('id');
  this.grupoService.getGrupo(idGrupo).subscribe(grupo => { this.grupo = grupo});
  this.grupoService.getIntegrantes(idGrupo).subscribe(miembros => {this.miembros=miembros})
  this.grupoService.getGastos(idGrupo).subscribe(gastos => {this.gastos=gastos})
  this.grupoService.getCategorias().subscribe(categorias => {this.categorias=categorias})
  let usuario = localStorage.getItem("currentUser");
  const tokenData= jwt_decode.jwtDecode(String(usuario));
  let username = tokenData.sub as string;
  this.usuarioService.getUsuario(username).subscribe(usuario => {this.usuario=usuario})
  this.llenarAmigos()
}

onClick(){
  this.crear=true;
}

onClickAgregar(){
  this.agregar=true;
}

onCreate(){
  
  let nombreg = this.nombreGasto.value as string
  let cat = this.categorias?.find(cat => cat.idCategoria = Number(this.categoriaGasto.value))
  this.gasto.nombre=nombreg
  this.gasto.categoria=cat
  this.gasto.usuario=this.usuario
  this.gasto.grupo=this.grupo
  this.gasto.monto=Number(this.montoGasto.value)
  
  const idGrupo = this.route.snapshot.paramMap.get('id');
  this.grupoService.createGasto(idGrupo,this.gasto).subscribe(() =>{
    console.log('se creo el gasto ' + this.gasto.nombre);
  }
  );
}


redirectActualizarGrupo() {
  this.router.navigate([this.grupo.idGrupo, 'actualizarGrupo']);  
}

redirectActualizarGasto() {
  const idGasto = this.route.snapshot.paramMap.get('id');
  this.router.navigate([idGasto, 'actualizarGasto']);  
}

llenarAmigos(){
  this.usuarioService.getAmigos(this.username).subscribe(amigos => {this.amigos=amigos})
  console.log(this.amigos)
  this.amigos?.forEach(amigo => {
    if(this.miembros?.includes(amigo)){
      this.amigos?.splice(this.amigos.indexOf(amigo),1)
    }
  });
}

onAgregarMiembro(){
  this.grupoService.agregarMiembro(this.grupo.idGrupo,this.nuevoMiembro).subscribe(() =>{
    console.log('se agrego el miembro ' + this.nuevoMiembro);
  })
}
}
