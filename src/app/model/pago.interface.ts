import { Grupo } from './grupo.interface';
import { Usuario } from './usuario.interface';

export interface Pago {
    idPago: Number;
    monto: Number;
    grupo: Grupo;
    usuario: Usuario;
    usuarioDestino: Usuario
}