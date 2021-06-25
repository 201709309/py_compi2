export class traduccion {
    static t: number = -1;
    static stackCounter: number = -1;
    static etiquetaCounter: number = -1;
    static tranlate: string = "";
    static printString: boolean = false;
    static metodostring:string = "";
    static metodoConsultaXPATH:string = "";
    static compararCadenas3d:string="";
    static etiquetaTexto:string="";

    public static getTranslate(): string {
        var content: string = "";
        content += "//Header\t--------------\n";
        content += "#include <stdio.h>\n\n";
        content += "double heap[30101999];\n";
        content += "double stack[30101999];\n\n";
        content += "double S;\n";
        content += "double H;\n\n";
        if (this.t+1 > 0) {
            content += "double ";
            for (let i = 0; i < this.t; i++) {
                content += "t" + i.toString();
                if (i < this.t - 1) {
                    content += ", ";
                }
            }
            content += ";\n\n";
        }
        content += this.metodostring;
        content += this.metodoConsultaXPATH;
        content += this.compararCadenas3d;
        content += this.etiquetaTexto;
        content += "//Metodo Main\t--------------\n";
        content += "void main(){\n";
        content += "S = 0; H = 0;\n\n";
        content += this.tranlate;
        content += "\nreturn;\n";
        content += "}";
        return content;
    }

    public static setTranslate(content: string) {
        this.tranlate += content + "\n";
    }

    public static setPrintString(content:string) {
        this.metodostring += content + "\n";
    }

    public static setConsultaXPATH(content:string) {
        this.metodoConsultaXPATH += content + "\n";
    }

    //CREACION DEL METODO comparar cadenas****************************
    public static metodoCompararCadenas() {
        this.compararCadenas3d += "//Metodo Comparar cadenas\t--------------\n";
        this.compararCadenas3d += "void compararCadenas() {\n";
        traduccion.t++;
        this.compararCadenas3d += "t"+traduccion.t+" = S + 1;\n";
        traduccion.t++;
        this.compararCadenas3d += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";
        traduccion.t++;
        this.compararCadenas3d += "t"+traduccion.t+" = t"+(traduccion.t-2)+" + 1;\n";
        traduccion.t++;
        this.compararCadenas3d += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";
        traduccion.etiquetaCounter++;
        this.compararCadenas3d += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.t++;
        this.compararCadenas3d += "t"+traduccion.t + " = heap[(int)t"+(traduccion.t-3)+"];\n";
        traduccion.t++;
        this.compararCadenas3d += "t"+traduccion.t + " = heap[(int)t"+(traduccion.t-2)+"];\n";
        traduccion.t++;
        traduccion.etiquetaCounter++;
        this.compararCadenas3d += "if(t"+(traduccion.t-2)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.compararCadenas3d += "if(t"+(traduccion.t-1)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.compararCadenas3d += "if(t"+(traduccion.t-2)+"!=t"+(traduccion.t-1)+") goto L"+traduccion.etiquetaCounter+";\n";
        this.compararCadenas3d += "t"+(traduccion.t-5)+" = t"+(traduccion.t-5)+" + 1;\n";
        this.compararCadenas3d += "t"+(traduccion.t-3)+" = t"+(traduccion.t-3)+" + 1;\n";
        this.compararCadenas3d += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        this.compararCadenas3d += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.etiquetaCounter++;
        this.compararCadenas3d += "if(t"+(traduccion.t-1)+"==t"+(traduccion.t-2)+") goto L"+traduccion.etiquetaCounter+";\n";
        this.compararCadenas3d += "stack[(int)t"+(traduccion.t-6)+"] = 0;\n";
        traduccion.etiquetaCounter++;
        this.compararCadenas3d += "goto L"+(traduccion.etiquetaCounter)+";\n";
        traduccion.etiquetaCounter++;
        this.compararCadenas3d += "L"+(traduccion.etiquetaCounter-2)+":\n";
        this.compararCadenas3d += "stack[(int)t"+(traduccion.t-6)+"] = 1;\n";
        this.compararCadenas3d += "L"+(traduccion.etiquetaCounter-1)+":\n";
        this.compararCadenas3d += "return;\n";
        this.compararCadenas3d += "}\n\n";
        //traduccion.t++;
    }


    //CREACION DEL METODO imprimir nodo Texto****************************
    public static crearEtiquetaTexto() {
        this.etiquetaTexto += "//Metodo Comparar cadenas\t--------------\n";
        this.etiquetaTexto += "void crearEtiquetaTexto() {\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t+" = S + 1;\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t+" = t"+(traduccion.t-2)+" + 1;\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";


        this.etiquetaTexto += "printf(\"%c\", (char)60);\n";
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t + " = heap[(int)t"+(traduccion.t-3)+"];\n";

        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "if(t"+(traduccion.t)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.etiquetaTexto += "printf(\"%c\", (char)t"+traduccion.t+");\n";
        this.etiquetaTexto += "t"+(traduccion.t-3)+" = t"+(traduccion.t-3)+" + 1;\n";
        this.etiquetaTexto += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        this.etiquetaTexto += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaTexto += "printf(\"%c\", (char)62);\n";
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "goto L"+(traduccion.etiquetaCounter)+";\n";
        this.etiquetaTexto += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t + " = heap[(int)t"+(traduccion.t-2)+"];\n";
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "if(t"+(traduccion.t)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.etiquetaTexto += "printf(\"%c\", (char)t"+traduccion.t+");\n";
        this.etiquetaTexto += "t"+(traduccion.t-2)+" = t"+(traduccion.t-2)+" + 1;\n";
        this.etiquetaTexto += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        this.etiquetaTexto += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaTexto += "printf(\"%c\", (char)60);\n";
        this.etiquetaTexto += "printf(\"%c\", (char)47);\n";
        this.etiquetaTexto += "t"+(traduccion.t-5)+" = S + 1;\n";
        this.etiquetaTexto += "t"+(traduccion.t-4) + " = stack[(int)t"+(traduccion.t-5)+"];\n";
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaTexto += "t"+(traduccion.t-1) + " = heap[(int)t"+(traduccion.t-4)+"];\n";
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "if(t"+(traduccion.t-1)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.etiquetaTexto += "printf(\"%c\", (char)t"+(traduccion.t-1)+");\n";
        this.etiquetaTexto += "t"+(traduccion.t-4)+" = t"+(traduccion.t-4)+" + 1;\n";
        this.etiquetaTexto += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        this.etiquetaTexto += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaTexto += "printf(\"%c\", (char)62);\n";
        this.etiquetaTexto += "return;\n";
        this.etiquetaTexto += "}\n\n";
    }
}