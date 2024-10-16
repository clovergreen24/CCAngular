import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  usuario?: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.usuarioService.getUsuario(jwtDecode(localStorage.getItem('currentUser') || '').sub as string),
        )
      )
      .subscribe((usuario: Usuario) => {
        this.usuario = usuario;
      });
  }
}
