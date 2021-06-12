/* Gramatica Descendente de XML. */

%{
    const {NodoCST} = require("./NodoCST");
    var raiz = new NodoCST("INIT",0,[]);
    var nodoaux;
    var lista = [];
    var contador = 0;
    var texto = "";
    var txtGramProd = [];
    var txtGramRegSem = [];
%}

/* lexical grammar */
%lex
%options case-insensitive


%%
\s+                                         /* skip whitespace */
[<][!][-][-][^-<]*[-][-][>]                 /*skip comments*/
"<"                                         return 'menor';
">"                                         return 'mayor';
"/"                                         return '/';
"="                                         return '=';
"?"                                         return '?';
(\"([^\"\\])*\")                            return 'dstring';
(\'([^\'\\])*\')                            return 'sstring';
([a-zA-Z_]|"á"|"é"|"í"|"ó"|"ú"|"Á"|"É"|"Í"|"Ó"|"Ú")("-"|[a-zA-Z0-9_ñÑ]|"á"|"é"|"í"|"ó"|"ú"|"Á"|"É"|"Í"|"Ó"|"Ú"|"'")*            return 'id';
(([0-9]+"."[0-9]+)|("."[0-9]+)|([0-9]+))    return 'number';
"&""l""t"";"                                return 'lessthan';
"&""g""t"";"                                return 'greaterthan';
"&""a""m""p"";"                             return 'ampersand';
"&""a""p""o""s"";"                          return 'apostrophe';
"&""q""u""o""t"";"                          return 'quotmark';
[^<> ]+                                     return 'random';
<<EOF>>               return 'EOF';

//error lexico
.                                   {
                                        console.log('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

/lex

/* Precedencia de operadores */
/*%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS*/

%start INIT

%% /* language grammar */

INIT
    :  'menor' '?' id LISTAATRIBUTOS '?' 'mayor' INTRO    
    {
        txtGramProd.push("INIT := menor ? id LISTAATRIBUTOS ? mayor INTRO");
        txtGramRegSem.push("INIT.val := INTRO.val");
        contador++;
        raiz.crearNodo("<",contador,[]);
        contador++;
        raiz.crearNodo("?",contador,[]);
        contador++;
        raiz.crearNodo("id",contador,[]);
        contador++;
        raiz.crearNodo("LISTAATRIBUTOS",contador,$4);
        contador++;
        raiz.crearNodo("?",contador,[]);
        contador++;
        raiz.crearNodo(">",contador,[]);
        contador++;
        raiz.crearNodo("INTRO",contador,$7);
        return {ReporteGramatical: [txtGramProd,txtGramRegSem],ReporteCST: raiz};
    }
    |  INTRO                                      
    {
        txtGramProd.push("INIT := INTRO");
        txtGramRegSem.push("INIT.val := INTRO.val");
        contador++;
        raiz.crearNodo("INTRO",contador,$1)
        return {ReporteGramatical: texto,ReporteCST: raiz};
    }
    ;

INTRO   
    :  NODO INTRO               
    {
        txtGramProd.push("INTRO := NODO INTRO");
        txtGramRegSem.push("NODO.push(INTRO.val); INTRO.val = NODO.val");
        contador++;
        nodoaux = new NodoCST("NODO",contador,$1);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("INTRO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    |  NODO CHECK               
    {
        txtGramProd.push("INTRO := NODO CHECK");
        txtGramRegSem.push("INTRO.val = NODO.val");
        contador++;
        nodoaux = new NodoCST("NODO",contador,$1);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("CHECK",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    ;

CHECK
    : EOF               
    {
        txtGramProd.push("CHECK := EOF");
        txtGramRegSem.push("CHECK.val := EOF");
        contador++;
        nodoaux = new NodoCST("EOF",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    |                   
    {
        txtGramProd.push("CHECK := ε");
        txtGramRegSem.push("CHECK.val := ε");
        contador++;
        nodoaux = new NodoCST("ε",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    ;

NODO
    :    'menor' id LISTAATRIBUTOS 'mayor' LISTANODOS 'menor' '/' id 'mayor'    
    {
        txtGramProd.push("NODO := menor id LISTAATRIBUTOS mayor LISTANODOS menor / id mayor");
        txtGramRegSem.push("NODO.val = new Entorno(id,[],line, column,LISTAATRIBUTOS.val,LISTANODOS.val)");
        contador++;
        nodoaux = new NodoCST("<",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("LISTAATRIBUTOS",contador,$3);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST(">",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("LISTANODOS",contador,$5);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("<",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("/",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST(">",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    |    'menor' id LISTAATRIBUTOS 'mayor' NODOTEXTO 'menor' '/' id 'mayor'     
    {
        txtGramProd.push("NODO := menor id LISTAATRIBUTOS mayor NODOTEXTO menor / id mayor");
        txtGramRegSem.push("NODO.val = new Entorno(id,NODOTEXTO.val,line,column,LISTAATRIBUTOS.val,[])");
        contador++;
        nodoaux = new NodoCST("<",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("LISTAATRIBUTOS",contador,$3);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST(">",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$5);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("<",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("/",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST(">",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    |    'menor' id LISTAATRIBUTOS '/' 'mayor'                          
    {
        txtGramProd.push("NODO := menor id LISTAATRIBUTOS / mayor");
        txtGramRegSem.push("NODO.val = new Entorno(id,[],line, column,LISTAATRIBUTOS.val,[])");
        contador++;
        nodoaux = new NodoCST("<",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("LISTAATRIBUTOS",contador,$3);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("/",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST(">",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    |    'menor' id  'mayor' LISTANODOS 'menor' '/' id 'mayor'                  
    {
        txtGramProd.push("NODO := menor id mayor LISTANODOS menor / id mayor");
        txtGramRegSem.push("NODO.val = new Entorno(id,[],line, column,[],LISTANODOS.val)");
        contador++;
        nodoaux = new NodoCST("<",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST(">",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("LISTANODOS",contador,$4);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("<",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("/",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST(">",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    |    'menor' id  'mayor' NODOTEXTO 'menor' '/' id 'mayor'                   
    {
        txtGramProd.push("NODO := menor id mayor NODOTEXTO menor / id mayor");
        txtGramRegSem.push("NODO.val := new Entorno(id,NODOTEXTO.val,line, column,[],[])");
        contador++;
        nodoaux = new NodoCST("<",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST(">",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$4);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("<",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("/",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST(">",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    |    'menor' id  '/' 'mayor'                                        
    {
        txtGramProd.push("NODO := menor id / mayor");
        txtGramRegSem.push("NODO.val = new Entorno(id,[],line, column,[],[])");
        contador++;
        nodoaux = new NodoCST("<",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("/",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST(">",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    ;

LISTANODOS
    : LISTANODOS NODO   
    {
        txtGramProd.push("LISTANODOS := NODO LISTANODOS");
        txtGramRegSem.push("LISTANODOS.push(NODO.val); LISTANODOS.val := LISTANODOS.val");
        contador++;
        nodoaux = new NodoCST("NODO",contador,$2);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("LISTANODOS",contador,$1);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | NODO              
    {
        txtGramProd.push("LISTANODOS := NODO");
        txtGramRegSem.push("LISTANODOS.val = NODO.val");
        contador++;
        nodoaux = new NodoCST("NODO",contador,$1);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    ;

LISTAATRIBUTOS
    : ATRIBUTO LISTAATRIBUTOS   
    {
        txtGramProd.push("LISTAATRIBUTOS := ATRIBUTO LISTAATRIBUTOS");
        txtGramRegSem.push("ATRIBUTO.push(LISTAATRIBUTOS.val); LISTAATRIBUTOS.val = ATRIBUTO.val;");
        contador++;
        nodoaux = new NodoCST("ATRIBUTO",contador,$1);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("LISTAATRIBUTOS",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | ATRIBUTO                  
    {
        txtGramProd.push("LISTAATRIBUTOS := ATRIBUTO");
        txtGramRegSem.push("ATRIBUTO.val = ATRIBUTO.val");
        contador++;
        nodoaux = new NodoCST("ATRIBUTO",contador,$1);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    ;

ATRIBUTO
    : id '=' sstring    
    {
        txtGramProd.push("ATRIBUTO := id = sstring");
        txtGramRegSem.push("ATRIBUTO.val := Simbolo(id,sstring,line,column)");
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("=",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("sstring",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | id '=' dstring    
    {
        txtGramProd.push("ATRIBUTO := id = dstring");
        txtGramRegSem.push("ATRIBUTO.val := new Simbolo(id,dstring,line,column)");
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("=",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("dstring",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    ;

NODOTEXTO 
    : dstring NODOTEXTO       
    {
        txtGramProd.push("NODOTEXTO := dstring NODOTEXTO");
        txtGramRegSem.push("NODOTEXTO.val := dstring + NODOTEXTO.val");
        contador++;
        nodoaux = new NodoCST("dstring",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | sstring NODOTEXTO             
    {
        txtGramProd.push("NODOTEXTO := sstring NODOTEXTO");
        txtGramRegSem.push("NODOTEXTO.val := sstring + NODOTEXTO.val");
        contador++;
        nodoaux = new NodoCST("sstring",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | id NODOTEXTO                  
    {
        txtGramProd.push("NODOTEXTO := id NODOTEXTO");
        txtGramRegSem.push("NODOTEXTO.val := id + NODOTEXTO.val");
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | lessthan NODOTEXTO            
    {
        txtGramProd.push("NODOTEXTO := lessthan NODOTEXTO");
        txtGramRegSem.push("NODOTEXTO.val := lessthan + NODOTEXTO.val");
        contador++;
        nodoaux = new NodoCST("lessthan",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | greaterthan NODOTEXTO         
    {
        txtGramProd.push("NODOTEXTO := greaterthan NODOTEXTO");
        txtGramRegSem.push("NODOTEXTO.val := greaterthan + NODOTEXTO.val");
        contador++;
        nodoaux = new NodoCST("greaterthan",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | ampersand NODOTEXTO           
    {
        txtGramProd.push("NODOTEXTO := ampersand NODOTEXTO");
        txtGramRegSem.push("NODOTEXTO.val := ampersand + NODOTEXTO.val");
        contador++;
        nodoaux = new NodoCST("ampersand",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | apostrophe NODOTEXTO          
    {
        txtGramProd.push("NODOTEXTO := apostrophe NODOTEXTO");
        txtGramRegSem.push("NODOTEXTO.val := apostrophe + NODOTEXTO.val");
        contador++;
        nodoaux = new NodoCST("apostrophe",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | quotmark NODOTEXTO            
    {
        txtGramProd.push("NODOTEXTO := quotmark NODOTEXTO");
        txtGramRegSem.push("NODOTEXTO.val := quotmark + NODOTEXTO.val");
        contador++;
        nodoaux = new NodoCST("quotmark",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | number NODOTEXTO              
    {
        txtGramProd.push("NODOTEXTO := number NODOTEXTO");
        txtGramRegSem.push("NODOTEXTO.val := number + NODOTEXTO.val");
        contador++;
        nodoaux = new NodoCST("number",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | random NODOTEXTO              
    {
        txtGramProd.push("NODOTEXTO := random NODOTEXTO");
        txtGramRegSem.push("NODOTEXTO.val := random + NODOTEXTO.val");
        contador++;
        nodoaux = new NodoCST("random",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | '/' NODOTEXTO                 
    {
        txtGramProd.push("NODOTEXTO := '/' NODOTEXTO");
        txtGramRegSem.push("NODOTEXTO.val := '/' + NODOTEXTO.val");
        contador++;
        nodoaux = new NodoCST("'/'",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | '=' NODOTEXTO                 
    {
        txtGramProd.push("NODOTEXTO := '=' NODOTEXTO");
        txtGramRegSem.push("NODOTEXTO.val := '=' + NODOTEXTO.val");
        contador++;
        nodoaux = new NodoCST("'='",contador,[]);
        lista.push(nodoaux);
        contador++;
        nodoaux = new NodoCST("NODOTEXTO",contador,$2);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | dstring                       
    {
        txtGramProd.push("NODOTEXTO := dstring");
        txtGramRegSem.push("NODOTEXTO.val := dstring");
        contador++;
        nodoaux = new NodoCST("dstring",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | sstring                       
    {
        txtGramProd.push("NODOTEXTO := sstring");
        txtGramRegSem.push("NODOTEXTO.val := sstring");
        contador++;
        nodoaux = new NodoCST("sstring",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | id                            
    {
        txtGramProd.push("NODOTEXTO := id");
        txtGramRegSem.push("NODOTEXTO.val := id");
        contador++;
        nodoaux = new NodoCST("id",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | number                        
    {
        txtGramProd.push("NODOTEXTO := number");
        txtGramRegSem.push("NODOTEXTO.val := number");
        contador++;
        nodoaux = new NodoCST("number",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | lessthan                      
    {
        txtGramProd.push("NODOTEXTO := lessthan");
        txtGramRegSem.push("NODOTEXTO.val := lessthan");
        contador++;
        nodoaux = new NodoCST("lessthans",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | greaterthan                   
    {
        txtGramProd.push("NODOTEXTO := greaterthan");
        txtGramRegSem.push("NODOTEXTO.val := greaterthan");
        contador++;
        nodoaux = new NodoCST("greaterthan",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | ampersand                     
    {
        txtGramProd.push("NODOTEXTO := ampersand");
        txtGramRegSem.push("NODOTEXTO.val := ampersand");
        contador++;
        nodoaux = new NodoCST("ampersand",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | apostrophe                    
    {
        txtGramProd.push("NODOTEXTO := apostrophe");
        txtGramRegSem.push("NODOTEXTO.val := apostrophe");
        contador++;
        nodoaux = new NodoCST("apostrophe",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | quotmark                      
    {
        txtGramProd.push("NODOTEXTO := quotmark");
        txtGramRegSem.push("NODOTEXTO.val := quotmark");
        contador++;
        nodoaux = new NodoCST("quotmark",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | random                        
    {
        txtGramProd.push("NODOTEXTO := random");
        txtGramRegSem.push("NODOTEXTO.val := random");
        contador++;
        nodoaux = new NodoCST("random",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | '/'                           
    {
        txtGramProd.push("NODOTEXTO := /");
        txtGramRegSem.push("NODOTEXTO.val := /");
        contador++;
        nodoaux = new NodoCST("/",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    | '='                           
    {
        txtGramProd.push("NODOTEXTO := =");
        txtGramRegSem.push("NODOTEXTO.val := =");
        contador++;
        nodoaux = new NodoCST("=",contador,[]);
        lista.push(nodoaux);
        $$ = lista;
        lista = [];
    }
    ;