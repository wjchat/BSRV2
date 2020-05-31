import {gsap,Power2,Power3} from "gsap";

let transform = (grow, color) =>{
    let target = document.body.getElementsByClassName("cursorTransform")[0]
    let ease = grow ? "easeIn" : Power2.easeOut
    if(!color){
        color =  "#424242";
    }
    gsap.to(target, .2,{
        scale: grow ? 2 : 1,
        background: grow ? color: "#fffafa",
        ease: ease
    })
}

export default transform
