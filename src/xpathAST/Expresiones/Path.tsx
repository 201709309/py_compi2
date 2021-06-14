import { Entorno } from '../../xmlAST/Entorno';
import { Acceso} from './Acceso';
import { Expression, Retorno } from "../../Interfaces/Expresion";
import { tipoPrimitivo } from './Primitivo';
import { Simbolo } from '../../xmlAST/Simbolo';

export class Path implements Expression{

    salida: any[];

    constructor (
    public line : Number,
    public column: Number,
    public L_Accesos : Acceso [],
    public tipoPath : string
    ){
        this.salida=[];
    }   

    ////fechaPublicacion[@año>./../../libro[3]/fechaPublicacion/@año]

    private construirSalida () : string{

        let salida : string = ""

        for (const element of this.salida) {
            salida += element
        }
        return salida;
    }

    public execute(ent : Entorno, simboloPadre?:Simbolo) :Retorno { //      /biblio

        if (this.tipoPath === "sub"){

            this.getQuery(ent, 0, simboloPadre)
            return {value: this.salida, type: tipoPrimitivo.RESP};

        }else {

            if (this.L_Accesos.length > 0 && ent.listaEntornos.length > 0){

                if (this.L_Accesos[0].tipoAcceso === "nodo"){
                    
                    if(ent.identificador === this.L_Accesos[0].id){//validamos que el id entActual sea igual al id de la poscion Actual de accesos
    
                        if (this.validarPredicadosNodos(ent, ent, 0)){
    
                            if(this.L_Accesos.length >  1){ //verificamos si la consutla nos dice que accediendo a descendientes
                                this.getQuery(ent, 1, simboloPadre); 
                            }else{
                                this.construirNodos(ent, "")
                            }
                        }
                    }
                }
            }
            
        }
        return {value: this.construirSalida(), type: tipoPrimitivo.STRING};
    }

    public getQuery(entPadre: Entorno, posActAcceso: number, simboloPadre?:Simbolo ) {
        
        if(this.L_Accesos[posActAcceso].tipoAcceso === "actual"){
           
            if (simboloPadre !== undefined){

                if(this.L_Accesos.length === posActAcceso + 1){
                    
                    if (this.validarPredicadosAtri(entPadre, simboloPadre, posActAcceso)){

                        if (this.tipoPath === "sub"){
                            this.salida.push({value : simboloPadre.valor.replaceAll("\"",""), type: tipoPrimitivo.STRING}) ;
                        }
                        this.salida.push(simboloPadre.identificador + " = \"" + simboloPadre.valor.replaceAll("\"","") + "\"\n");
                    }
                }else{
                    throw new Error("Nose puede acceder a un atributo: " + this.L_Accesos[posActAcceso].id);
                } 
            }else {

                if(entPadre.listaEntornos.length > 0){
                        
                    if(this.L_Accesos.length >  posActAcceso + 1){ //verificamos si la consutla nos dice que accediendo a descendientes
                        this.getQuery(entPadre, posActAcceso + 1, simboloPadre); 
                    }else{
                        this.construirNodos(entPadre, "")
                    }
                }
            }
                
        }else {                  
           
            if(simboloPadre === undefined){

                if (this.L_Accesos[posActAcceso].tipoAcceso === "todosAtributos"||this.L_Accesos[posActAcceso].tipoAcceso === "atributo"){
                    
                    if (this.L_Accesos.length === posActAcceso + 1){
                        this.construirAtributos(entPadre, posActAcceso);
                    }else {
                        throw new Error("Nose puede acceder a un atributo: " + this.L_Accesos[posActAcceso].id);
                    }
                }else if (this.L_Accesos[posActAcceso].tipoAcceso === "todosNodos"){

                    if(entPadre.listaEntornos.length > 0){
                        
                        for (const entActual of entPadre.listaEntornos) { 
                            
                            if (this.validarPredicadosNodos(entPadre, entActual, posActAcceso)){
            
                                if(this.L_Accesos.length > posActAcceso + 1){ //verificamos si la consutla nos dice que accediendo a descendientes
                                    this.getQuery(entActual, posActAcceso + 1, simboloPadre); 
                                }else{
                                    this.construirNodos(entActual, "")
                                }
                            }
                        }
                    }

                }else{//if (this.L_Accesos[posActAcceso].tipoAcceso == "nodo"){
                    
                    if(entPadre.listaEntornos.length > 0){
                          
                        for (const entActual of entPadre.listaEntornos) {//recorremos los hijos del entorno padre que llamaremos entActual
        
                            if(entActual.identificador === this.L_Accesos[posActAcceso].id){//validamos que el id entActual sea igual al id de la poscion Actual de accesos
            
                                if (this.validarPredicadosNodos(entPadre, entActual, posActAcceso)){
            
                                    if(this.L_Accesos.length >  posActAcceso + 1){ //verificamos si la consutla nos dice que accediendo a descendientes
                                        this.getQuery(entActual, posActAcceso + 1, simboloPadre); 
                                    }else{
                                        this.construirNodos(entActual, "")
                                    }
                                }
                            }
                        }
                    }
                }

            }else {
                throw new Error("Nose puede acceder a un atributo: " + this.L_Accesos[posActAcceso].id);
            }
        }
    }

