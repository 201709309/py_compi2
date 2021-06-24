export class traduccion {
    static t: number = 0;
    static stackCounter: number = 0;
    static etiquetaCounter: number = 0;
    static tranlate: string = "";
    static printString: boolean = false;
    static metodostring:string = "";
    static metodoConsultaXPATH:string = "";

    public static getTranslate(): string {
        var content: string = "";
        content += "//Header\t--------------\n";
        content += "#include <stdio.h>\n\n";
        content += "double heap[30101999];\n";
        content += "double stack[30101999];\n\n";
        content += "double S;\n";
        content += "double H;\n\n";
        if (this.t > 0) {
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
}