import React,{useEffect, useState, useContext, useCallback, useLayoutEffect} from "react"
import "../sass/cursor.scss"
import {gsap,Power3, Power2, Back} from 'gsap'
import arrow from "../assets/images/arrow.svg"
import play from "../assets/images/play.svg"


const Cursor = props =>{
    let cursor
    let cursor2
    const [cursorType, updateCursorType] = useState(null)
    const [cursorElem, updateCursorElem] = useState(null)
    const [cursorElem2, updateCursorElem2] = useState(null)
    useEffect(()=>{
        if(cursor && cursor2){
            updateCursorElem(cursor)
            updateCursorElem2(cursor2)
        }
    }, [cursor, cursor2])
    
    useEffect(()=>{
        if(cursorElem && cursorElem2){
            window.addEventListener("mousemove", handleMove)
        }
    }, [cursorElem, cursorElem2])
    
    useEffect(()=>{
        if(cursor && cursor2){
            if(props.cursorType === "cursor"){
                updateCursorType("")
            }else if(props.cursorType === "right"){
                updateCursorType(<img src = {arrow} alt = "right" />)
            }else if(props.cursorType === "left"){
                updateCursorType(<img style = {{transform: "rotate(180deg)"}} src = {arrow} alt = "left"/>)
            }else if(props.cursorType === "play"){
                updateCursorType(<img src={play} alt="play"/>)
            }
        }
    },[props.cursorType, cursor, cursor2])
    const handleMove = useCallback((e) =>{
        gsap.to(cursorElem, .1, {
            x: e.x - 65,
            y: e.y - 65,
            ease: Power2.easeOut,
        })            
        gsap.to(cursorElem2, .5, {
                x: e.x - 65,
                y: e.y - 65,
                ease: "easeIn",
            })
    }, [cursorElem, cursorElem2])
    return(<div className = "pageContain">
        <div ref = {div=>cursor2=div} className = "cursorContainer fadeAway">
            {cursorType}
        </div>
        <div ref = {div=>cursor=div} className = "cursorContainer fadeAway">
            <div className= "cursor cursorTransform"></div>
        </div>        
    </div>
    )
}

export default Cursor