/* description: Parses end executes mathematical expressions. */

%{
    const {Entorno} = require("../xmlAST/Entorno");
    const {Simbolo} = require("../xmlAST/Simbolo");
    const {ClaseError} = require("../xmlAST/ClaseError");
    var texto = "";
    var listaErrores = [];
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
([a-zA-Z_]|"á"|"é"|"í"|"ó"|"ú"|"Á"|"É"|"Í"|"Ó"|"Ú")("-"|[a-zA-Z0-9_ñÑ]|"á"|"é"|"í"|"ó"|"ú"|"Á"|"É"|"Í"|"Ó"|"Ú")*              return 'id';
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

/* operator associations and precedence */

/*%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS*/

%start init

%% /* language grammar */

init
    :  'menor' '?' id LISTAATRIBUTOS '?' 'mayor' INTRO    {
                                                    var textTemp = texto;
                                                    var listaErroresTemp = listaErrores;
                                                    texto = "";
                                                    listaErrores = [];
                                                    return {ast: $7,reporteGramatica: textTemp, listaErrores : listaErroresTemp};
                                                    }
    |  INTRO                                      {
                                                    var textTemp = texto;
                                                    var listaErroresTemp = listaErrores;
                                                    texto = "";
                                                    listaErrores = [];
                                                    return {ast: $1,reporteGramatica: textTemp, listaErrores : listaErroresTemp};
                                                    }
    ;

INTRO   :  INTRO NODO EOF           {texto+="INTRO -> INTRO NODO EOF\n";$1.push($2); $$ = $1; }
        |  NODO CHECK               {texto+="INTRO -> NODO CHECK\n";$$ = [$1]; }
    ;

CHECK
    : EOF               {texto+="CHECK -> EOF\n";}
    |                   {texto+="CHECK -> ε\n";}
    ;

NODO
    :    'menor' id LISTAATRIBUTOS 'mayor' LISTANODOS 'menor' '/' id 'mayor'    {
                                                                    if($2!==$8){listaErrores.push(new ClaseError('Semantico','La etiqueta '+$2+' no esta cerrada',@1.first_line, @1.first_column));}
                                                                    $$ = new Entorno($2,'',@1.first_line, @1.first_column,$3,$5);
                                                                }
    |    'menor' id LISTAATRIBUTOS 'mayor' NODOTEXTO 'menor' '/' id 'mayor'     {
                                                                    if($2!==$8){listaErrores.push(new ClaseError('Semantico','La etiqueta '+$2+' no esta cerrada',@1.first_line, @1.first_column));}
                                                                    $$ = new Entorno($2,$5,@1.first_line, @1.first_column,$3,[]);
                                                                }
    |    'menor' id LISTAATRIBUTOS '/' 'mayor'                          {texto+="NODO -> < id LISTAATRIBUTOS / >\n";$$ = new Entorno($2,'',@1.first_line, @1.first_column,$3,[]);}
    |    'menor' id  'mayor' LISTANODOS 'menor' '/' id 'mayor'                  {
                                                                    if($2!==$7){listaErrores.push(new ClaseError('Semantico','La etiqueta '+$2+' no esta cerrada',@1.first_line, @1.first_column))}
                                                                    $$ = new Entorno($2,'',@1.first_line, @1.first_column,[],$4);
                                                                }
    |    'menor' id  'mayor' NODOTEXTO 'menor' '/' id 'mayor'                   {
                                                                    if($2!==$7){listaErrores.push(new ClaseError('Semantico','La etiqueta '+$2+' no esta cerrada',@1.first_line, @1.first_column))}
                                                                    $$ = new Entorno($2,$4,@1.first_line, @1.first_column,[],[]);
                                                                }
    |    'menor' id  '/' 'mayor'                                        {texto+="NODO -> < id / >\n";$$ = new Entorno($2,'',@1.first_line, @1.first_column,[],[]);}
    |    error FINDERROR                                        {listaErrores.push(new ClaseError('Sintactico','Se esperaba la definicion de una etiqueta',@1.first_line, @1.first_column))}
    ;

FINDERROR
    : 'mayor' {}
    ;

LISTANODOS
    : LISTANODOS NODO   {texto+="LISTANODOS -> LISTANODOS NODO\n";$1.push($2); $$ = $1;}
    | NODO              {texto+="LISTANODOS -> NODO\n";$$ = [$1]; }
    ;

LISTAATRIBUTOS
    : LISTAATRIBUTOS ATRIBUTO   {texto+="LISTAATRIBUTOS -> LISTAATRIBUTOS ATRIBUTO\n";$1.push($2); $$ = $1;}
    | ATRIBUTO                  {texto+="LISTAATRIBUTOS -> ATRIBUTO\n";$$ = [$1]; }
    ;

ATRIBUTO
    : id '=' sstring    {texto+="ATRIBUTO -> id = sstring\n";$$ = new Simbolo($1, $3, @1.first_line, @1.first_column); }
    | id '=' dstring    {texto+="ATRIBUTO -> id = dstring\n";$$ = new Simbolo($1, $3, @1.first_line, @1.first_column); }
    ;

NODOTEXTO : NODOTEXTO dstring       {texto+="NODOTEXTO -> NODOTEXTO dstring\n";$$ = $1 +" "+ $2 }
    | NODOTEXTO sstring             {texto+="NODOTEXTO -> NODOTEXTO sstring\n";$$ = $1 +" "+ $2 }
    | NODOTEXTO id                  {texto+="NODOTEXTO -> NODOTEXTO id\n";$$ = $1 +" "+ $2 }
    | NODOTEXTO lessthan            {texto+="NODOTEXTO -> NODOTEXTO lessthan\n";$$ = $1 +" "+ "<" }
    | NODOTEXTO greaterthan         {texto+="NODOTEXTO -> NODOTEXTO greaterthan\n";$$ = $1 +" "+ ">" }
    | NODOTEXTO ampersand           {texto+="NODOTEXTO -> NODOTEXTO ampersand\n";$$ = $1 +" "+ "&" }
    | NODOTEXTO apostrophe          {texto+="NODOTEXTO -> NODOTEXTO apostrophe\n";$$ = $1 +" "+ "\'" }
    | NODOTEXTO quotmark            {texto+="NODOTEXTO -> NODOTEXTO quotmark\n";$$ = $1 +" "+ "\"" }
    | NODOTEXTO number              {texto+="NODOTEXTO -> NODOTEXTO number\n";$$ = $1 +" "+ $2 }
    | NODOTEXTO random              {texto+="NODOTEXTO -> NODOTEXTO random\n";$$ = $1 +" "+ $2 }
    | NODOTEXTO '/'                 {texto+="NODOTEXTO -> NODOTEXTO /\n";$$ = $1 +" "+ $2 }
    | NODOTEXTO '='                 {texto+="NODOTEXTO -> NODOTEXTO =\n";$$ = $1 +" "+ $2 }
    | dstring                       {texto+="NODOTEXTO -> dstring\n";$$ = $1 }
    | sstring                       {texto+="NODOTEXTO -> sstring\n";$$ = $1 }
    | id                            {texto+="NODOTEXTO -> id\n";$$ = $1 }
    | number                        {texto+="NODOTEXTO -> number\n";$$ = $1 }
    | lessthan                      {texto+="NODOTEXTO -> lessthan\n";$$ = "<" }
    | greaterthan                   {texto+="NODOTEXTO -> greaterthan\n";$$ = ">" }
    | ampersand                     {texto+="NODOTEXTO -> ampersand\n";$$ = "&" }
    | apostrophe                    {texto+="NODOTEXTO -> apostrophe\n";$$ = "\'" }
    | quotmark                      {texto+="NODOTEXTO -> quotmark\n";$$ = "\"" }
    | random                        {texto+="NODOTEXTO -> random\n";$$ = $1 }
    | '/'                           {texto+="NODOTEXTO -> /\n";$$ = $1 }
    | '='                           {texto+="NODOTEXTO -> =\n";$$ = $1 }
    ;