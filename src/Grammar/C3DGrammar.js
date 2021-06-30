/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var C3dgrammar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,8],$V1=[25,35],$V2=[1,19],$V3=[1,25],$V4=[32,33],$V5=[30,35],$V6=[28,30],$V7=[1,52],$V8=[1,50],$V9=[1,51],$Va=[9,38,43,46,47,48],$Vb=[1,67],$Vc=[2,16],$Vd=[1,66],$Ve=[1,81],$Vf=[1,79],$Vg=[1,80],$Vh=[4,5,6,7,14,15,17,18,19,20,32],$Vi=[5,9,10];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"SIGNO":3,"+":4,"-":5,"*":6,"/":7,"VALOR":8,"id":9,"number":10,"[":11,"(":12,"int":13,")":14,"]":15,"COMPARACION":16,"=":17,"!":18,">":19,"<":20,"ASIGNACION":21,"INIT":22,"HEADER":23,"CONTENIDO":24,"EOF":25,"IMPORTS":26,"VARDEC":27,"#":28,".":29,"double":30,"TEMPDEC":31,";":32,",":33,"FUNCION":34,"void":35,"{":36,"CONTFUNC":37,"}":38,"ETIQUETA":39,"ETIQUETA2":40,"TEMPORAL":41,"IF":42,"return":43,"PRINTF":44,":":45,"goto":46,"if":47,"printf":48,"dstring":49,"char":50,"sstring":51,"$accept":0,"$end":1},
terminals_: {2:"error",4:"+",5:"-",6:"*",7:"/",9:"id",10:"number",11:"[",12:"(",13:"int",14:")",15:"]",17:"=",18:"!",19:">",20:"<",25:"EOF",28:"#",29:".",30:"double",32:";",33:",",35:"void",36:"{",38:"}",43:"return",45:":",46:"goto",47:"if",48:"printf",49:"dstring",50:"char",51:"sstring"},
productions_: [0,[3,1],[3,1],[3,1],[3,1],[8,1],[8,1],[8,2],[8,7],[8,4],[16,2],[16,2],[16,2],[16,2],[21,7],[21,4],[21,1],[22,3],[22,1],[23,2],[26,6],[26,8],[26,5],[26,7],[27,4],[27,3],[31,3],[31,6],[31,1],[31,4],[24,2],[24,1],[34,7],[37,2],[37,2],[37,2],[37,2],[37,3],[37,2],[37,5],[37,1],[37,1],[37,1],[37,2],[37,1],[37,4],[37,1],[41,6],[41,4],[39,2],[40,3],[42,9],[44,10],[44,10]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1: case 2: case 3: case 4: case 5: case 6: case 16:
this.$ = $$[$0]
break;
case 7: case 10: case 11: case 12: case 13:
this.$ = $$[$0-1]+$$[$0]
break;
case 8: case 14:
this.$ = $$[$0-6]+$$[$0-5]+$$[$0-4]+$$[$0-3]+$$[$0-2]+$$[$0-1]+$$[$0]
break;
case 9: case 15:
this.$ = $$[$0-3]+$$[$0-2]+$$[$0-1]+$$[$0]
break;
case 17:

        textoaux = texto;
        texto = "";
        Optim.GenerarGraphviz();
        textrep = Optim.textGraphviz;
        Optim.Reset();
        return {Optimizado: textoaux, TextGraphviz: textrep};
    
break;
case 20: case 22:
texto += "#" + $$[$0-3] + " <" + $$[$0-1] + ">\n";
break;
case 21: case 23:
texto += "#" + $$[$0-5] + " <" + $$[$0-3] + "." + $$[$0-1] + ">\n";
break;
case 24:

        texto += "double ";
        for(const key in $$[$0-1]) {
            texto += $$[$0-1][key];
        }
        texto += ";\n";
    
break;
case 25:

        texto += "\ndouble ";
        for(const key in $$[$0-1]) {
            texto += $$[$0-1][key];
        }
        texto += ";\n";
    
break;
case 26:
$$[$0-2].push(", "+$$[$0]);this.$=$$[$0-2];
break;
case 27:
$$[$0-5].push(", "+$$[$0-3]+"["+$$[$0-1]+"]");this.$=$$[$0-5];
break;
case 28:
this.$=[$$[$0]]
break;
case 29:
this.$=[$$[$0-3]+"["+$$[$0-1]+"]"];
break;
case 32:

        texto += "\n"+$$[$0-6]+" "+$$[$0-5]+$$[$0-4]+$$[$0-3]+" "+$$[$0-2]+"\n";
        for (const key in $$[$0-1]) {
            texto += $$[$0-1][key];
        }
        texto += $$[$0]+"\n";
    
break;
case 33: case 34: case 35: case 36: case 38:
$$[$0-1].push($$[$0]);this.$=$$[$0-1];
break;
case 37:
$$[$0-2].push($$[$0-1]+$$[$0]+"\n");this.$=$$[$0-2];
break;
case 39:
$$[$0-4].push($$[$0-3]+"();\n");this.$=$$[$0-4];
break;
case 40: case 41: case 42: case 44: case 46:
this.$ = $$[$0];
break;
case 43: case 49:
this.$=[$$[$0-1]+$$[$0]+"\n"];
break;
case 45:
this.$=[$$[$0-3]+"();\n"];
break;
case 47:

        this.$ = [Optim.Optimizar(new Asignacion($$[$0-5],$$[$0-3],$$[$0-2],$$[$0-1]))];
    
break;
case 48:
this.$=[$$[$0-3]+" "+$$[$0-2]+" "+$$[$0-1]+$$[$0]+"\n"];
break;
case 50:
this.$=[$$[$0-2]+" "+$$[$0-1]+$$[$0]+"\n"];
break;
case 51:
this.$=[$$[$0-8]+$$[$0-7]+$$[$0-6]+$$[$0-5]+$$[$0-4]+$$[$0-3]+" "+$$[$0-2]+" "+$$[$0-1]+$$[$0]+"\n"];
break;
case 52: case 53:
this.$=[$$[$0-9]+$$[$0-8]+$$[$0-7]+$$[$0-6]+" "+$$[$0-5]+$$[$0-4]+$$[$0-3]+$$[$0-2]+$$[$0-1]+$$[$0]+"\n"];
break;
}
},
table: [{22:1,23:2,25:[1,3],26:4,28:[1,5]},{1:[3]},{24:6,34:7,35:$V0},{1:[2,18]},{27:9,28:[1,10],30:[1,11]},{9:[1,12]},{25:[1,13],34:14,35:$V0},o($V1,[2,31]),{9:[1,15]},{30:[1,16],35:[2,19]},{9:[1,17]},{9:$V2,31:18},{20:[1,20]},{1:[2,17]},o($V1,[2,30]),{12:[1,21]},{9:$V2,31:22},{20:[1,23]},{32:[1,24],33:$V3},o($V4,[2,28],{11:[1,26]}),{9:[1,27]},{14:[1,28]},{32:[1,29],33:$V3},{9:[1,30]},o($V5,[2,25]),{9:[1,31]},{10:[1,32]},{19:[1,33],29:[1,34]},{36:[1,35]},o($V5,[2,24]),{19:[1,36],29:[1,37]},o($V4,[2,26],{11:[1,38]}),{15:[1,39]},o($V6,[2,22]),{9:[1,40]},{9:[1,47],21:49,37:41,39:42,40:48,41:43,42:44,43:[1,45],44:46,46:$V7,47:$V8,48:$V9},o($V6,[2,20]),{9:[1,53]},{10:[1,54]},o($V4,[2,29]),{19:[1,55]},{9:[1,63],21:49,38:[1,56],39:57,40:58,41:59,42:60,43:[1,61],44:62,46:$V7,47:$V8,48:$V9},o($Va,[2,40]),o($Va,[2,41]),o($Va,[2,42]),{32:[1,64]},o($Va,[2,44]),{11:$Vb,12:[1,65],17:$Vc,45:$Vd},o($Va,[2,46]),{17:[1,68]},{12:[1,69]},{12:[1,70]},{9:[1,71]},{19:[1,72]},{15:[1,73]},o($V6,[2,23]),o($V1,[2,32]),o($Va,[2,33]),o($Va,[2,34]),o($Va,[2,35]),o($Va,[2,36]),{32:[1,74]},o($Va,[2,38]),{11:$Vb,12:[1,75],17:$Vc,45:$Vd},o($Va,[2,43]),{14:[1,76]},o($Va,[2,49]),{5:$Ve,8:78,9:$Vf,10:$Vg,12:[1,77]},{5:$Ve,8:82,9:$Vf,10:$Vg},{5:$Ve,8:83,9:$Vf,10:$Vg},{49:[1,84],51:[1,85]},{32:[1,86]},o($V6,[2,21]),o($V4,[2,27]),o($Va,[2,37]),{14:[1,87]},{32:[1,88]},{13:[1,89]},{15:[1,90]},o($Vh,[2,5],{11:[1,91]}),o($Vh,[2,6]),{10:[1,92]},{3:93,4:[1,95],5:[1,96],6:[1,97],7:[1,98],32:[1,94]},{16:99,17:[1,100],18:[1,101],19:[1,102],20:[1,103]},{33:[1,104]},{33:[1,105]},o($Va,[2,50]),{32:[1,106]},o($Va,[2,45]),{14:[1,107]},{17:[2,15]},{5:$Ve,8:109,9:$Vf,10:$Vg,12:[1,108]},o($Vh,[2,7]),{5:$Ve,8:110,9:$Vf,10:$Vg},o($Va,[2,48]),o($Vi,[2,1]),o($Vi,[2,2]),o($Vi,[2,3]),o($Vi,[2,4]),{5:$Ve,8:111,9:$Vf,10:$Vg},{17:[1,112]},{17:[1,113]},{17:[1,114]},{17:[1,115]},{12:[1,116]},{12:[1,117]},o($Va,[2,39]),{5:$Ve,8:118,9:$Vf,10:$Vg},{13:[1,119]},{15:[1,120]},{32:[1,121]},{14:[1,122]},o($Vi,[2,10]),o($Vi,[2,11]),o($Vi,[2,12]),o($Vi,[2,13]),{50:[1,123]},{50:[1,124]},{15:[1,125]},{14:[1,126]},o($Vh,[2,9]),o($Va,[2,47]),{46:[1,127]},{14:[1,128]},{14:[1,129]},{17:[2,14]},{5:$Ve,8:130,9:$Vf,10:$Vg},{9:[1,131]},{5:$Ve,8:132,9:$Vf,10:$Vg},{5:$Ve,8:133,9:$Vf,10:$Vg},{15:[1,134]},{32:[1,135]},{14:[1,136]},{14:[1,137]},o($Vh,[2,8]),o($Va,[2,51]),{32:[1,138]},{32:[1,139]},o($Va,[2,52]),o($Va,[2,53])],
defaultActions: {3:[2,18],13:[2,17],90:[2,15],125:[2,14]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const {Asignacion} = require("../Optimizador/Asignacion");
    const {OptimizadorMirilla} = require("../Optimizador/OptimizadorMirilla");
    var texto = "";
    var textoaux = "";
    var Optim = new OptimizadorMirilla();
    var textrep = "";
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/*skip single line comments*/
break;
case 1:/*skip multi line comments*/
break;
case 2:/* skip whitespace */
break;
case 3:return 45;
break;
case 4:return 17;
break;
case 5:return 4;
break;
case 6:return 5;
break;
case 7:return 6;
break;
case 8:return 7;
break;
case 9:return 32;
break;
case 10:return 28;
break;
case 11:return 20;
break;
case 12:return 19;
break;
case 13:return 29;
break;
case 14:return 11;
break;
case 15:return 15;
break;
case 16:return 33;
break;
case 17:return 12;
break;
case 18:return 14;
break;
case 19:return 36;
break;
case 20:return 38;
break;
case 21:return 18;
break;
case 22:return '%';
break;
case 23:return 30;
break;
case 24:return 35;
break;
case 25:return 43;
break;
case 26:return 13;
break;
case 27:return 47;
break;
case 28:return 46;
break;
case 29:return 48;
break;
case 30:return 50;
break;
case 31:return 49;
break;
case 32:return 51;
break;
case 33:return 9;
break;
case 34:return 10;
break;
case 35:return 'random';
break;
case 36:return 25;
break;
case 37:
                                        console.log('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                                    
break;
}
},
rules: [/^(?:[/][/][^\n]*)/i,/^(?:[/][*][^*/]*[*][/])/i,/^(?:\s+)/i,/^(?::)/i,/^(?:=)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:;)/i,/^(?:#)/i,/^(?:<)/i,/^(?:>)/i,/^(?:\.)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:,)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\{)/i,/^(?:\})/i,/^(?:!)/i,/^(?:%)/i,/^(?:double\b)/i,/^(?:void\b)/i,/^(?:return\b)/i,/^(?:int\b)/i,/^(?:if\b)/i,/^(?:goto\b)/i,/^(?:printf\b)/i,/^(?:char\b)/i,/^(?:("([^\"\\])*"))/i,/^(?:('([^\'\\])*'))/i,/^(?:([a-zA-Z_]|á|é|í|ó|ú|Á|É|Í|Ó|Ú)(-|[a-zA-Z0-9_ñÑ]|á|é|í|ó|ú|Á|É|Í|Ó|Ú|')*)/i,/^(?:(([0-9]+\.[0-9]+)|(\.[0-9]+)|([0-9]+)))/i,/^(?:[^<> ]+)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = C3dgrammar;
exports.Parser = C3dgrammar.Parser;
exports.parse = function () { return C3dgrammar.parse.apply(C3dgrammar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}