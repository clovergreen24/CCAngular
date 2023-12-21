import { RegistrarseService } from './../service/registrarse.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';
import { Registrarse } from '../model/registrarse.interface';

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


  constructor(private registrarseService: RegistrarseService) { }

  ngOnInit(): void {
       
  }

  onRegister(){
    if (this.registerForm.valid) {
      const reg = this.registerForm.value as Registrarse;
      this.registrarseService.registrarUsuario(reg).subscribe(data => console.log(data));
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
    }
  }  

}
