/* Gramatica Ascendente de XQUERY */

%{
    
%}

/* lexical grammar */
%lex
%options case-insensitive


%%
\s+                                         /* skip whitespace */
"("                                         return 'parea';
")"                                         return 'parec';
"$"                                         return 'dolar';
","                                         return 'coma';
"/"                                         return 'barra';
"{"                                         return 'corchetea';
"}"                                         return 'corchetec';
"@"                                         return 'arroba';

"="                                         return 'igual';
"!""="                                      return 'diferente';
"<"                                         return 'menor';
"<""="                                      return 'meigual';
">"                                         return 'mayor';
">""="                                      return 'maigual';

"f""o""r"                                   return 'for';
"i""n"                                      return 'in';
"d""o""c"                                   return 'doc';
"f""o""r"                                   return 'for';
"w""h""e""r""e"                             return 'where';
"o""r""d""e""r"                             return 'order';
"b""y"                                      return 'by';
"r""e""t""u""r""n"                          return 'return';
"l""e""t"                                   return 'let';
"i""f"                                      return 'if';
"t""h""e""n"                                return 'then';
"e""l""s""e"                                return 'else';
"d""a""t""a"                                return 'data';

(\"([^\"\\])*\")                            return 'dstring';
(\'([^\'\\])*\')                            return 'sstring';

([a-zA-Z_]|"á"|"é"|"í"|"ó"|"ú"|"Á"|"É"|"Í"|"Ó"|"Ú")("-"|[a-zA-Z0-9_ñÑ]|"á"|"é"|"í"|"ó"|"ú"|"Á"|"É"|"Í"|"Ó"|"Ú"|"'")*            return 'id';
(([0-9]+"."[0-9]+)|("."[0-9]+)|([0-9]+))    return 'number';
[^ ]+                                     return 'random';
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
    :   FOR LET WHERE ORDERBY RETURN EOF    {}
    |                                       {}
    ;

FOR 
    :   for dolar id in doc parea dstring parec PATH             {} 
    ;

PATH 
    :   PATH barra              {$$ = $1+$2}
    |   PATH id                 {$$ = $1+$2}
    |   barra                   {$$ = $1}
    |   id                      {$$ = $1}
    ;

LET 
    :   let           {}
    |
    ;

WHERE 
    :   where dolar id barra id COMPARISON number         {}
    |   where dolar id barra id COMPARISON id             {}
    |   {}
    ;

COMPARISON
    :   igual       {$$=$1}
    |   diferente   {$$=$1}
    |   menor       {$$=$1}
    |   meigual     {$$=$1}
    |   mayor       {$$=$1}
    |   maigual     {$$=$1}
    ;

ORDERBY 
    : order by RETVAR          {}
    |
    ;

RETURN 
    : return PARAMRETURN           {}
    ;

PARAMRETURN
    :   RETVAR   {}
    |   menor id mayor corchetea RETVAR corchetec menor barra id mayor {}
    |   menor id mayor corchetea data parea RETVAR parec corchetec menor barra id mayor {}
    |   IFTHENELSE  {}
    ;

IFTHENELSE
    :   IF THEN ELSE    {}
    ;

IF
    :   if  parea dolar id barra arroba id COMPARISON dstring parec  {}
    |   if  parea dolar id barra arroba id COMPARISON sstring parec  {}
    ;

THEN
    :   then menor id mayor corchetea RETVAR corchetec menor barra id mayor {}
    |   then menor id mayor corchetea data parea RETVAR parec corchetec menor barra id mayor {}
    ;

ELSE
    :   else menor id mayor corchetea RETVAR corchetec menor barra id mayor {}
    |   else menor id mayor corchetea data parea RETVAR parec corchetec menor barra id mayor {}
    ;

RETVAR
    :   dolar id barra id   {}
    |   dolar id    {}
    ;