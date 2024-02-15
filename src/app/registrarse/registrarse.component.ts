import { RegistrarseService } from './../service/registrarse.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';
import { Registrarse } from '../model/registrarse.interface';
import { Usuario } from '../model/usuario.interface';
import { RegistrarseDetalleComponent } from '../registrarse-detalle/registrarse-detalle.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent implements OnInit {
  registerForm= new FormGroup ({
    
      usuario: new FormControl('', Validators.required),
      nombre: new FormControl ('', Validators.required),
      contrasenia: new FormControl ('', Validators.required),
      email: new FormControl ('', Validators.required),
      foto: new FormControl ('') // Puedes agregar validadores según tus necesidades
    });


  constructor(private registrarseService: RegistrarseService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
       
  }

  //onRegister(){                                             //comente probando
    //if (this.registerForm.valid) {                                //comente probando
     // const reg = this.registerForm.value as Registrarse;                      //comente probando
     // this.registrarseService.registrarUsuario(reg).subscribe(data => console.log(data));         //comente probando
      //(
       // (response) => {
        //  console.log('Usuario registrado exitosamente:', response);
          // Puedes agregar redirección u otras acciones después de registrar
       // },
        //(error) => {
         // console.error('Error al registrar usuario:', error);
          // Manejar errores según sea necesario
       // }
      //);
   // }                                   //comente probando
  //}   //comente probando

  
  onRegister() {
    if (this.registerForm.valid) {
      const reg = this.registerForm.value as Registrarse; 
      this.registrarseService.registrarUsuario(reg).subscribe(
        (usuario: Usuario) => {
         // if (usuario) {
          // Si el registro es exitoso, mostrar el mensaje de éxito
          this.openDialog('success', reg.usuario);
          this.router.navigate(['/login']);
       
          //}
      },
      (error) => {
        this.openDialog('error', reg.usuario);
      }
    );
  }               
}
  
  
  openDialog(type: string, username: string): void {
    this.dialog.open(RegistrarseDetalleComponent, {
      width: '250px',
      data: { type: type, username: username }
    });
  }
  

}  
