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


@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrl: './crear-grupo.component.css'
})
export class CrearGrupoComponent {
  grupoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    categoria: new FormControl(null),
    amigos: new FormControl()

  });

  categorias: Categoria[] = [];
  username: string = "";
  misAmigos: Usuario[] = [];

  constructor(private grupoService: GrupoService, private router: Router, private cat: CategoriaService, private usuario: UsuarioService) { }

  ngOnInit(): void {
    this.llenarCategorias();
    this.llenarAmigos();
  }

  onCrearGrupo() {
    if (this.grupoForm.valid) {
      const reg = this.grupoForm.value as CrearGrupo;
      
      //console.log('quetiene ' + reg.categoria);

      const categoriaSeleccionada = this.categorias.find(c => c.idCategoria === reg.categoria);
      reg.categoria = categoriaSeleccionada;
     

      let usuario = localStorage.getItem("currentUser" || '');
      const tokenData = jwt_decode.jwtDecode(String(usuario));
      let username = tokenData.sub as String;


      this.grupoService.crearGrupo(username, reg).subscribe(() => {
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
      this.misAmigos.pop();  
      this.misAmigos = amigos;
    })
  }

  llenarCategorias() {
    this.cat.getCategoriasDeGrupos().subscribe(
      (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  getCategoria(id: Number | undefined ){
  this.cat.getCategoria(id);
  }


}   
