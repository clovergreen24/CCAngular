import { Usuario } from './usuario.interface';

export interface Saldo {
    idSaldo: BigInt;
    monto: number;
    usuario: Usuario;

}