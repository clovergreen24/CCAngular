import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-registrarse-detalle',
  templateUrl: './registrarse-detalle.component.html',
  styleUrl: './registrarse-detalle.component.css'
})
export class RegistrarseDetalleComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
