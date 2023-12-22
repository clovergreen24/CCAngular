import { Grupo } from './grupo.interface';
import { Usuario } from './usuario.interface';

export interface Pago {
    idPago: BigInt;
    monto: number;
    grupo: Grupo;
    usuario: Usuario;
    usuarioDestino: Usuario
}