window.scrollTo(0,0)


let isScroll=false

document.getElementById('to').onclick = ()=>{
    window.scrollTo(0, 1200)
}
document.getElementById('to1').onclick=()=>{
    window.scrollTo(0, 600)
}

window.addEventListener("scroll", ()=>{
    console.log(window.scrollY)
    if (!isScroll && window.scrollY>660){
        document.getElementById('gens').id="gens2"
        isScroll=true
    }
})


setTimeout(()=>{
document.getElementsByTagName("header")[0].innerText="Карта языков программирования"
}, 6*1000)