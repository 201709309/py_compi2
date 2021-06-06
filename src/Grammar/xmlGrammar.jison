/* description: Parses end executes mathematical expressions. */

%{
    const {Objeto} = require("../xmlAST/Objeto");
    const {Atributo} = require("../xmlAST/Atributo");
%}

/* lexical grammar */
%lex
%options case-insensitive


%%
\s+                                         /* skip whitespace */

[<][!][-][-][^-<]*[-][-][>]                 /*skip comments*/

"<"                                         return '<';
">"                                         return '>';
"/"                                         return '/';
"="                                         return '=';
"?"                                         return '?';

(\"([^\"\\])*\")                            return 'dstring';
(\'([^\'\\])*\')                            return 'sstring';
[a-zA-Z_][a-zA-Z0-9_ñÑ]*                    return 'id';
(([0-9]+"."[0-9]+)|("."[0-9]+)|([0-9]+))    return 'number';


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
    :  '<' '?' id LISTAATRIBUTOS '?' '>' INTRO    { return $7;}
    |  INTRO                                      { return $1;}
    ;

INTRO   :  INTRO NODO EOF           { $1.push($2); $$ = $1; }
        |  NODO CHECK               { $$ = [$1]; }
    ;

CHECK
    : EOF               {}
    |                   {}
    ;

NODO
    :    '<' id LISTAATRIBUTOS '>' LISTANODOS '<' '/' id '>'    {$$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5);}
    |    '<' id LISTAATRIBUTOS '>' NODOTEXTO '<' '/' id '>'     {$$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[]);}
    |    '<' id LISTAATRIBUTOS '/' '>'                          {$$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[]);}
    |    '<' id  '>' LISTANODOS '<' '/' id '>'                  {$$ = new Objeto($2,'',@1.first_line, @1.first_column,[],$4);}
    |    '<' id  '>' NODOTEXTO '<' '/' id '>'                   {$$ = new Objeto($2,$4,@1.first_line, @1.first_column,[],[]);}
    |    '<' id  '/' '>'                                        {$$ = new Objeto($2,'',@1.first_line, @1.first_column,[],[]);}
    ;

LISTANODOS
    : LISTANODOS NODO   { $1.push($2); $$ = $1;}
    | NODO              { $$ = [$1]; }
    ;

LISTAATRIBUTOS
    : LISTAATRIBUTOS ATRIBUTO   { $1.push($2); $$ = $1;}
    | ATRIBUTO                  { $$ = [$1]; }
    ;

ATRIBUTO
    : id '=' sstring    { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); }
    | id '=' dstring    { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); }
    ;

NODOTEXTO : NODOTEXTO dstring       { $$ = $1 +" "+ $2 }
    | NODOTEXTO sstring             { $$ = $1 +" "+ $2 }
    | NODOTEXTO id                  { $$ = $1 +" "+ $2 }
    | NODOTEXTO number              { $$ = $1 +" "+ $2 }
    | NODOTEXTO random              { $$ = $1 +" "+ $2 }
    | NODOTEXTO '/'                 { $$ = $1 +" "+ $2 }
    | NODOTEXTO '='                 { $$ = $1 +" "+ $2 }
    | dstring                       { $$ = $1 }
    | sstring                       { $$ = $1 }
    | id                            { $$ = $1 }
    | number                        { $$ = $1 }
    | random                        { $$ = $1 }
    | '/'                           { $$ = $1 }
    | '='                           { $$ = $1 }
    ;