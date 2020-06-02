import React,{useEffect, useState} from 'react'
import "../sass/title.scss"
import {gsap, Power3, Power2, Expo} from "gsap"

const Title = props =>{
    let animate
    let [title, updateTitle] = useState(null)
    useEffect(()=>{
        if(animate){
            let tl = gsap.timeline();
            tl.to(animate, props.time * .25,{
                opacity: 0,
                x: -100 * props.direction,
                ease: "slickIn"
            })
            tl.call(()=>updateTitle(props.title))
            tl.set(animate, {
                x: 100 * props.direction,
            })
            tl.to(animate, props.time * .7,{
                opacity: 1,
                x: 0,
                ease: Expo.easeOut
            })
        }
    }, [props.title, animate])
    useEffect(()=>{
        if(animate){
            if(props.showVideo){
                gsap.to(animate, props.time * .25,{
                    opacity: 0,
                    scale: 1.2,
                    y: "10vw",
                    ease: Expo.easeIn,
                })
            }else{
                gsap.to(animate, props.time * .5 ,{
                    y: "0vw",
                    opacity: 1,
                    scale: 1,
                    ease: Expo.easeOut,
                })
            }
        }
    }, [props.showVideo, animate])
    return<h1 ref = {div=>animate=div} className = "title">{title}</h1>
}
export default Title