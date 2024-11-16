const abs = (x) => Math.abs(x)

const sin = (x) => Math.sin(x)
const cos = (x) => Math.cos(x)
const tan = (x) => Math.tan(x)
const cot = (x) => 1 / Math.tan(x)
const sec = (x) => 1 / Math.cos(x)
const csc = (x) => 1 / Math.sin(x)

const sh = (x) => Math.sinh(x)
const ch = (x) => Math.cosh(x)
const th = (x) => Math.tanh(x)
const cth = (x) => 1 / Math.tanh(x)
const sch = (x) => 1 / ch(x)
const csch = (x) => 1 / sh(x)

const asin = (x) => Math.asin(x)
const acos = (x) => Math.acos(x)
const atan = (x) => Math.atan(x)
const acot = (x) => Math.atan(-x) + Math.PI / 2
const asec = (x) => acos(1 / x)
const acsc = (x) => asin(1 / x)
const line = (x, k=1, b=0)=> k*x+b
const quad = (x,a=1,b=0,c=0)=> a*x**2 + b*x + c
const hyp=(x, k=1, n=1, b=0)=> k/(x**n)+b

const rad = (x) => Math.PI * x / 180
const deg = (x) => x * 180 / Math.PI

const lim = (f, to) => 
{
    try
    {
        return f(to)
    }
    catch
    {
        return f(to+0.000001)
    }
}


const fac = (x) => {
    if (x > 1) {
        return x * fac(x - 1)
    } else {
        return 1
    }
}

const dfac = (x) => {
    let s = 1
    for (let i = 1; i <= x; i++) {
        if (x % 2 === 0 && i % 2 === 0) {
            s *= i
        } else if (x % 2 !== 0 && i % 2 !== 0) {
            s *= i
        }

    }
    return s;
}
const sfac = (x) => {
    return Math.ceil((fac(x) + 1) / Math.E)
}

const A = (n, k) => {
    return fac(n) / fac(n - k)
}
const A_ = (n, k) => {
    return n ** k;
}
const P = fac

const C = (n, m) => {
    return fac(n) / (fac(n - m) * fac(m))
}
const C_ = (n, m) => {
    return C(n, n + m - 1)

}
const P_ = (x) => {
    let s = 0
    for (const x1 in x) {
        s += x1

    }
    let res = 1
    for (const n in x) {
        res *= fac(n)
    }
    return fac(s) / res
}

const func = (f, roots = [100, -100, 0]) => {
    let s = []
    for (const i in roots) {
        let x = i
        for (let j = 0; j < 1000; j++) {
            x = x - f(x) / ((f(x + 8e-11) - f(x)) / 8e-11)
        }
        if (!s.includes(x))
            s.push(x)
    }
    return s.sort()
}

const equation = (func, eq, roots = [100, -100, 0]) => {
    return func((x) => func(x) - Function(eq)(x), roots)
}

const log = (a, b) => Math.log(a) / Math.log(b)

const log2 = (x) => log(x, 2)

const log10 = (x) => log(x, 10)
const ln = (x) => Math.log(x)

const iroot = (x, y) => {
    let s = 100
    for (let i = 0; i < 1000; i++) {
        s = 1 / y * ((y - 1) * s + x / (s ** (y - 1)))
    }
    return s
}
const sqrt = (x) => iroot(x, 2)
const cbrt = (x) => iroot(x, 3)

const pow = (x, y) => Math.pow(x, y)

const polarx = (x, f) => cos(rad(f)) * x
const polary = (x, f) => sin(rad(f)) * x

const isprime = (x) => {
    for (let i = 1; i < x / 2; i++) {
        if (x % i === 0) {
            return false
        }
    }
    return true
}
const nextprime = (x) => {
    while (!isprime(x)) {
        if (isprime(x)) {
            return x
        }
        x++
    }
}
const previousprime = (x) => {
    while (!isprime(x) && x > 1) {
        if (x <= 1) {
            return 2
        }
        if (isprime(x)) {
            return x
        }
        x++
    }
}

