import { Entorno } from "../xmlAST/Entorno";
import { traduccion } from '../traduccion/traduccion';

export function traducirXml(ast) {
    traducirXmlRecursive(ast[0]);
}

export function traducirXmlRecursive(raiz: Entorno) {
    traduccion.setTranslate("//Posicion en stack\t--------------");
    raiz.SP = traduccion.stackCounter;
    traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
    traduccion.setTranslate("");
    traduccion.setTranslate("//Identificador de etiqueta: " + raiz.identificador.toString() + "\t--------------");
    for (let i = 0; i < raiz.identificador.length; i++) {
        traduccion.setTranslate("heap[(int)H] = " + raiz.identificador.charCodeAt(i) + ";" + "\t\t//Caracter " + raiz.identificador[i].toString());
        traduccion.setTranslate("H = H + 1;");
        if (i + 1 === raiz.identificador.length) {
            traduccion.setTranslate("heap[(int)H] = -1;"  + "\t\t//FIN DE CADENA");
            traduccion.setTranslate("H = H + 1;");
        }
    }
    if (raiz.texto.length!==0) {
        traduccion.setTranslate("\n");
        traduccion.setTranslate("//Texto de nodo: " + raiz.identificador.toString() + "\t--------------");
        for (let i = 0; i < raiz.texto.length; i++) {
            traduccion.setTranslate("heap[(int)H] = " + raiz.texto.charCodeAt(i) + ";" + "\t\t//Caracter " + raiz.texto[i].toString());
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === raiz.texto.length) {
                traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                traduccion.setTranslate("H = H + 1;");
            }
        }
    }
    for (const simbolo of raiz.listaSimbolos) {
        traduccion.setTranslate("");
        traduccion.stackCounter++;
        simbolo.SP = traduccion.stackCounter;
        traduccion.setTranslate("//Posicion en stack\t--------------");
        traduccion.setTranslate("stack[" + traduccion.stackCounter.toString() + "] = " + "H;");
        traduccion.setTranslate("");
        traduccion.setTranslate("//Simbolo " + simbolo.identificador.toString() + " de etiqueta: " + raiz.identificador.toString() + "\t--------------")
        for (let i = 0; i < simbolo.identificador.length; i++) {
            traduccion.setTranslate("heap[(int)H] = " + simbolo.identificador.charCodeAt(i) + ";"  + "\t\t//Caracter " + simbolo.identificador[i].toString());
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === simbolo.identificador.length) {
                traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                traduccion.setTranslate("H = H + 1;");
            }
        }
        simbolo.valor=simbolo.valor.replaceAll("\"","");
        simbolo.valor=simbolo.valor.replaceAll("'","");
        for (let i = 0; i < simbolo.valor.length; i++) {
            
            traduccion.setTranslate("heap[(int)H] = " + simbolo.valor.charCodeAt(i) + ";" + "\t\t//Caracter " + simbolo.valor[i].toString());
            traduccion.setTranslate("H = H + 1;");
            if (i + 1 === simbolo.valor.length) {
                traduccion.setTranslate("heap[(int)H] = -1;" + "\t\t//FIN DE CADENA");
                traduccion.setTranslate("H = H + 1;");
            }
        }
    }
    traduccion.setTranslate("\n");
    for (const key in raiz.listaEntornos) {
        traduccion.stackCounter++;
        traducirXmlRecursive(raiz.listaEntornos[key]);
    }
}