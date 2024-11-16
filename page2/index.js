window.scrollTo(0, 0)

function max(x, y) {
    return x > y ? x : y
}



var gcd = function(a, b) {
    if (!b) {
      return a;
    }
  
    return gcd(b, a % b);
  }

document.getElementById("infrac").addEventListener("click", () => {
    let frac = Number(prompt("Введите десятичную дробь", '1'))
    let denumerator = 1
    while (Math.floor(frac) != frac) {
        frac *= 10
        denumerator *= 10
    }
    let g = gcd(frac, denumerator)
    if (g != 1) {
        frac /= g
        denumerator /= g
    }
    alert(`Обыкновенная дробь ${frac}/${denumerator}`)

})