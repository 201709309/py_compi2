import { Simbolo } from "../../xmlAST/Simbolo";

export class EntornoXQuery {

    private variables: Map<string, Simbolo>;
    //public funciones: Map<string, InsFuncion>;

    constructor (public anterior: EntornoXQuery){
        this.variables = new Map();
    }

    public guaradarVar(id: string, valor: any, linea: number, col: number){
        this.variables.set(id, new Simbolo(id, valor, linea, col));
    }

    public existeLocalVar (id : string): boolean{
        return this.variables.has(id);
    }

//para asignacion-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

    public existeVar(id : string){

        let envXqery: EntornoXQuery | null = this;

        if (envXqery.variables.has(id)){
            return true;
        }else {

            while(envXqery.anterior != null){
                envXqery = envXqery.anterior;
            }
            
            if (envXqery.variables.has(id)){
                return true;
            }else {
                return false;
            }
        }
    }

    public actualizarVar(id : string, nvoValor : any){

        let envXqery: EntornoXQuery | null = this;

        if (envXqery.variables.has(id)) {
            for (let entry of Array.from(envXqery.variables.entries())) {
                let key = entry[0];
                if (key === id) {
                    entry[1].valor = nvoValor;
                }
            }

        }else {

            while(envXqery.anterior != null){
                envXqery = envXqery.anterior;
            }

            if (envXqery.variables.has(id)){

                for (let entry of Array.from(envXqery.variables.entries())) {
                    let key = entry[0];
                    if (key === id) {
                        entry[1].valor = nvoValor;
                    }
                }
            }
        }
    }

}