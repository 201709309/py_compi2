<?xml version="1.0" encoding="ISO-8859-1"?>
<recursivas>
   <fact>7</fact>
   <fibo>17</fibo>
	<ack1>3</ack1>
  	<ack2>4</ack2>
</recursivas>


declare function local:funcionx1($integer as xs:integer ) as xs:double{
    if ($integer gt 1) then $integer * local:funcionx1($integer - 1) else 1
};


declare function local:funcionx2($num as xs:integer) as xs:integer {
    if ($num eq 0) then 0
    else if ($num eq 1) then 1
    else (local:funcionx2($num - 1) + local:funcionx2($num - 2))
};

declare function local:funcionx3($m as xs:integer,$n as xs:integer) as xs:integer
{
  if ($m = 0) then $n+1
  else if ($m gt 0 and $n=0) then local:funcionx3($m -1 , 1) 
  else local:funcionx3($m - 1, local:funcionx3($m, $n - 1))
};


local:funcionx3(/recursivas/ack1,/recursivas/ack2),
local:funcionx1(/recursivas/fact),
local:funcionx2(/recursivas/fibo)


        SALIDA:
            125
            5040
            1597