import { Entorno } from '../../xmlAST/Entorno';
import { Acceso } from './Acceso';
import { Expression, Retorno } from "../../Interfaces/Expresion";
import { tipoPrimitivo } from './Primitivo';
import { Simbolo } from '../../xmlAST/Simbolo';
import { traduccion } from '../../Traduccion/traduccion';
import { traducirXmlRecursive } from '../../Traduccion/xml3d';

export class Path implements Expression {

    salida: any[];
    nuevaL_Accesos: Acceso[];

    constructor(
        public line: Number,
        public column: Number,
        public L_Accesos: Acceso[],
        public tipoPath?: string
    ) {
        this.salida = [];
        this.nuevaL_Accesos = [];
    }

    private validarAntecesores(): Acceso[] {

        let newL_Acc: Acceso[] = []
        for (const acceso of this.L_Accesos) {

            if (acceso.tipoAcceso === 'padre') {

                if (newL_Acc.length > 0) {
                    newL_Acc.pop()
                } else {
                    throw new Error("Error Semantico: no se puede Acceder a la raiz del arbol, lina: " + acceso.line + "column: " + acceso.column);
                }
            } else {
                newL_Acc.push(acceso)
            }
        }
        return newL_Acc
    }

    private unirSalida(): string {

        let salida: string = ""

        for (const element of this.salida) {
            salida += element
        }
        return salida;
    }

