const cursor = ()=>{
    const cursor = document.getElementsByClassName('cursor')[0]

const handlemousemove = (e)=>{
    gsap.to(cursor,{
        x:e.x,
        y:e.y,
        ease:'easeout',
        opacity: 1,
        duraction:1,
        ease:"power4.out"

    })
}

const handlemouseleave = (e)=>{
    gsap.to(cursor,{
        opacity:0
    })
}

document.getElementById("root").addEventListener("mousemove",handlemousemove)
document.getElementById("root").addEventListener("mouseleave",handlemouseleave)
}
cursor()