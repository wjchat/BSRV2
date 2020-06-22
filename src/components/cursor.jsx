import React,{useEffect, useState, useContext, useCallback, useLayoutEffect} from "react"
import "../sass/cursor.scss"
import {gsap,Power3, Power2, Back} from "../esm/all"
import arrow from "../assets/images/arrow.svg"
import expand from "../assets/images/expand.svg"
import newTab from "../assets/images/newTab.svg"
import copy from "../assets/images/copy.svg"

const getWidth = () =>{
    let width = window.innerWidth < 1000 ? window.innerWidth : 1000;
    return (Math.floor(width * .06))
}

const Cursor = props =>{
    let cursor
    let cursor2
    const [cursorType, updateCursorType] = useState(null)
    const [cursorElem, updateCursorElem] = useState(null)
    const [cursorElem2, updateCursorElem2] = useState(null)
    const [width, updateWidth] = useState(null);
    useEffect(()=>{
        if(!width){
            window.addEventListener(("resize"), () =>{
                updateWidth(getWidth())
            })
            updateWidth(getWidth())
        }
    }, [width])
    useEffect(()=>{
        if(cursor && cursor2){
            updateCursorElem(cursor)
            updateCursorElem2(cursor2)
        }
    }, [cursor, cursor2])
    
    useEffect(()=>{
        window.addEventListener("mousemove", handleMove)
        if(cursorElem && cursorElem2 && width){
            gsap.set([cursorElem, cursorElem2], {
                height: width,
                width: width,
            })
        }
    }, [cursorElem, cursorElem2, width])
    
    useEffect(()=>{
        if(cursor && cursor2){
            if(props.cursorType === "cursor"){
                updateCursorType("")
            }else if(props.cursorType === "right"){
                updateCursorType(<img src = {arrow} alt = "right" />)
            }else if(props.cursorType === "left"){
                updateCursorType(<img style = {{transform: "rotate(180deg)"}} src = {arrow} alt = "left"/>)
            }else if(props.cursorType === "play"){
                updateCursorType(<img src={expand} alt="play"/>)
            }else if(props.cursorType === "newTab"){
                updateCursorType(<img style = {{transform: "scale(.8)"}} src={newTab}/>)
            }else if(props.cursorType === "copy"){
                updateCursorType(<img style = {{transform: "scale(.8)"}} src={copy}/>)
            }
        }
    },[props.cursorType, cursor, cursor2])
    const handleMove = useCallback((e) =>{
        let winWidth = getWidth()
        gsap.to(cursorElem, .1, {
            x: e.x - winWidth / 2,
            y: e.y - winWidth / 2,
            ease: Power2.easeOut,
        })            
        gsap.to(cursorElem2, .5, {
                x: e.x - winWidth / 2,
                y: e.y - winWidth / 2,
                ease: "easeIn",
            })
    }, [cursorElem, cursorElem2])
    return(<div className = "pageContain">
        <div ref = {div=>cursor2=div} className = "cursorContainer fadeAway">
            {cursorType}
        </div>
        <div ref = {div=>cursor=div} className = "cursorContainer fadeAway main">
            <div className= "cursor cursorTransform"></div>
        </div>        
    </div>
    )
}

export default Cursor