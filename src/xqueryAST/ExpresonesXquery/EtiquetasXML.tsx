import { Retorno } from "../../Interfaces/Expresion";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { tipoPrimitivo } from "../../xpathAST/Expresiones/Primitivo";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";

export class EtiquetasXML implements ExpressionXquery {
    
    constructor(
        public line: Number,
        public column: Number, 
        public partIzq : string,
        public partDer: string,
        public xquerysRet: ExpressionXquery[]){}

    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
        
        var ret = "";
        for (const xquery of this.xquerysRet) {
            ret +=  xquery.executeXquery(entAct, RaizXML).value
        }
        return {value: this.partIzq + ret + this.partDer, type: tipoPrimitivo.STRING}
    }


}