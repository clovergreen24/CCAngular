import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{
  usuario: Usuario | undefined;
  userId: number = 1;

  constructor(private usuarioService: UsuarioService) { }
  ngOnInit(): void {
    
  }

  //onGet(): void{
    //this.usuarioService.getUsuario(this.userId).subscribe(data => console.log(data));


  //}
}
