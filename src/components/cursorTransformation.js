import {gsap,Power2,Power3} from "gsap";

let transform = (grow, color) =>{
    let target = document.body.getElementsByClassName("cursorTransform")[0]
    let ease = grow ? "easeIn" : Power2.easeOut
    let primary = null
    if(!color && grow){
        color =  "#424242";
    }
    if(grow === false && color !== undefined){
        primary = color
    }
    gsap.to(target, .2,{
        scale: grow ? 2 : 1,
        background: grow ? color: primary !== null ? primary : "#fffafa",
        ease: ease
    })
}

export default transform
