import React,{useState, useCallback} from "react";
import gsap from "../esm/all"

const Email = props =>{
    const [message, updateMessage] = useState("EMAIL COPIED TO CLIPBOARD")
    let messageItem
    const handleClick=() =>{
    updateMessage(props.message)    
    const el = document.createElement("textarea")
    el.value = props.email
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)  
    let tl = gsap.timeline()
    tl.set(messageItem,{
        opacity: 1,
    })
        .to(messageItem, 1, {
        opacity: 0,
        delay: 1,
    })
    }
    const handleMouseLeave = () =>{
        props.onMouseLeave()
    }
    const handleEnter = useCallback(() =>{
        props.onMouseEnter()
        gsap.set(messageItem, {
            opacity: 0,
        })
    }, [messageItem])
    return(<>
        <p
        onClick = {()=>handleClick()}
        onMouseEnter = {()=> handleEnter()}
        onMouseLeave = {()=>handleMouseLeave()}
        className = "link">{props.email.toUpperCase()}</p>
        <br />
        <p
        style = {{
                opacity: 0,
            }}
          ref = {div=>messageItem=div}>{message}</p>
    </>)
}
export default Email