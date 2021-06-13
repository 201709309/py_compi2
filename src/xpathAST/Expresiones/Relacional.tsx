import { Entorno } from '../../xmlAST/Entorno';
import { Expression, Retorno } from "../../Interfaces/Expresion";
import { tipoPrimitivo } from './Primitivo';
import { Simbolo } from '../../xmlAST/Simbolo';


export enum operacionRelacional {
    IGUAL,
    DIFERENCIACION,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL
}
////fechaPublicacion[@año>/biblioteca[1]/libro[3]/fechaPublicacion[1]/@año]     

export class Relacional implements Expression{

    constructor (
    public line : Number,
    public column: Number,
    public hijoIzq: Expression,
    public hijoDer: Expression,
    public tipoOperacion: operacionRelacional,
    public sym: string){}

    public execute(ent : Entorno, simboloPadre?:Simbolo): Retorno {

        let valorIzq = this.hijoIzq.execute(ent, simboloPadre);
        let valorDer = this.hijoDer.execute(ent, simboloPadre);

        if (valorIzq.type === valorDer.type && (this.tipoOperacion === operacionRelacional.IGUAL||this.tipoOperacion === operacionRelacional.DIFERENCIACION)){

            

            if (this.tipoOperacion === operacionRelacional.IGUAL) {
                const result = valorIzq.value == valorDer.value;
                return { value: result, type: tipoPrimitivo.BOOL };
            } else if (this.tipoOperacion === operacionRelacional.DIFERENCIACION) {
                const result = valorIzq.value != valorDer.value;
                return { value: result, type: tipoPrimitivo.BOOL };
            }else {
                return { value: null , type: tipoPrimitivo.error };
            }


        }else if (valorIzq.type === tipoPrimitivo.NUMBER && valorDer.type === tipoPrimitivo.NUMBER ){

            if (this.tipoOperacion === operacionRelacional.MENOR) { 
                const result = valorIzq.value < valorDer.value;
                return { value: result, type: tipoPrimitivo.BOOL };
            } else if (this.tipoOperacion === operacionRelacional.MENORIGUAL) {
                const result = valorIzq.value <= valorDer.value;
                return { value: result, type: tipoPrimitivo.BOOL };
            } else if (this.tipoOperacion === operacionRelacional.MAYOR) {
                const result = valorIzq.value > valorDer.value;
                return { value: result, type: tipoPrimitivo.BOOL };
            } else if (this.tipoOperacion === operacionRelacional.MAYORIGUAL) {
                const result = valorIzq.value >= valorDer.value;
                return { value: result, type: tipoPrimitivo.BOOL };;
            }
            else {
                throw new Error("Error Semantico: no se reconoce el operador  " + this.sym + ", Linea: "+this.line+"Column: "+this.column);
            }
        }
        else {
            throw new Error("Error Semantico: incompatibilidad de tipos: varlor 1: "+valorDer+", valor2 "+valorDer+"Linea: "+this.line+"Column: "+this.column);
        }

    }

}