const d = (y, point) => {
    return y(point + 8e-11) - y(point)
}

const diff = (f, p, vr) => d(f, p) / d(vr, p)

const diffx = (f, p) => d(f, p) / 8e-11

const integral = (f, a, b, prec = 0.001) => {
    let s = 0
    let mn = Math.min(a, b)
    let mx = Math.max(a, b)
    while (mn <= mx) {
        s += f(mn)
        mn += prec
    }
    return s * prec
}
const Dintegral = (f, a, b, f1, f2, prec = 0.001) => {
    let s = 0
    let mn = Math.min(a, b)
    let mx = Math.max(a, b)
    let y1, y2

    while (mn <= mx) {
        if (typeof f1 == 'function') {
            y1 = f1(mn)
        } else {
            y1 = f1
        }
        if (typeof f2 === 'function') {
            y2 = f2(mn)
        } else {
            y2 = f2
        }
        while (y1 <= y2) {
            s += f(mn, y1)
            y1 += prec
        }
        mn += prec
    }
    return s * prec ** 2
}

const C1integral = (func, a, b, type, line, prec = 0.001) => {
    if (type === "1") {
        // parametric (param)
        let f1 = line[0]
        let f2 = line[1]
        let df = (t) => sqrt(diffx(f1, t) ** 2 + diffx(f2, t) ** 2)
        return integral((t) => func(f1(t), f2(t)) * df(t), a, b, prec)
    } else if (type === "2") {
        //basic (ybase)
        let f2 = line
        let df = (x) => sqrt(1 + diffx(f2, x) ** 2)
        return integral((x) => func(x, f2(x)) * df(x), a, b, prec)
    } else if (type === "3") {
        //basic (xbase)
        let f2 = line
        let df = (x) => sqrt(1 + diffx(f2, x) ** 2)
        return integral((x) => func(f2(x), x) * df(x), a, b, prec)
    } else if (type === "4") {
        // polar
        let f2 = line
        let df = (x) => sqrt(f2(x) ** 2 + diffx(f2, x) ** 2)
        return integral((f) => func(f2(f) * cos(f), f2(f) * sin(f)) * df(f), a, b, prec)
    } else {
        return null
    }


}
const C2integral = (func1, func2, a, b, type, line, prec = 0.001) => {
    if (type === "1") {
        // y = g(x)
        let f = line
        let df = (x) => diffx(f, x)
        return integral((x) => func1(x, f(x)) + func2(x, f(x)) * df(x), a, b, prec)
    } else if (type === "2") {
        // x = f(y)
        let f = line
        let df = (x) => diffx(f, x)
        return integral((y) => func1(f(y), y) * df(y) + func2(f(y), y), a, b, prec)
    } else if (type === "3") {
        //param
        let f1 = line[0]
        let f2 = line[1]
        let df1 = (x) => diffx(f1, x)
        let df2 = (x) => diffx(f2, x)
        return integral((t) => func1(f1(t), f2(t)) * df1(t) + func2(f1(t), f2(t)) * df2(t), a, b, prec)
    }

}

const CCintegral = (func1, func2, line, prec = 0.001) => {
    let f1 = line[0]
    let f2 = line[1]
    let x1 = line[2]
    let x2 = line[3]
    let dfy = (x, y) => (func1(x, y + 8e-11) - func(x, y)) / 8e-11
    let dfx = (x, y) => (func2(x + 8e-11, y) - func(x, y)) / 8e-11
    return Dintegral((x, y) => dfx(x, y) - dfy(x, y), x1, x2, f1, f2, prec)

}


