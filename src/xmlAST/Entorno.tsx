import { Simbolo } from "./Simbolo";

export class Entorno{
    identificador:string;
    listaSimbolos:Array<Simbolo>;
    texto:string;
    listaEntornos: Array<Entorno>;
    linea: number;
    columna: number;

    constructor(id:string, texto:string, linea:number, columna:number, listaSimbolos:Array<Simbolo>, listaE:Array<Entorno>){
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaSimbolos = listaSimbolos;
        this.listaEntornos = listaE
    }
}