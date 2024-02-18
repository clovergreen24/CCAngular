import { UsuarioService } from './../service/usuario.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { CrearGrupo } from '../model/crearGrupo.interface';
import { GrupoService } from '../service/grupo.service';


@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrl: './crear-grupo.component.css'
})
export class CrearGrupoComponent {
  grupoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    // categoria: new FormControl('', Validators.required)

  });

  constructor(private grupoService: GrupoService, private router: Router) { }

  onCrearGrupo() {
    if (this.grupoForm.valid) {
      const reg = this.grupoForm.value as CrearGrupo;
      let usuario = localStorage.getItem("currentUser" || '');
      const tokenData = jwt_decode.jwtDecode(String(usuario));
      let username = tokenData.sub as String;

      this.grupoService.crearGrupo(username, reg).subscribe(() => {
        this.router.navigate([username + "/misGrupos"]);
      });

    }
  }

}