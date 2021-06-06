import { Tipo } from "./Tipo";

export class Simbolo  {
    indentificador: string;
    valor: any;
    tipo: Tipo;
    linea: number;
    columna: number;

    constructor(tipo:Tipo, id:string, linea:number, columna:number){
        this.indentificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
    }

    
    
}