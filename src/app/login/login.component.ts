import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Login } from '../model/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private login: LoginService) { }
  ngOnInit(): void {

  }

  onLogin(){
    const form = this.loginForm.value as Login;
    this.login.login(form).subscribe(data => console.log(data));
  }

}
