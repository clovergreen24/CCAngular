import { Gasto } from "./gasto.interface";
import { Grupo } from "./grupo.interface";
import { Pago } from "./pago.interface";
import { Saldo } from "./saldo.interface";

export interface Usuario {
   idUsuario: Number;
    usuario: string;
    nombre: string;
    contrasenia: string;
    email: string;
    foto: string;
    amigos: [Usuario];
    grupos: [Grupo];
   pagos: [Pago];
   gastos: [Gasto];
   saldos: [Saldo]; 
   
}
