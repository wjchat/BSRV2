import React,{useEffect, useState} from 'react'
import "../sass/title.scss"
import {gsap, Power3, Power2} from "gsap"

const Title = props =>{
    let animate
    let [title, updateTitle] = useState(null)
    useEffect(()=>{
        if(animate){
            let tl = gsap.timeline();
            tl.to(animate, props.time / 2,{
                opacity: 0,
                x: -20 * props.direction,
                ease: Power2.easeIn
            })
            tl.call(()=>updateTitle(props.title))
            tl.set(animate, {
                x: 20 * props.direction,
            })
            tl.to(animate, props.time / 2,{
                opacity: 1,
                x: 0,
                ease: Power2.easeOut
            })
        }
    }, [props.title, animate])
    useEffect(()=>{
        if(animate){
            if(props.showVideo){
                gsap.to(animate, props.time * .5,{
                    opacity: 0,
                    scale: 1.2,
                    ease: Power3.easeInOut,
                })
            }else{
                gsap.to(animate, props.time * .5 ,{
                    opacity: 1,
                    scale: 1,
                    ease: Power3.easeInOut,
                })
            }
        }
    }, [props.showVideo, animate])
    return<h1 ref = {div=>animate=div} className = "title">{title}</h1>
}
export default Title