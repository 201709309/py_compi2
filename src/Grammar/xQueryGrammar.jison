

%{
    const {Acceso} = require("../xpathAST/Expresiones/Acceso");
    const {Aritmetico, operacionAritmetica} = require("../xpathAST/Expresiones/Aritmetico");
    const {Logica, operacionLogica} = require("../xpathAST/Expresiones/Logica");
    const {Path} = require("../xpathAST/Expresiones/Path");
    const {Primitivo, tipoPrimitivo} = require("../xpathAST/Expresiones/Primitivo");
    const {Relacional, operacionRelacional} = require("../xpathAST/Expresiones/Relacional")
    const {ClaseError} = require("../xmlAST/ClaseError");
    var listaErrores = [];
    var tmp="";

    const {EtiquetasXML} = require("../xqueryAST/ExpresonesXquery/EtiquetasXML");
    const {Return} = require("../xqueryAST/ExpresonesXquery/Return.tsx");

%}

/* lexical grammar */
%lex 
%options case-insensitive
%s string

%%
<INITIAL>["]      {this.begin('string'); tmp=""; }           
<string>[^"]      {tmp=tmp+yytext; this.begin('string');}
<string>[\\][n]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][t]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][r]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\]["]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][\\]  { tmp= tmp+yytext;   this.begin('string');}
<string>[\"]      {
                    this.begin('INITIAL');
                    yytext= tmp;
                    tmp = "";
                    return 'cadena';
                  }

<INITIAL>[']      {this.begin('string'); tmp=""; }           
<string>[^']      {tmp=tmp+yytext; this.begin('string');}
<string>[\\][n]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][t]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][r]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][']   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][\\]  { tmp= tmp+yytext;   this.begin('string');}
<string>[\']      {
                    this.begin('INITIAL');
                    yytext= tmp;
                    tmp = "";
                    return 'scadena';
                  }

"//"                  return '//'
"/"                   return '/'
'..'                  return '..'
"."                   return '.'
"@"                   return '@'
"["                   return '['
"]"                   return ']'
"("                   return '('
")"                   return ')'
[" "]+                {}
"|"                   return '|'
"+"                   return '+'
"-"                   return '-'
"*"                   return '*'
"div"                 return 'div'
"="                   return '='
"!="                  return '!='
"<="                  return '<='
">="                  return '>='
"<"                   return '<'
">"                   return '>'
"or"                  return 'or'
"and"                 return 'and'
"mod"                 return 'mod'


"::"                  return '::'
":="                  return ':='
":"                   return ':'
"child"               return 'child'
"attribute"           return 'attribute'
"descendant"          return 'descendant'
"text"                return 'text'
"last"                return 'last' 
"position"            return 'position'

"return"              return 'return';

        
[0-9]+                                      return 'number'
[a-zA-Z_][a-zA-Z0-9_ñÑ]*                    return 'id'
<<EOF>>                                     return 'EOF'
.             {console.log('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}
/lex

/* operator associations and precedence */
%left 'or'
%left 'and' 
%left '=' '!='
%left '>=' '<=' '<' '>'
%left '+' '-'
%left '*' 'div'
%left 'mod'

/* definition of grammar */
%start INIT 

%% 

INIT
    : LXQUERYS 'EOF'                                        {return $1;}
    | 'EOF'                                                 {return $1;}
    ;

LXQUERYS
    : LXQUERYS ',' XQUERY                                   {$1.push($3); $$ = $1;}
    | XQUERY                                                {$$ = [$1];}
    ;    

XQUERY
    : RETURN                                                {$$ = $1;}
    | cadena                                                {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.STRING);}
    | PATH                                                  {$$ = $1;}
    ;

RETURN  
    : return XQUERY                                         {$$ = new Return (@1.first_line, @1.first_column, $2);}
    | return ETIQUETAXML                                    {$$ = new Return (@1.first_line, @1.first_column, $2);}
    ;

ETIQUETAXML
    : '<' id LATRIBUTOSXML '>' LRETEXP '<' '/' id '>'       {$$ = new EtiquetasXML(@1.first_line, @1.first_column, $1+$2+$3+$4, $6+$7+$8+$9, $5);}
    | '<' id '>' LRETEXP '<' '/' id '>'                     {$$ = new EtiquetasXML(@1.first_line, @1.first_column, $1+$2+$3, $5+$6+$7+$8, $4);}
    ;

LATRIBUTOSXML
    : LATRIBUTOSXML ATRIBUTOXML                             {$$ = $1 + " " + $2 + " ";}
    | ATRIBUTOXML                                           {$$ = " " + $1 + " ";}
    ;
 
ATRIBUTOXML
    : id '=' cadena                                         {$$ = $1 + $2 + $3;}
    ;

 LRETEXP
    : LRETEXP '{' XQUERY '}'                                {$1.push($3); $$ = $1;}
    | '{' XQUERY '}'                                        {$$ = [$2];}
    ;

// ---------------------------------------------------------xpath------------------------------------------------------------------------------------------

MULTIPATH
    : MULTIPATH '|' PATH                            {$1.push($3); $$ = $1;}
    | PATH                                          {$$ = [$1];}
    ;

PATH
    : '/' LACCESOS                                  {if($2[0].tipoQuery === undefined){$2[0].tipoQuery = 'relativa';}
                                                     $$ = new Path(@1.first_line, @1.first_column, $2);}
    | '//' LACCESOS                                 {if($2[0].tipoQuery === undefined){$2[0].tipoQuery = 'absoluta';}  
                                                     $$ = new Path(@1.first_line, @1.first_column, $2);}
    ;

LACCESOS
    : LACCESOS '/' ACCESO                           {if($3.tipoQuery === undefined){$3.tipoQuery = 'relativa'} $1.push($3); $$ = $1;}
    | LACCESOS '//' ACCESO                          {if($3.tipoQuery === undefined){$3.tipoQuery = 'absoluta'} $1.push($3); $$ = $1;}
    | ACCESO                                        {$$ = [$1];}
    ;

ACCESO 
//nodos
    : id                                            {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'nodo', []);}
    | '*'                                           {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'todosNodos', []);}
    | '.'                                           {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'actual', []);}
    | '..'                                          {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'padre', []);}
    | text '(' ')'                                  {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'texto', []);}
    | node '(' ')'                                  {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'todosNodos', []);}
    | child '::' id                                 {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'nodo', []);}
    | child '::' '*'                                {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'todosNodos', []);}
    | descendant '::' id                            {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'nodo', [], 'absoluta');}
    | descendant '::' '*'                           {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'todosNodos', [], 'absoluta');}