const gamma = (z) => {
    if (z < 1) {
        return gamma(z + 1) / z
    } else if (z > 2) {
        return (z - 1) * gamma(z - 1)
    } else {
        const polla = (x) => { //полином 8 степени
            let s = 0
            let a = [-1.71618513886549492533811e+0,
                2.47656508055759199108314e+1,
            -3.79804256470945635097577e+2,
                6.29331155312818442661052e+2,
                8.66966202790413211295064e+2,
            -3.14512729688483675254357e+4,
            -3.61444134186911729807069e+4,
                6.64561438202405440627855e+4]
            for (let i = 1; i < 9; i++) {
                s += a[i - 1] * x ** i
            }
            return s
        }
        const pollb = (x) => { //полином 8 степени
            let s = 0
            let b = [-3.08402300119738975254353e+1,
                3.15350626979604161529144e+2,
            -1.01515636749021914166146e+3,
            -3.10777167157231109440444e+3,
                2.25381184209801510330112e+4,
                4.75584627752788110767815e+3,
            -1.34659959864969306392456e+5,
            -1.15132259675553483497211e+5]
            for (let i = 1; i < 9; i++) {
                s += b[i - 1] * x ** (i - 1)
            }
            return s + x ** 8
        }
        return 1 + polla(z - 1) / pollb(z - 1)

    }
}
const lgamma = (z) => {
    return ln(gamma(z))
}

const betta = (x, y) => {
    return gamma(x) * gamma(y) / gamma(x + y)
}
const bettax = (a, b, x) => {
    return integral((t) => t ** (a - 1) * (1 - t) ** (b - 1), 0, x)
}


class Matrix {


    constructor(array) {
        this._ar = array
        this._row = array.length
        this._col = array[0].length

    }

    minor(arr, i, j) {
        if (arr[0].length === arr.length) {
            delete arr[i]
            let mass = []
            for (let k = 0; k < arr[0].length; k++) {
                let s = []
                for (let l = 0; l < arr.length; l++) {
                    s.push(arr[l][k])

                }
                mass.push(s)

            }
            arr = mass
            delete arr[j]
            mass = []
            for (let k = 0; k < arr[0].length; k++) {
                let s = []
                for (let l = 0; l < arr.length; l++) {
                    s.push(arr[l][k])

                }
                mass.push(s)

            }
            arr = mass
            if (arr.length === 2) {
                return arr[0][0] * arr[1][1] - arr[1][0] * arr[0][1]
            } else {
                return this.minor(arr, i, j)
            }

        }
    }

    isQuad() {
        return this._row === this._col
    }
    addition(i, j) {
        return (-1) ** (i + j) * this.minor()
    }
}


// --------------------------------------------------------------------

const inDiv = document.getElementById('in')
const outDiv = document.getElementById('out')
let str = ''
let copy1 = ''
let delet = 84

function record(string) {
    if (string === "qq1") {
        str += "'"
    } else if (string === "qq2") {
        str += '"'
    } else
        str += string
    if (str.length > delet) {
        str += "\n"
        delet += 84
    }
    inDiv.innerHTML = str
    try {
        outDiv.innerHTML = "= " + eval(str)
    } catch (e) {
        outDiv.innerHTML = '= ...'
    }

}

function copy() {
    copy1 = inDiv.innerHTML
}

function copy2() {
    try {
        copy1 = eval(str)
    } catch (e) {
        copy1 = str
    }
}

function paste() {
    str += copy1
    inDiv.innerHTML = str
    try {
        outDiv.innerHTML = "= " + eval(str)
    } catch (e) {
        outDiv.innerHTML = '= ...'
    }
}

function clearing() {
    str = ''
    inDiv.innerHTML = str
    outDiv.innerHTML = '= ...'

}

function back() {
    if (str.length > 1) {
        str = str.substring(0, str.length - 1)
    } else {
        str = ''
    }
    inDiv.innerHTML = str
    try {
        let a = eval(str)
        if (a === undefined) {
            a = "..."
        }
        outDiv.innerHTML = "= " + a
    } catch (e) {
        if (str.length === 0)
            outDiv.innerHTML = '= ...'
        outDiv.innerHTML = '= ...'

    }

}