    public execute(ent: Entorno, simboloPadre?: Simbolo): Retorno { //      /biblio
        this.insertarConsulta();
        this.L_Accesos = this.validarAntecesores();

        if (this.tipoPath !== "sub") {

            if (this.L_Accesos.length > 0 && ent.listaEntornos.length > 0) {

                if (ent.identificador === this.L_Accesos[0].id && this.L_Accesos[0].tipoAcceso === "nodo") {//validamos que el id entActual sea igual al id de la poscion Actual de accesos
                    //ent.SP_ID = this.L_Accesos[0].SP_id
                    if (traduccion.compararCadenas3d === "") {
                        traduccion.metodoCompararCadenas();
                    }
                    traduccion.setTranslate("\n\n//Igualando los dos id	--------------\n\n");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + ent.SP_ID + "];");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + this.L_Accesos[0].SP_id + "];");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = S + " + traduccion.stackCounter + ";");
                    traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
                    traduccion.setTranslate("stack[(int)t" + (traduccion.t) + "] = t" + (traduccion.t - 2) + ";");
                    traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
                    traduccion.setTranslate("stack[(int)t" + (traduccion.t) + "] = t" + (traduccion.t - 1) + ";");
                    traduccion.setTranslate("S = S + " + traduccion.stackCounter + ";");
                    traduccion.setTranslate("compararCadenas();");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = S + 1;");
                    traduccion.t++;
                    traduccion.setTranslate("t" + traduccion.t + " = stack[(int)t" + (traduccion.t - 1) + "];\n");
                    traduccion.t++;
                    traduccion.setTranslate("printf(\"%d\", (int)t" + (traduccion.t - 1) + ");");
                    traduccion.setTranslate("S = S - " + traduccion.stackCounter + ";");

                    if (this.validarPredicadosRaiz(ent, 0)) {

                        if (this.L_Accesos.length > 1) { //verificamos si la consutla nos dice que accediendo a descendientes
                            this.getQuery(ent, 1);
                        } else {
                            this.construirNodos(ent, "")
                        }
                    }
                } else if (this.L_Accesos[0].tipoQuery === 'absoluta') {
                    this.getQuery(ent, 0);
                }
            }
        } else {

            this.salida = [];
            this.getQuery(ent, 0, simboloPadre);
            return { value: this.salida, type: tipoPrimitivo.RESP };
        }
        return { value: this.unirSalida(), type: tipoPrimitivo.STRING };
    }

    private getQuery(entPadre: Entorno, posActAcceso: number, simboloPadre?: Simbolo) {

        if (simboloPadre !== undefined) { // si la consulta es una sub consulta y el padre es un atributo --> /id[subconsulta]

            if (this.L_Accesos[posActAcceso].tipoAcceso === "actual" || this.L_Accesos[posActAcceso].tipoQuery === 'text') {

                if (this.L_Accesos.length < posActAcceso + 1) {
                    this.getQuery(entPadre, posActAcceso + 1, simboloPadre);
                } else {

                    if (this.tipoPath === "sub") {
                        this.salida.push({ value: simboloPadre.valor.replaceAll("\"", ""), type: tipoPrimitivo.STRING });
                    } else {

                        if (this.L_Accesos[posActAcceso].tipoQuery === 'text') {
                            this.salida.push(simboloPadre.valor.replaceAll("\"", "") + "\n");
                        } else {
                            this.salida.push(simboloPadre.identificador + " = \"" + simboloPadre.valor.replaceAll("\"", "") + "\"\n");
                        }
                    }
                }
            } else {
                throw new Error("Nose puede acceder a un atributo: " + this.L_Accesos[posActAcceso].id);
            }

        } else { // si la consuta es una sub o una normal y el padre es un nodo  -----> /id/id || /id/@id || /id/. || /id/*               

            if (this.L_Accesos[posActAcceso].tipoAcceso === "atributo") {

                const atri = entPadre.getAtributo(this.L_Accesos[posActAcceso].id)
                if (atri != null) {

                    if (this.validarPredicadosAtri(entPadre, atri, posActAcceso)) {

                        if (this.L_Accesos.length > posActAcceso + 1) { //verificamos si no es el ultimo acceso
                            this.getQuery(entPadre, posActAcceso + 1, atri);
                        } else {

                            if (this.tipoPath === "sub") {
                                this.salida.push({ value: atri.valor.replaceAll("\"", ""), type: tipoPrimitivo.STRING });
                            } else {
                                this.salida.push(atri.identificador + " = \"" + atri.valor.replaceAll("\"", "") + "\"\n");
                            }
                        }
                    }
                } else if (entPadre.listaEntornos.length > 0 && this.L_Accesos[posActAcceso].tipoQuery === 'absoluta' && this.L_Accesos.length === posActAcceso + 1) {

                    for (const entChiild of entPadre.listaEntornos) {//recorremos los hijos del entorno padre que llamaremos entActual
                        this.getQuery(entChiild, posActAcceso);
                    }
                }

            } else if (this.L_Accesos[posActAcceso].tipoAcceso === "todosAtributos") {

                if (this.L_Accesos[posActAcceso].tipoQuery === 'absoluta' && this.L_Accesos.length === posActAcceso + 1) {

                    this.construirTodosAtributos(entPadre);

                } else {

                    if (entPadre.listaSimbolos.length > 0) {

                        for (const atri of entPadre.listaSimbolos) {

                            if (this.validarPredicadosAtri(entPadre, atri, posActAcceso)) {

                                if (this.L_Accesos.length > posActAcceso + 1) { //verificamos si no es el ultimo acceso
                                    this.getQuery(entPadre, posActAcceso + 1, atri);
                                } else {

                                    if (this.tipoPath === "sub") {
                                        this.salida.push({ value: atri.valor.replaceAll("\"", ""), type: tipoPrimitivo.STRING });
                                    } else {
                                        this.salida.push(atri.identificador + " = \"" + atri.valor.replaceAll("\"", "") + "\"\n");
                                    }
                                }
                            }
                        }
                    }
                }

            } else if (this.L_Accesos[posActAcceso].tipoAcceso === 'texto') {

                if (this.L_Accesos.length === posActAcceso + 1) {

                    if (this.L_Accesos[posActAcceso].tipoQuery === 'relativa') {

                        if (entPadre.texto !== '') {
                            this.salida.push(entPadre.texto + '\n');
                        }

                    } else {
                        this.construirTodosTextos(entPadre);
                    }

                } else {
                    throw new Error("Error Semantico: no se puede mostrar el texto del nodo ya que no se ah terminado la lista de accesos");
                }

            } else if (this.L_Accesos[posActAcceso].tipoAcceso === "actual") {

                if (this.L_Accesos.length > posActAcceso + 1) { //verificamos si no es el ultimo acceso
                    this.getQuery(entPadre, posActAcceso + 1);
                } else {
                    this.construirNodos(entPadre, "")
                }

            } else if (this.L_Accesos[posActAcceso].tipoAcceso === "todosNodos") {

                if (entPadre.listaEntornos.length > 0) {

                    for (const entActual of entPadre.listaEntornos) {//recorremos los hijos del entorno padre que llamaremos entActual

                        if (this.validarPredicadosNodos(entPadre, entActual, posActAcceso)) {

                            if (this.L_Accesos.length > posActAcceso + 1) { //verificamos si no es el ultimo acceso
                                this.getQuery(entActual, posActAcceso + 1);
                            } else {
                                this.construirNodos(entActual, "")
                            }
                        }
                    }

                }

            } else if (this.L_Accesos[posActAcceso].tipoAcceso === "nodo") {

                if (entPadre.listaEntornos.length > 0) {

                    for (const entActual of entPadre.listaEntornos) {//recorremos los hijos del entorno padre que llamaremos entActual

                        if (entActual.identificador === this.L_Accesos[posActAcceso].id) {//validamos que el id del entorno sea igual al id de la poscion Actual de Accesos

                            if (traduccion.compararCadenas3d === "") {
                                traduccion.metodoCompararCadenas();
                            }
                            traduccion.setTranslate("\n\n//Igualando los dos id	--------------\n\n");
                            traduccion.t++;
                            traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + entActual.SP_ID + "];");
                            traduccion.t++;
                            traduccion.setTranslate("t" + traduccion.t + " = stack[(int)" + this.L_Accesos[posActAcceso].SP_id + "];");
                            traduccion.t++;
                            traduccion.setTranslate("t" + traduccion.t + " = S + " + traduccion.stackCounter + ";");
                            traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
                            traduccion.setTranslate("stack[(int)t" + (traduccion.t) + "] = t" + (traduccion.t - 2) + ";");
                            traduccion.setTranslate("t" + traduccion.t + " = t" + traduccion.t + " + 1;");
                            traduccion.setTranslate("stack[(int)t" + (traduccion.t) + "] = t" + (traduccion.t - 1) + ";");
                            traduccion.setTranslate("S = S + " + traduccion.stackCounter + ";");
                            traduccion.setTranslate("compararCadenas();");
                            traduccion.t++;
                            traduccion.setTranslate("t" + traduccion.t + " = S + 1;");
                            traduccion.t++;
                            traduccion.setTranslate("t" + traduccion.t + " = stack[(int)t" + (traduccion.t - 1) + "];\n");
                            traduccion.t++;
                            traduccion.setTranslate("printf(\"%d\", (int)t" + (traduccion.t - 1) + ");");
                            traduccion.setTranslate("S = S - " + traduccion.stackCounter + ";");

                            if (this.validarPredicadosNodos(entPadre, entActual, posActAcceso)) {

                                if (this.L_Accesos.length > posActAcceso + 1) { //verificamos si no es el ultimo acceso
                                    this.getQuery(entActual, posActAcceso + 1);
                                } else {
                                    this.construirNodos(entActual, "");
                                }
                            }
                        } else if (this.L_Accesos[posActAcceso].tipoQuery === 'absoluta') {
                            this.getQuery(entActual, posActAcceso);
                        }
                    }
                }

            } else {
                throw new Error("ERROR FATAL Semantico: El tipo; " + this.L_Accesos[posActAcceso].tipoAcceso + " del acceso: " + this.L_Accesos[posActAcceso].tipoAcceso + " no se reconoce como valido, " +
                    "linea: " + this.L_Accesos[posActAcceso].line + " comlumna: " + this.L_Accesos[posActAcceso].column);
            }
        }
    }

    private construirTodosTextos(entPadre: Entorno) {

        if (entPadre.texto !== '') {
            this.salida.push(entPadre.texto + '\n');
        }

        if (entPadre.listaEntornos.length > 0) {

            for (const entActual of entPadre.listaEntornos) {
                this.construirTodosTextos(entActual);
            }
        }
    }

    private construirTodosAtributos(entPadre: Entorno) {

        for (const atri of entPadre.listaSimbolos) {

            if (this.tipoPath === "sub") {
                this.salida.push({ value: atri.valor.replaceAll("\"", ""), type: tipoPrimitivo.STRING });
            } else {
                this.salida.push(atri.identificador + " = \"" + atri.valor.replaceAll("\"", "") + "\"\n");
            }
        }

        if (entPadre.listaEntornos.length > 0) {

            for (const entActual of entPadre.listaEntornos) {
                this.construirTodosAtributos(entActual);
            }
        }

    }

    private construirNodos(entPadre: Entorno, tab: string) {

        if (this.tipoPath === "sub") {

            if (entPadre.listaEntornos.length > 0 || (entPadre.listaEntornos.length === 0 && entPadre.texto === '')) {
                this.salida.push({ value: entPadre.identificador, type: tipoPrimitivo.NODO })
            } else {
                this.salida.push({ value: entPadre.texto, type: tipoPrimitivo.STRING });
            }

        } else {

            var atributos = "";
            for (const atri of entPadre.listaSimbolos) { // construyo atributos
                atributos += atri.identificador + " = \"" + atri.valor.replaceAll("\"", "") + "\"  ";
            }

            //construyo Nodos
            if (entPadre.listaEntornos.length === 0 && entPadre.texto === '') {
                this.salida.push(tab + "<" + entPadre.identificador + " " + atributos + "/>\n");
            }
            else if (entPadre.listaEntornos.length > 0) {

                this.salida.push(tab + "<" + entPadre.identificador + " " + atributos + ">\n");
                for (const entActual of entPadre.listaEntornos) {
                    this.construirNodos(entActual, tab + "   ");    //         //nombre  /biblio/libro//nombre             
                }
                this.salida.push(tab + "</" + entPadre.identificador + ">\n");

            } else {
                this.salida.push(tab + "<" + entPadre.identificador + " " + atributos + ">" + entPadre.texto + "</" + entPadre.identificador + ">\n");
            }

        }
    }

    private validarPredicadosAtri(entPadre: Entorno, simboloPadre: Simbolo, posActAcceso: number): boolean {

        for (let i = 0; i < this.L_Accesos[posActAcceso].predicados.length; i++) {

            var result: Retorno = this.L_Accesos[posActAcceso].predicados[i].execute(entPadre, simboloPadre);
            if (result.value === tipoPrimitivo.NUMBER) {

                if (result.value - 1 >= 0 && result.value - 1 < entPadre.listaEntornos.length) {
                    if (entPadre.listaSimbolos[result.value - 1] !== simboloPadre) {
                        return false;
                    }
                }
            } else if (result.value.length > 0 && result.type === tipoPrimitivo.RESP) {

                if (result.value.type === tipoPrimitivo.NODO) {
                    return false;
                }
            } else if (result.value === false) {
                return false;
            }

        }
        return true;
    }

    private validarPredicadosNodos(entPadre: Entorno, entActual: Entorno, posActAcceso: number): boolean {

        for (let i = 0; i < this.L_Accesos[posActAcceso].predicados.length; i++) {

            var result: Retorno = this.L_Accesos[posActAcceso].predicados[i].execute(entActual);
            if (result.type === tipoPrimitivo.NUMBER) {

                if (result.value - 1 >= 0 && result.value - 1 < entPadre.listaEntornos.length) {
                    if (entPadre.listaEntornos[result.value - 1] !== entActual) {
                        return false;
                    }
                }
            } else if (result.value.length > 0 && result.type === tipoPrimitivo.RESP) {

                if (result.value.type === tipoPrimitivo.NODO) {
                    if (result.value === entActual.identificador) {
                        return true;
                    }
                }
            } else if (result.value === false) {
                return false;
            }
        }
        return true;
    }

    private validarPredicadosRaiz(entActual: Entorno, posActAcceso: number): boolean {

        for (let i = 0; i < this.L_Accesos[posActAcceso].predicados.length; i++) {

            var result: Retorno = this.L_Accesos[posActAcceso].predicados[i].execute(entActual);
            if (result.type === tipoPrimitivo.NUMBER) {

                if (result.value !== 1) {
                    return false;
                }
            } else if (result.value === "" && result.type === tipoPrimitivo.error) {
                return false;
            } else if (result.value === false) {
                return false;
            }
        }
        return true;
    }

    public GraficarAST(texto: string): string {
        if (this.tipoPath === "relativa") {
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"/\"];\n";
        } else if (this.tipoPath === "absoluta") {
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"//\"];\n";
        } else {
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"sub\"];\n";
        }
        for (const key in this.L_Accesos) {
            texto = this.L_Accesos[key].GraficarAST(texto);
            if (this.line.toString() !== this.L_Accesos[key].line.toString() || this.column.toString() !== this.L_Accesos[key].column.toString()) {
                texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "->" + "nodo" + this.L_Accesos[key].line.toString() + "_" + this.L_Accesos[key].column.toString() + ";\n";
            }
        }
        return texto;
    }

    public insertarConsulta() {
        traduccion.setTranslate("//Ingresando consulta Xpath\t--------------");

        for (const key of this.L_Accesos) {
            traduccion.stackCounter++;
            key.SP_id = traduccion.stackCounter;
            traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");

            for (let i = 0; i < key.id.length; i++) {
                traduccion.setTranslate("heap[(int)H] = " + key.id.charCodeAt(i) + ";" + "\t\t//Caracter " + key.id[i].toString());
                traduccion.setTranslate("H = H + 1;");
                if (i + 1 === key.id.length) {
                    traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                    traduccion.setTranslate("H = H + 1;");
                }
            }
        }
    }

}