import { Retorno } from "../../Interfaces/Expresion";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";

export class Return implements ExpressionXquery{
    
    constructor(
        public line: Number,
        public column: Number, 
        public expRet: ExpressionXquery){}

    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
        return this.expRet.executeXquery(entAct, RaizXML);
    }


}