const basestr = `<div onclick="record('.')" class="button">.</div>
<div onclick="record(',')" class="button">,</div>
<div onclick="record('qq1')" class="button">'</div>
<div onclick="record('7')" id="num" class="button">7</div>
<div onclick="record('8')" id="num" class="button">8</div>
<div onclick="record('9')" id="num" class="button">9</div>
<div onclick="record('+')" id="op" class="button">+</div>
<div onclick="record('@')" id="op" class="button">@</div>

<div onclick="record('(x)=>')" class="button">(x)</div>
<div onclick="record('x')" class="button">x</div>
<div onclick="record('qq2')" class="button">"</div>
<div onclick="record('4')" id="num" class="button">4</div>
<div onclick="record('5')" id="num" class="button">5</div>
<div onclick="record('6')" id="num" class="button">6</div>
<div onclick="record('-')" id="op" class="button">-</div>
<div onclick="record('%')" id="op" class="button">%</div>

<div onclick="record('<')" class="button">&lt;</div>
<div onclick="record('>')" class="button">&gt;</div>
<div onclick="record('!=')" class="button">&ne;</div>
<div onclick="record('1')" id="num" class="button">1</div>
<div onclick="record('2')" id="num" class="button">2</div>
<div onclick="record('3')" id="num" class="button">3</div>
<div onclick="record('*')" id="op" class="button">*</div>
<div onclick="record('**')" id="op" class="button">**</div>

<div onclick="record('<=')" class="button">&le;</div>
<div onclick="record('>=')" class="button">&ge;</div>
<div onclick="record('=')" class="button">&equals;</div>
<div onclick="record('(')" id="num" class="button">(</div>
<div onclick="record('0')" id="num" class="button">0</div>
<div onclick="record(')')" id="num" class="button">)</div>
<div onclick="record('/')" id="op" class="button">/</div>
<div onclick="record('/\/')" id="op" class="button">//</div>`
let boolabs = false
let boolfun = false
let boolsin = false
let booldy = false
let boolm = false
let boolv = false

const ABCs = `<div onclick="record('a')" class="button">a</div>
            <div onclick="record('b')" class="button">b</div>
            <div onclick="record('c')" class="button">c</div>
            <div onclick="record('d')" class="button">d</div>
            <div onclick="record('e')" class="button">e</div>
            <div onclick="record('f')" class="button">f</div>
            <div onclick="record('g')" class="button">g</div>
            <div onclick="record('h')" class="button">h</div>

            <div onclick="record('i')" class="button">i</div>
            <div onclick="record('j')" class="button">j</div>
            <div onclick="record('k')" class="button">k</div>
            <div onclick="record('l')" class="button">l</div>
            <div onclick="record('m')" class="button">m</div>
            <div onclick="record('n')" class="button">n</div>
            <div onclick="record('o')" class="button">o</div>
            <div onclick="record('p')" class="button">p</div>

            <div onclick="record('q')" class="button">q</div>
            <div onclick="record('r')" class="button">r</div>
            <div onclick="record('s')" class="button">s</div>
            <div onclick="record('t')" class="button">t</div>
            <div onclick="record('u')" class="button">u</div>
            <div onclick="record('v')" class="button">v</div>
            <div onclick="record('w')" class="button">w</div>
            <div onclick="record('x')" class="button">x</div>

            <div onclick="record('y')" class="button">y</div>
            <div onclick="record('z')" class="button">z</div>
            <div onclick="record('&alpha;')"  class="button">&alpha;</div>
            <div onclick="record('&betta;')"  class="button">&beta;</div>
            <div onclick="record('&pi;')"     class="button">&pi;</div>
            <div onclick="record(')')"   class="button"> </div>
            <div onclick="record('/')"   class="button"> </div>
            <div onclick="record('/\/')" class="button"> </div>`

