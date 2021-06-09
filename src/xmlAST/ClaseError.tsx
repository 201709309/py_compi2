export class ClaseError{
    tipo:string;
    error:string;
    linea: number;
    columna: number;

    constructor(tipo:string, error:string, linea:number, columna:number){
        this.tipo = tipo;
        this.error = error;
        this.linea = linea;
        this.columna = columna;
    }
}