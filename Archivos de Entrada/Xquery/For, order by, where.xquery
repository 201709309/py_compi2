Consulta 1  (Archivos Discos)

    for $x in /CATALOG/CD/PRICE/../../CD
    where $x/price=25.10 or $x/price=25.20 
    order by $x/title
    return $x/title

    SALIDA: 

        <TITLE>"Esto tiene que salir bien"</TITLE>
        <TITLE>'Esto tiene que salir muy bien tambien'</TITLE>
        <TITLE>Eros & Eros</TITLE>

Consulta 2 (Archivo Discos)

    let $x := /catalog/cd/country
    return $x

    SALIDA:

        <COUNTRY>USA</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>USA</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>EU</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>EU</COUNTRY>
        <COUNTRY>USA</COUNTRY>
        <COUNTRY>EU</COUNTRY>
        <COUNTRY>USA</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>USA</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>Norway</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>EU</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>USA</COUNTRY>
        <COUNTRY>EU</COUNTRY>
        <COUNTRY>UK</COUNTRY>
        <COUNTRY>USA</COUNTRY>


Consulta 3
    for $x in (10,20), $y in (100,200)
    return <test>x={$x} and y={$y}</test>

    SALIDA:
        <test>x=10 and y=100</test>
        <test>x=10 and y=200</test>
        <test>x=20 and y=100</test>
        <test>x=20 and y=200</test>

Consulta 4
    for $x in (1 to 5)
    return <test>{$x}</test>

    SALIDA:
        <test>{$1}</test>
        <test>{$2}</test>
        <test>{$3}</test>
        <test>{$4}</test>
        <test>{$5}</test>


Consulta 5 (Archivo Libros)
    for $x in /catalog/book
        return if ($x/@id="bk101")
        then <child>{data($x/title)}</child>
        else <adult>{data($x/title)}</adult>

    SALIDA:

        <child>XML Developer&apos;s Guide</child>
        <child>Midnight Rain</child>
        <child>Maeve Ascendant</child>
        <child>Oberon&apos;s Legacy</child>
        <adult>The Sundered Grail</adult>
        <adult>Lover Birds</adult>
        <adult>Splish Splash</adult>
        <child>Creepy Crawlies</child>
        <adult>Paradox Lost</adult>
        <adult>Microsoft .NET: The Programming Bible</adult>
        <adult>MSXML3: A Comprehensive Guide</adult>
        <child>Visual Studio 7: A Comprehensive Guide</child>

Consulta 6  (Archivo Libros)

    for $x at $i in /catalog/book
    order by $x/@id, $x/title
    return <libro>{$i}. {data($x/title)}</libro>

    SALIDA:
        <libro>8. Creepy Crawlies</libro>
        <libro>3. Maeve Ascendant</libro>
        <libro>2. Midnight Rain</libro>
        <libro>4. Oberon&apos;s Legacy</libro>
        <libro>12. Visual Studio 7: A Comprehensive Guide</libro>
        <libro>1. XML Developer&apos;s Guide</libro>
        <libro>5. The Sundered Grail</libro>
        <libro>6. Lover Birds</libro>
        <libro>7. Splish Splash</libro>
        <libro>9. Paradox Lost</libro>
        <libro>10. Microsoft .NET: The Programming Bible</libro>
        <libro>11. MSXML3: A Comprehensive Guide</libro>
