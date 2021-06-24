import { Retorno } from "../../Interfaces/Expresion";
import { ExpressionXquery } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { Path } from "../../xpathAST/Expresiones/Path";
import { EntornoXQuery } from "../AmbientesXquery/EntornoXQuery";

export class pathXquery implements ExpressionXquery{
    constructor(
        public line: number,
        public column: number,
        public path : Path){}

    executeXquery(entAct: EntornoXQuery, RaizXML: Entorno): Retorno {
        return  this.path.execute(RaizXML)
    }

}