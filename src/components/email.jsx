import React,{useState} from "react";
import gsap from "gsap"

const Email = props =>{
    let message
    const handleClick=() =>{
    const el = document.createElement("textarea")
    el.value = props.email
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)   
    gsap.set(message,{
        opacity: 1,
    })
    }
    const handleMouseLeave = () =>{
        props.onMouseLeave()
        gsap.set(message,{
            opacity: 0,
        })
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