import { Categoria } from './categoria.interface';
import { Grupo } from './grupo.interface';
import { Usuario } from './usuario.interface';
import { Saldo } from './saldo.interface';

export interface Gasto {
    idGasto: Number;

    nombre: string;
    monto: Number;
    fecha: Date;
    imagen: string;
    tipoDivision: number;
    categoria?: Categoria;
    grupo?: Grupo;
    usuario?: Usuario;
    saldos?: Saldo[]  


}