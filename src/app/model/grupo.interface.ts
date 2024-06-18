import { Injectable } from "@angular/core";
import { Categoria } from "./categoria.interface";
import { Gasto } from "./gasto.interface";
import { Pago } from "./pago.interface";
import { Saldo } from "./saldo.interface";
import { Usuario } from "./usuario.interface";


export interface Grupo {
    idGrupo: number,
    nombre: string,
    imagen: string,
    integrantes: Usuario[],
    categoria: Categoria,
    saldos: Saldo[],
    gastos: Gasto[],
    pagos: Pago[]
  
}