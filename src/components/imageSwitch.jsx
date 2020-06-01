import React from "react"
import gsap from "gsap"

const style = {
    position: "absolute",
    top: 0,
    left: 0,
};
const style2 = {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none"
};
const imgTwoStyle = {
    opacity: 0,
};


const ImageSwitch = props =>{
    let imageOne
    let imageTwo
    const handleMouseEnter = () =>{
        props.onMouseEnter();
        console.log(imageTwo)
        gsap.to(imageTwo, .1,{
            opacity: 1,
        })        
        gsap.to(imageOne, .1,{
            opacity: 0,
        })
    }
    const handleMouseLeave = () =>{
        props.onMouseLeave();
        gsap.to(imageTwo, .1,{
            opacity: 0,
        })        
        gsap.to(imageOne, .1,{
            opacity: 1,
        })
    }
    return(<div style = {{
                position: "relative",
            }}>
        <div style = {style}>
        <img 
        ref = {div=>imageOne=div}
        className = {props.className}
        onMouseEnter = {()=>handleMouseEnter()} 
        onMouseLeave = {()=>handleMouseLeave()} 
        src={props.imageOne} alt={props.alt}/></div>
        
        <div style = {style2}>
        <img 
        style = {imgTwoStyle}
        ref = {div=>imageTwo=div}
        src={props.imageTwo}/></div>
    </div>)
}

export default ImageSwitch