const Funs = `<div onclick="record('abs(')" class="button">abs</div>
            <div onclick="record('line(')" class="button">line</div>
            <div onclick="record('fac(')" class="button">x!</div>
            <div onclick="record('dfac(')" class="button">x!!</div>
            <div onclick="record('sfac(')" class="button">!x</div>
            <div onclick="record('prim(')" class="button">pr(x)</div>
            <div onclick="record('quad(')" class="button">x<sup>2</sup></div>
            <div onclick="record('hyp(')" class="button">1/x</div>

            <div onclick="record('A(')" class="button">A<sup>a</sup><sub>b</sub></div>
            <div onclick="record('Ar(')" class="button">A<sup>a</sup><sub>b</sub>_</div>
            <div onclick="record('P(')" class="button">P<sub>x</sub></div>
            <div onclick="record('Pr(')" class="button">P<sub>x</sub>_</div>
            <div onclick="record('C(')" class="button">C<sup>m</sup><sub>n</sub></div>
            <div onclick="record('Cr(')" class="button">C<sup>m</sup><sub>n</sub>_</div>
            <div onclick="record('func(')" class="button">f(x)</div>
            <div onclick="record('equation(')" class="button">f(x)=c</div>

            <div onclick="record('log(')" class="button">log<sub>a</sub>(x)</div>
            <div onclick="record('log2(')" class="button">log<sub>2</sub>(x)</div>
            <div onclick="record('log10(')" class="button">log<sub>10</sub>(x)</div>
            <div onclick="record('ln(')" class="button">ln(x)</div>
            <div onclick="record('sqrt(')" class="button"><sup></sup>&Sqrt;x</div>
            <div onclick="record('cbrt(')" class="button"><sup>3</sup>&Sqrt;x</div>
            <div onclick="record('iroot(')" class="button"><sup>y</sup>&Sqrt;x</div>
            <div onclick="record('pow(')" class="button">a<sup>b</sup></div>

            <div onclick="record('polarx(')" class="button">plrx(x)</div>
            <div onclick="record('polary(')" class="button">plry(y)</div>
            <div onclick="record('isprime(')" class="button">isprime(</div>
            <div onclick="record('nextprime(')" class="button">npr(</div>
            <div onclick="record('previousprime(')" class="button">ppr(</div>
            <div onclick="record('binom(')" class="button">b(x,y,n)</div>
            <div onclick="record('binomx(74g')" class="button">bx(x,n)</div>
            <div onclick="record('')" class="button"> </div>`


const sinc = `<div onclick="record('sin(')" class="button">sin(x)</div>
            <div onclick="record('tan(')" class="button">tan(x)</div>
            <div onclick="record('sec(')" class="button">sec(x)</div>
            <div onclick="record('asin(')" class="button">asin(x)</div>
            <div onclick="record('atan(')" class="button">atan(x)</div>
            <div onclick="record('asec(')" class="button">asec(x)</div>
            <div onclick="record('rad(')" class="button">rad(x)</div>
            <div onclick="record('deg(')" class="button">deg(x)</div>

            <div onclick="record('cos(')" class="button">cos(x)</div>
            <div onclick="record('cot(')" class="button">cot(x)</div>
            <div onclick="record('csc(')" class="button">csc(x)</div>
            <div onclick="record('acos(')" class="button">acos(x)</div>
            <div onclick="record('acot(')" class="button">acot(x)</div>
            <div onclick="record('acsc(')" class="button">acsc(x)</div>
            <div onclick="record('vsin(')" class="button">vsin(x)</div>
            <div onclick="record('vcos(')" class="button">vcos(x)</div>

            <div onclick="record('sh(')" class="button">sh(x)</div>
            <div onclick="record('th(')" class="button">th(x)</div>
            <div onclick="record('sch(')" class="button">sch(x)</div>
            <div onclick="record('arsh(')" class="button">arsh(x)</div>
            <div onclick="record('arth(')" class="button">arth(x)</div>
            <div onclick="record('arsch(')" class="button">arsch(x)</div>
            <div onclick="record('csin(')" class="button">csin(x)</div>
            <div onclick="record('ccos(')" class="button">ccos(x)</div>

            <div onclick="record('ch(')" class="button">ch(x)</div>
            <div onclick="record('cth(')" class="button">cth(x)</div>
            <div onclick="record('csch(')" class="button">csch(x)</div>
            <div onclick="record('arch(')" class="button">arch(x)</div>
            <div onclick="record('arcth(')" class="button">arcth(x)</div>
            <div onclick="record('arcsch(')" class="button">arcsch(x)</div>
            <div onclick="record('hsin(')" class="button">hsin(x)</div>
            <div onclick="record('hcos(')" class="button">hcos(x)</div>`


