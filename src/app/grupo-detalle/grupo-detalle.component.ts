import { Component, Inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
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
  quitarMiembro: string = ""
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
  const usuario = localStorage.getItem("currentUser");
  
  if (usuario) {
    const tokenData = jwt_decode.jwtDecode(String(usuario));
    this.username = tokenData.sub as string;

    
    this.llenarAmigos();
    }
  
}

onClick(){
  this.crear=true;
}

onClickAgregar(){
  this.agregar=true;
  this.llenarAmigos();
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

onAgregarMiembro(){
  this.grupoService.agregarMiembro(this.grupo.idGrupo,this.nuevoMiembro).subscribe(() =>{
    console.log('se agrego el miembro ' + this.nuevoMiembro);
  })
  this.grupoService.getIntegrantes(this.grupo.idGrupo as unknown as string).subscribe(miembros => {this.miembros=miembros})
  this.llenarAmigos();
  this.agregar=false;
}

onQuitarMiembro(){
  this.grupoService.quitarMiembro(this.grupo.idGrupo,this.quitarMiembro).subscribe(() =>{
    console.log('se quito el miembro ' + this.quitarMiembro);
  })
  this.grupoService.getIntegrantes(this.grupo.idGrupo as unknown as string).subscribe(miembros => {this.miembros=miembros})
  this.llenarAmigos();
}

llenarAmigos(){
  this.usuarioService.getUsuario(this.username)
      .pipe(
        switchMap((usuario) => {
          this.usuario = usuario;
          return this.usuarioService.getAmigos(this.username); // Fetch amigos after fetching usuario
        })
      )
      .subscribe(
        (amigos) => {
          this.amigos = amigos || []; // Initialize amigos array if null
          console.log('Amigos fetched:', this.amigos);
          
          // Filter amigos, removing those who are already members
          this.amigos = this.amigos.filter(amigo => 
            !this.miembros?.some(miembro => miembro.usuario === amigo.usuario)
          );
          console.log('Filtered Amigos:', this.amigos);
        },
        (error) => {
          console.error('Error fetching amigos:', error);
        }
      );
}
}
