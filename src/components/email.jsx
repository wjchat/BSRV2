import React,{useState} from "react";
import gsap from "../esm/all"

const Email = props =>{
    let message
    const handleClick=() =>{
    const el = document.createElement("textarea")
    el.value = props.email
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)  
    let tl = gsap.timeline()
    tl.set(message,{
        opacity: 1,
    })
        .to(message, 1, {
        opacity: 0,
        delay: 2,
    })
    }
    const handleMouseLeave = () =>{
        props.onMouseLeave()
    }
    return(<>
        <h3 
        onClick = {()=>handleClick()}
        onMouseEnter = {()=>props.onMouseEnter()}
        onMouseLeave = {()=>handleMouseLeave()}
        className = "link">{props.email}</h3>
        <h3
        style = {{
                opacity: 0,
            }}
          ref = {div=>message=div}>{props.message}</h3>
    </>)
}
export default Email