const dxc = `<div onclick="record('(t)=>')" class="button">(t)</div>
            <div onclick="record('=>')" class="button">()</div>
            <div onclick="record('diffx(')" class="button">dy/dx</div>
            <div onclick="record('diff(')" class="button">dy/d</div>
            <div onclick="record('dy')" class="button">dy</div>
            <div onclick="record('integral(')" class="button">&Integral;<sub>a</sub><sup>b</sup></div>
            <div onclick="record('Dintegral(')" class="button">&Integral;&Integral;</div>
            <div onclick="record('C1integral(')" class="button">1c&Integral;</div>

            <div onclick="record('C2integral(')" class="button">2c&Integral;</div>
            <div onclick="record('CCintegral(')" class="button">cc&Integral;</div>
            <div onclick="record('x + yi')" class="button">Z</div>
            <div onclick="record('gamma(')" class="button">G(z)</div>
            <div onclick="record('lgamma(')" class="button">ln(G)</div>
            <div onclick="record('betta(')" class="button">B(x, y)</div>
            <div onclick="record('bettax(')" class="button">Bx(a,b,x)</div>
            <div onclick="record('lim(')" class="button">lim</div>

            <div onclick='record("1")' class="button">param</div>
            <div onclick='record("2")' class="button">xbase</div>
            <div onclick='record("3")' class="button">ybase</div>
            <div onclick='record("4")' class="button">polar</div>
            <div onclick="record('(x, y)=>')" class="button">(x, y)</div>
            <div onclick="record('')" class="button"></div>

            
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>

            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>`

const mc = `<div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>

            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>

            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>

            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>`
const vc = `<div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>

            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>

            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>

            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>
            <div onclick="record('')" class="button"></div>`


function abcChange() {
    const id = document.getElementById('mainbuttons')
    if (!boolabs) {
        id.innerHTML = ABCs
        boolabs = true
        boolfun = false
        boolsin = false
        booldy = false
        boolm = false
        boolv = false
    } else {
        boolabs = false
        boolfun = false
        boolsin = false
        booldy = false
        boolm = false
        boolv = false
        id.innerHTML = basestr

    }
}

function funChange() {
    const id = document.getElementById('mainbuttons')
    if (!boolfun) {
        id.innerHTML = Funs
        boolabs = false
        boolfun = true
        boolsin = false
        booldy = false
        boolm = false
        boolv = false
    } else {
        boolabs = false
        boolfun = false
        boolsin = false
        booldy = false
        boolm = false
        boolv = false
        id.innerHTML = basestr

    }
}

function sinChange() {
    const id = document.getElementById('mainbuttons')
    if (!boolsin) {
        id.innerHTML = sinc
        boolabs = false
        boolfun = false
        boolsin = true
        booldy = false
        boolm = false
        boolv = false
    } else {
        boolabs = false
        boolfun = false
        boolsin = false
        booldy = false
        boolm = false
        boolv = false
        id.innerHTML = basestr

    }
}

function dyChange() {
    const id = document.getElementById('mainbuttons')
    if (!booldy) {
        id.innerHTML = dxc
        boolabs = false
        boolfun = false
        boolsin = false
        booldy = true
        boolm = false
        boolv = false
    } else {
        boolabs = false
        boolfun = false
        boolsin = false
        booldy = false
        boolm = false
        boolv = false
        id.innerHTML = basestr

    }
}
