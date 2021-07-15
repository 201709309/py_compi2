declare function local:aritmeticas($valor1 as xs:decimal,$valor2 as xs:decimal)
as xs:decimal
{
let $resultado := ($valor1 * $valor2) div 100

return $resultado
};

declare function local:relacional($valor1 as xs:decimal,$valor2 as xs:decimal)
as xs:boolean
{
let $resultado := ($valor1 eq $valor2) = ($valor1 ne $valor2)
let $resultado2 := ($valor1 gt $valor2) != ($valor1 lt $valor2)

return $resultado = $resultado2
};


declare function local:logicas($valor1 as xs:decimal)
as xs:decimal
{

if($valor1 > 1 and $valor1 lt 10) then $valor1*10
else if($valor1 = 10 or $valor1=20) then ($valor1 div 2)
else $valor1

};


local:aritmeticas(100,200),
local:relacional(100,200),
local:logicas(1)






SALIDA:
    200
    false
    1