import { Gasto } from "./gasto.interface";
import { Grupo } from "./grupo.interface";
import { Pago } from "./pago.interface";
import { Saldo } from "./saldo.interface";

export interface Usuario {
    /*idUsuario: BigInt;
    usuario: String;
    nombre: String;
    contraseña: String;
    email: String;
    foto: Text;
    amigos: [Usuario];
    grupos: [Grupo];
    pagos: [Pago];
    gastos: [Gasto];
    saldos: [Saldo] */
    status:string;
    response:string; 
}
