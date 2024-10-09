import { Categoria } from "./categoria.interface";
import { Usuario } from "./usuario.interface";

export interface CrearGrupo {
    nombre: string;
    // integrantes: Usuario[],
    categoria: number;
}