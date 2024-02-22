import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
  styleUrl: './login-error.component.css'
})
export class LoginErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