    private construirAtributos(entPadre:Entorno, posActAcceso: number) {

        if(this.L_Accesos[posActAcceso].tipoAcceso === "atributo"){
               
            const atri = entPadre.getAtributo(this.L_Accesos[posActAcceso].id)
            if(atri != null){

                if (this.validarPredicadosAtri(entPadre, atri, posActAcceso)){
                    
                    if (this.tipoPath === "sub"){
                        this.salida.push({value : atri.valor.replaceAll("\"",""), type: tipoPrimitivo.STRING}) ;
                    }
                    this.salida.push(atri.identificador + " = \"" + atri.valor.replaceAll("\"","") + "\"\n");
                }
            }
        }else {

            for (const atri of entPadre.listaSimbolos){

                if (this.validarPredicadosAtri(entPadre, atri, posActAcceso)){
                   
                    if (this.tipoPath === "sub"){
                        this.salida.push({value : atri.valor.replaceAll("\"",""), type: tipoPrimitivo.STRING}) ;
                    }
                    this.salida.push(atri.identificador + " = \"" + atri.valor.replaceAll("\"","") + "\"\n");
                }
            }
        }

        
    }

    private construirNodos(entPadre:Entorno, tab : string){

        if (this.tipoPath === "sub"){

            if (entPadre.listaEntornos.length > 0 || (entPadre.listaEntornos.length === 0 && entPadre.texto === '')){
                this.salida.push({value : entPadre.identificador , type: tipoPrimitivo.NODO})
            }else {
                this.salida.push({value : entPadre.texto, type: tipoPrimitivo.STRING});
            }

        }else {

            var atributos = "";

            for (const atri of entPadre.listaSimbolos) {
                atributos+= atri.identificador + " = \"" + atri.valor.replaceAll("\"","") + "\"  ";
            }

            if(entPadre.listaEntornos.length === 0 && entPadre.texto === ''){
                this.salida.push(tab +"<" + entPadre.identificador + " " + atributos + "/>\n");
            }
            else if(entPadre.listaEntornos.length > 0){

                this.salida.push(tab +"<" + entPadre.identificador + " " + atributos + ">\n");
                for (const entActual of entPadre.listaEntornos) {
                    this.construirNodos(entActual, tab + "   ");    //         //nombre  /biblio/libro//nombre             
                }
                this.salida.push(tab +"</" + entPadre.identificador + ">\n");
            
            } else{
                this.salida.push(tab +"<"+ entPadre.identificador +" "+ atributos+">"+entPadre.texto+"</"+entPadre.identificador+">\n");
            }

        }
    }

    private validarPredicadosNodos(entPadre: Entorno, entActual : Entorno, posActAcceso:number) : boolean{

        for (let i = 0; i < this.L_Accesos[posActAcceso].predicados.length; i++) {
            
            var result : Retorno = this.L_Accesos[posActAcceso].predicados[i].execute(entActual);
            if (result.type === tipoPrimitivo.NUMBER){
                
                if (result.value - 1 >= 0 && result.value - 1 < entPadre.listaEntornos.length){
                    if (entPadre.listaEntornos[result.value - 1] !== entActual){
                        return false; 
                    }
                }
            }else if (result.value === "" && result.type === tipoPrimitivo.error){
                return false; 
            }else if (result.value === false) {
                return false ;
            }
        }
        return true;
    }

    private validarPredicadosAtri(entPadre: Entorno, simboloPadre:Simbolo, posActAcceso:number) : boolean{

        for (let i = 0; i < this.L_Accesos[posActAcceso].predicados.length; i++) {
            
            var result : Retorno = this.L_Accesos[posActAcceso].predicados[i].execute(entPadre, simboloPadre);
            if (result.value === tipoPrimitivo.NUMBER){
                
                if (result.value - 1 >= 0 && result.value - 1 < entPadre.listaEntornos.length){
                    if (entPadre.listaSimbolos[result.value - 1] !== simboloPadre){
                        return false; 
                    }
                }
            }else if (result.value === "" && result.type === tipoPrimitivo.error){
                return false; 
            }else if (result.value === false) {
                return false ;
            }
            
        }
        return true;
    } 

    
                      //                 P     3
                    //   /biblio/libro/autor/ksdnf                    //id

    //entender construir nodos  
  


    ///     /biblioteca/libro[usuario/fechaPublicacion/@año = titulo]/autor                     /biblioteca/libro/fechaPublicacion[@año = "1973"]


       



}