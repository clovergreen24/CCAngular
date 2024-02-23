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
    imagen: new FormControl('', Validators.required),
    amigos: new FormControl()

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
    console.log("on crear")
    if (true) {
      const reg = this.grupoForm.value as CrearGrupo;
      let idC = this.categoriaSelect.value as string
      console.log(idC)
      let usuario = localStorage.getItem("currentUser" || '');
      const tokenData = jwt_decode.jwtDecode(String(usuario));
      let username = tokenData.sub as String;
      this.grupoService.crearGrupo(username, idC,this.miembros,reg).subscribe(() => {
        console.log('se creo un grupo con nombre ' + reg.nombre);
        this.router.navigate([username + "/misGrupos"]);
      });

    }
  }
  llenarAmigos() {
    let usuario = localStorage.getItem("currentUser" || '');
    const tokenData = jwt_decode.jwtDecode(String(usuario));
    this.username = tokenData.sub as string;
    this.usuario.getAmigos(this.username).subscribe(amigos => {
      this.dropdownList = amigos;
    })
    this.dropdownSettings={
      idField: 'IdUsuario',
      textField: 'nombre',
    }
  }
  onSelect(amigo: Usuario){
    this.miembros.push(amigo)
  }
  llenarCategorias() {
    this.grupoService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
      }
    );
  }




}   
