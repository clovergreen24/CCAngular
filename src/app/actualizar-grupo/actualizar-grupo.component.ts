import { Component } from '@angular/core';
import { GrupoService } from '../service/grupo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from '../model/grupo.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../model/categoria.interface';
import { Usuario } from '../model/usuario.interface';
import { CrearGrupo } from '../model/crearGrupo.interface';
import { UsuarioService } from '../service/usuario.service';
import * as jwt_decode from 'jwt-decode';
import { Location } from '@angular/common';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-actualizar-grupo',
  templateUrl: './actualizar-grupo.component.html',
  styleUrl: './actualizar-grupo.component.css'
})
export class ActualizarGrupoComponent {
  grupo: Grupo = { idGrupo: 0, nombre: '', categoria: {}, gastos: [], imagen: '', integrantes: [], saldos: [], pagos: []};
  
  grupoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    categoria: new FormControl(),      
    amigos: new FormControl()
  });

  categorias: Categoria[] = [];
  misAmigos: Usuario[] = [];
  username: string = "";
 
  constructor(private grupoService: GrupoService, private cat: CategoriaService, private usuario: UsuarioService, private router: Router, private location: Location, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; // Obtener el ID del grupo de la URL
      this.grupoService.getGrupo(id).subscribe(grupo => {
        // Llenar el formulario con los datos del grupo existente
        this.grupoForm.patchValue({
          nombre: grupo.nombre.toString(),
          imagen: grupo.imagen.toString(),
          categoria: null,
          amigos: null // Opcional: cargar los amigos del grupo si es necesario
        });
      });
    });
    this.llenarAmigos();
    const idGrupo = this.route.snapshot.paramMap.get('id');
    this.grupoService.getGrupo(idGrupo).subscribe(grupo => { this.grupo = grupo});
    this.llenarCategorias();
  }

  onActualizarGrupo() {
    if (this.grupoForm.valid) {
      const id = this.route.snapshot.params['id']; // Obtener el ID del grupo de la URL
      const datosActualizados = this.grupoForm.value as CrearGrupo;
      this.grupoService.actualizarGrupo(id, datosActualizados).subscribe(() => {
        //this.router.navigate(['/']); // Redirigir a la página principal u otra página deseada después de la actualización
        this.location.back();     
      });
    }
  }

  llenarAmigos() {
    let usuario = localStorage.getItem("currentUser" || '');
    const tokenData= jwt_decode.jwtDecode(String(usuario));
    this.username = tokenData.sub as string;
    this.usuario.getAmigos(this.username).subscribe(amigos => {
      this.misAmigos.pop();
      this.misAmigos = amigos;
    });
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
}
