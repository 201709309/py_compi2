export class Simbolo{
    identificador:string;
    valor:string;
    linea: number;
    columna: number;
    pos: number;
    //last: boolean

    constructor(id:string, valor:string, linea:number, columna:number, public last? : boolean){
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.pos = -1;
        //this.last = last                  // $[$.lenght-1].setLast(false);  
    }

    public setPos(pos :number){
        this.pos = pos;
    }

}