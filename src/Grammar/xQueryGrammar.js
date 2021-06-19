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
var xquerygrammar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[21,30,33],$V1=[30,33],$V2=[1,24],$V3=[9,17,33,36],$V4=[1,44],$V5=[1,45],$V6=[1,46],$V7=[1,47],$V8=[1,48],$V9=[1,49],$Va=[12,16,23,44],$Vb=[12,19,20,21,30,33];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INIT":3,"FOR":4,"LET":5,"WHERE":6,"ORDERBY":7,"RETURN":8,"EOF":9,"for":10,"dolar":11,"id":12,"in":13,"doc":14,"parea":15,"dstring":16,"parec":17,"PATH":18,"barra":19,"let":20,"where":21,"COMPARISON":22,"number":23,"igual":24,"diferente":25,"menor":26,"meigual":27,"mayor":28,"maigual":29,"order":30,"by":31,"RETVAR":32,"return":33,"PARAMRETURN":34,"corchetea":35,"corchetec":36,"data":37,"IFTHENELSE":38,"IF":39,"THEN":40,"ELSE":41,"if":42,"arroba":43,"sstring":44,"then":45,"else":46,"$accept":0,"$end":1},
terminals_: {2:"error",9:"EOF",10:"for",11:"dolar",12:"id",13:"in",14:"doc",15:"parea",16:"dstring",17:"parec",19:"barra",20:"let",21:"where",23:"number",24:"igual",25:"diferente",26:"menor",27:"meigual",28:"mayor",29:"maigual",30:"order",31:"by",33:"return",35:"corchetea",36:"corchetec",37:"data",42:"if",43:"arroba",44:"sstring",45:"then",46:"else"},
productions_: [0,[3,6],[3,0],[4,9],[18,2],[18,2],[18,1],[18,1],[5,1],[5,0],[6,7],[6,7],[6,0],[22,1],[22,1],[22,1],[22,1],[22,1],[22,1],[7,3],[7,0],[8,2],[34,1],[34,10],[34,13],[34,1],[38,3],[39,10],[39,10],[40,11],[40,14],[41,11],[41,14],[32,4],[32,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 4: case 5:
this.$ = $$[$0-1]+$$[$0]
break;
case 6: case 7:
this.$ = $$[$0]
break;
case 13: case 14: case 15: case 16: case 17: case 18:
this.$=$$[$0]
break;
}
},
table: [{1:[2,2],3:1,4:2,10:[1,3]},{1:[3]},o($V0,[2,9],{5:4,20:[1,5]}),{11:[1,6]},o($V1,[2,12],{6:7,21:[1,8]}),o($V0,[2,8]),{12:[1,9]},{7:10,30:[1,11],33:[2,20]},{11:[1,12]},{13:[1,13]},{8:14,33:[1,15]},{31:[1,16]},{12:[1,17]},{14:[1,18]},{9:[1,19]},{11:$V2,26:[1,22],32:21,34:20,38:23,39:25,42:[1,26]},{11:$V2,32:27},{19:[1,28]},{15:[1,29]},{1:[2,1]},{9:[2,21]},{9:[2,22]},{12:[1,30]},{9:[2,25]},{12:[1,31]},{40:32,45:[1,33]},{15:[1,34]},{33:[2,19]},{12:[1,35]},{16:[1,36]},{28:[1,37]},o($V3,[2,34],{19:[1,38]}),{41:39,46:[1,40]},{26:[1,41]},{11:[1,42]},{22:43,24:$V4,25:$V5,26:$V6,27:$V7,28:$V8,29:$V9},{17:[1,50]},{35:[1,51]},{12:[1,52]},{9:[2,26]},{26:[1,53]},{12:[1,54]},{12:[1,55]},{12:[1,57],23:[1,56]},o($Va,[2,13]),o($Va,[2,14]),o($Va,[2,15]),o($Va,[2,16]),o($Va,[2,17]),o($Va,[2,18]),{12:[1,60],18:58,19:[1,59]},{11:$V2,32:61,37:[1,62]},o($V3,[2,33]),{12:[1,63]},{28:[1,64]},{19:[1,65]},o($V1,[2,10]),o($V1,[2,11]),o([20,21,30,33],[2,3],{12:[1,67],19:[1,66]}),o($Vb,[2,6]),o($Vb,[2,7]),{36:[1,68]},{15:[1,69]},{28:[1,70]},{35:[1,71]},{43:[1,72]},o($Vb,[2,4]),o($Vb,[2,5]),{26:[1,73]},{11:$V2,32:74},{35:[1,75]},{11:$V2,32:76,37:[1,77]},{12:[1,78]},{19:[1,79]},{17:[1,80]},{11:$V2,32:81,37:[1,82]},{36:[1,83]},{15:[1,84]},{22:85,24:$V4,25:$V5,26:$V6,27:$V7,28:$V8,29:$V9},{12:[1,86]},{36:[1,87]},{36:[1,88]},{15:[1,89]},{26:[1,90]},{11:$V2,32:91},{16:[1,92],44:[1,93]},{28:[1,94]},{26:[1,95]},{26:[1,96]},{11:$V2,32:97},{19:[1,98]},{17:[1,99]},{17:[1,100]},{17:[1,101]},{9:[2,23]},{19:[1,102]},{19:[1,103]},{17:[1,104]},{12:[1,105]},{36:[1,106]},{45:[2,27]},{45:[2,28]},{12:[1,107]},{12:[1,108]},{36:[1,109]},{28:[1,110]},{26:[1,111]},{28:[1,112]},{28:[1,113]},{26:[1,114]},{46:[2,29]},{19:[1,115]},{9:[2,24]},{9:[2,31]},{19:[1,116]},{12:[1,117]},{12:[1,118]},{28:[1,119]},{28:[1,120]},{46:[2,30]},{9:[2,32]}],
defaultActions: {19:[2,1],20:[2,21],21:[2,22],23:[2,25],27:[2,19],39:[2,26],94:[2,23],100:[2,27],101:[2,28],110:[2,29],112:[2,24],113:[2,31],119:[2,30],120:[2,32]},
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
case 0:/* skip whitespace */
break;
case 1:return 15;
break;
case 2:return 17;
break;
case 3:return 11;
break;
case 4:return 'coma';
break;
case 5:return 19;
break;
case 6:return 35;
break;
case 7:return 36;
break;
case 8:return 43;
break;
case 9:return 24;
break;
case 10:return 25;
break;
case 11:return 26;
break;
case 12:return 27;
break;
case 13:return 28;
break;
case 14:return 29;
break;
case 15:return 10;
break;
case 16:return 13;
break;
case 17:return 14;
break;
case 18:return 10;
break;
case 19:return 21;
break;
case 20:return 30;
break;
case 21:return 31;
break;
case 22:return 33;
break;
case 23:return 20;
break;
case 24:return 42;
break;
case 25:return 45;
break;
case 26:return 46;
break;
case 27:return 37;
break;
case 28:return 16;
break;
case 29:return 44;
break;
case 30:return 12;
break;
case 31:return 23;
break;
case 32:return 'random';
break;
case 33:return 9;
break;
case 34:
                                        console.log('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                                    
break;
}
},
rules: [/^(?:\s+)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\$)/i,/^(?:,)/i,/^(?:\/)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:@)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:<=)/i,/^(?:>)/i,/^(?:>=)/i,/^(?:for\b)/i,/^(?:in\b)/i,/^(?:doc\b)/i,/^(?:for\b)/i,/^(?:where\b)/i,/^(?:order\b)/i,/^(?:by\b)/i,/^(?:return\b)/i,/^(?:let\b)/i,/^(?:if\b)/i,/^(?:then\b)/i,/^(?:else\b)/i,/^(?:data\b)/i,/^(?:("([^\"\\])*"))/i,/^(?:('([^\'\\])*'))/i,/^(?:([a-zA-Z_]|á|é|í|ó|ú|Á|É|Í|Ó|Ú)(-|[a-zA-Z0-9_ñÑ]|á|é|í|ó|ú|Á|É|Í|Ó|Ú|')*)/i,/^(?:(([0-9]+\.[0-9]+)|(\.[0-9]+)|([0-9]+)))/i,/^(?:[^ ]+)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],"inclusive":true}}
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
exports.parser = xquerygrammar;
exports.Parser = xquerygrammar.Parser;
exports.parse = function () { return xquerygrammar.parse.apply(xquerygrammar, arguments); };
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