//nodos con predicados
    | id PREDICADOS                                 {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'nodo', $2);}
    | '*' PREDICADOS                                {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'todosNodos', $2);}
    | child '::' id PREDICADOS                      {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'nodo', $4);}
    | child '::' '*' PREDICADOS                     {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'todosNodos', $4);}
    | descendant '::' id PREDICADOS                 {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'nodo', $4, 'absoluta');}
    | descendant '::' '*' PREDICADOS                {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'todosNodos', $4, 'absoluta');}
//atributos
    | '@' id                                        {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'atributo', []);}
    | '@' '*'                                       {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'todosAtributos', []);}
    |  attribute '::' id                            {$$ = new Acceso(@2.first_line, @2.first_column, $3, 'atributo', []);}
    |  attribute '::' '*'                           {$$ = new Acceso(@2.first_line, @2.first_column, $3, 'todosAtributos', []);}
//atributos con predicados
    | '@' id PREDICADOS                             {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'atributo', $3);}
    | '@' '*' PREDICADOS                            {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'todosAtributos', $3);}
    |  attribute '::' id PREDICADOS                 {$$ = new Acceso(@2.first_line, @2.first_column, $3, 'atributo', $4);}
    |  attribute '::' '*' PREDICADOS                {$$ = new Acceso(@2.first_line, @2.first_column, $3, 'todosAtributos', $4);}
    |  error                                        {listaErrores.push(new ClaseError('Sintactico','Se esperaba la definicion de una etiqueta',@1.first_line, @1.first_column))}
    ;



PREDICADOS
    : PREDICADOS PREDI          {$1.push($2); $$ = $1;}
    | PREDI                     {$$ = [$1];}
    ;

PREDI
    : '[' EXP ']'               {$$ = $2;}
    ;
    
EXP 
    : EXP  '+'  EXP             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.SUMA, $2);}
    | EXP  '-'  EXP             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.RESTA, $2);}
    | EXP  '*'  EXP             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.MULT, $2);}
    | EXP 'div' EXP             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.DIV, $2);}
    | EXP 'mod' EXP             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.MOD, $2);}
    | EXP  '='  EXP             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.IGUAL, $2);}
    | EXP '!='  EXP             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.DIFERENCIACION, $2);}
    | EXP  '<'  EXP             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MENOR, $2);}
    | EXP '<='  EXP             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MENORIGUAL, $2);}
    | EXP  '>'  EXP             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MAYOR, $2);}
    | EXP '>='  EXP             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MAYORIGUAL, $2);}
    | EXP 'and' EXP             {$$ = new Logica(@2.first_line, @2.first_column, $1, $3, operacionLogica.AND, $2);}
    | EXP 'or'  EXP             {$$ = new Logica(@2.first_line, @2.first_column, $1, $3, operacionLogica.OR, $2);}
    | VALOR                     {$$ = $1;}
    ;
 
VALOR 
    
    : '(' EXP ')'               {$$ = $2;}
    | cadena                    {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.STRING);}
    | scadena                   {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.STRING);}
    | number                    {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.NUMBER);}
    | 'position' '(' ')'        {$$ = new Primitivo(@1.first_line, @1.first_column, $1);}
    | 'last' '(' ')'            {$$ = new Primitivo(@1.first_line, @1.first_column, $1);}
//sub consultas
    | LACCESOS                  {if($1[0].tipoQuery === undefined){$1[0].tipoQuery = 'relativa';}
                                 $$ = new Path(@1.first_line, @1.first_column, $1, 'sub');}
    | '//' LACCESOS             {if($2[0].tipoQuery === undefined){$2[0].tipoQuery ='relativa';}
                                 $$ = new Path(@1.first_line, @1.first_column, $2, 'sub');}
    ;











