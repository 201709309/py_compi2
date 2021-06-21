import { Entorno } from "../xmlAST/Entorno";
import { traduccion } from '../Traduccion/traduccion';

export class SimboloTablaXml {
    linea: number;
    columna: number;
    nombre: string;
    tipo: string;
    ambito: string;
    valor: string;


    constructor(linea: number, columna: number, nombre: string, tipo: string, ambito: string, valor: string) {
        this.linea = linea;
        this.columna = columna;
        this.nombre = nombre;
        this.tipo = tipo;
        this.ambito = ambito;
        this.valor = valor;
    }
}

export function traducirXml(raiz: Entorno) {
    var TablaSimbolos = [];
    traducirXmlRecursive(raiz, TablaSimbolos, raiz.identificador);
    console.log(TablaSimbolos);
}

export function traducirXmlRecursive(raiz: Entorno, resultado: Array<SimboloTablaXml>, entorno: string) {
    traduccion.setTranslate("t" + traduccion.t.toString() + " = P + " + resultado.length.toString() + ";");
    traduccion.t++;
    traduccion.setTranslate("t" + traduccion.t.toString() + " = H;");
    traduccion.setTranslate("H = H + 1;");

    traduccion.setTranslate("stack[(int)" + "t" + (traduccion.t - 1).toString() + "] = " + "t" + traduccion.t.toString() + ";");
    traduccion.t++;

    for (let i = 0; i < raiz.identificador.length; i++) {
        traduccion.setTranslate("heap[(int)H] = " +raiz.identificador.charCodeAt(i) + ";");
        traduccion.setTranslate("H = H + 1;");
        if (i + 1 === raiz.identificador.length) {
            traduccion.setTranslate("heap[(int)H] = -1;");
            traduccion.setTranslate("H = H + 1;");
        }
    }



    resultado.push(new SimboloTablaXml(raiz.linea, raiz.columna, raiz.identificador, "Entorno", entorno, raiz.texto));
    for (const key in raiz.listaSimbolos) {
        resultado.push(new SimboloTablaXml(raiz.listaSimbolos[key].linea, raiz.listaSimbolos[key].columna, raiz.listaSimbolos[key].identificador, "Atributo", raiz.identificador, raiz.listaSimbolos[key].valor));
    }
    for (const key in raiz.listaEntornos) {
        resultado = traducirXmlRecursive(raiz.listaEntornos[key], resultado, raiz.identificador);
    }
    return resultado;
}