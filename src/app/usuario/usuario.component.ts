import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario | undefined;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.usuarioService.getUsuario(String(params.get('username')))
        )
      )
      .subscribe((usuario: Usuario) => {
        this.usuario = usuario;
      });
  }
}
