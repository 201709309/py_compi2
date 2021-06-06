%{
    var tmp="";
%}

/* lexical grammar */
%lex
%options case-insensitive

%s string
%%
<INITIAL>["]        {this.begin('string'); tmp=""; /*saltarme al estado con nombre "string" */  }           

<string>[^"\\]    {tmp=tmp+yytext; this.begin('string');}
<string>[\\][n]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][t]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][r]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\]["]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][\\]  {tmp= tmp+yytext;   this.begin('string');}

<string>[\"]      {
                    this.begin('INITIAL');
                    yytext= tmp;
   
                    return 'cadena'
}
\s+                   /* skip whitespace */
(([0-9]+"."[0-9]+)|("."[0-9]+)|([0-9]+))    return 'number';

[>][^<]*[<]                                 return 'texto';
[a-zA-Z_][a-zA-Z0-9_ñÑ]*                    return 'id';

"<"                   return '<';                                 
">"                   return '>';
"/"                   return '/';
"="                   return '=';


                           


<<EOF>>               return 'EOF';
.    {console.log("no se reconoce el caracter: " + yytext+ "\n");};
/lex

%start INIT

%% /* language grammar */

INIT : 
    OBJECT EOF { }       
    ;
    
OBJECTS :
    OBJECTS OBJECT {}
    | OBJECT {} 
    ;

OBJECT : '<' 'id' 'texto' '/' 'id' '>' {console.log($3)}
    |    '<' 'id' '>' OBJECT '<' '/' 'id' '>' {}
    |  '<' 'id' '/' '>' {}
    ;