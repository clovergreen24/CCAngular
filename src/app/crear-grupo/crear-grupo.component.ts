import { UsuarioService } from './../service/usuario.service';
import { Component, OnInit, numberAttribute } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { CrearGrupo } from '../model/crearGrupo.interface';
import { GrupoService } from '../service/grupo.service';
import { Categoria } from '../model/categoria.interface';
import { CategoriaService } from '../service/categoria.service';
import { Usuario } from '../model/usuario.interface';
import { IDropdownSettings } from 'ng-multiselect-dropdown';





@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrl: './crear-grupo.component.css'
})
export class CrearGrupoComponent {
  grupoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    categoria: new FormControl(),
    // integrantes: new FormControl([])
  })
  
  dropdownList: Usuario[] =[]
  dropdownSettings:IDropdownSettings={}
  categorias: Categoria[] = [];
  username: string = "";
  miembros: Usuario[]=[]
  categoriaSelect=new FormControl('')

  constructor(private grupoService: GrupoService, private router: Router, private cat: CategoriaService, private usuario: UsuarioService) { }

  ngOnInit(): void {
    this.llenarCategorias();
    this.llenarAmigos();
  }

  onCrearGrupo() {
    if(this.grupoForm.valid){
    console.log("on crear")
    
      let reg: CrearGrupo = {
        nombre: this.grupoForm.get('nombre')?.value || '',
        categoria: this.grupoForm.get('categoria')?.value || '',
        // integrantes: this.grupoForm.get('integrantes')?.value || []
      }
      
      let usuario = localStorage.getItem("currentUser");
      const tokenData = jwt_decode.jwtDecode(String(usuario));
      let username = tokenData.sub as String;
      this.grupoService.crearGrupo(username, reg).subscribe(() => {
        console.log('se creo un grupo con nombre ' + reg.nombre);
        this.router.navigate(["/misGrupos"]);
      });
    } else {
      console.log("Formulario invalido");
    }
  }
  llenarAmigos() {
    let usuario = localStorage.getItem("currentUser");
    const tokenData = jwt_decode.jwtDecode(String(usuario));
    this.username = tokenData.sub as string;
    this.usuario.getAmigos(this.username).subscribe(amigos => {
      this.dropdownList = amigos;
    })
    this.dropdownSettings={
      idField: 'IdUsuario',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',

    }
  }
  onSelect(amigo: Usuario){
    this.miembros.push(amigo)
  }
  onDeSelect(amigo: Usuario){
    this.miembros = this.miembros.filter(m => m.idUsuario !== amigo.idUsuario)
  }
  onDeSelectAll(){
    this.miembros = []
  }
  onSelectAll(){
    this.miembros = this.dropdownList
  }
  llenarCategorias() {
    this.grupoService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
      }
    );
  }




}   
