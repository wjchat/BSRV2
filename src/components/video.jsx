import React,{useEffect, useContext} from 'react';
import {gsap, Power3, Expo} from "../esm/all"
import Play from "../assets/images/play.svg"
import "../sass/video.scss"
import LayoutContext from "./layoutContext.jsx"


const Video = props =>{
    let animate
    let ctx = useContext(LayoutContext)
    useEffect(()=>{
        if(animate){
            if(props.show){
                let role = animate.getElementsByClassName("roleBox")[0]
                gsap.set(role,{
                    opacity: 0,
                    y: "1vw",
                })
                gsap.set(animate.getElementsByTagName("img")[0],{
                    opacity: 1,
                    pointerEvents: "all",
                })
                gsap.to(animate, props.time * .5,{
                    opacity: 1,
                    pointerEvents: "all",
                    scale: 1.2,
                    ease: "slick",
                })
                gsap.to(role, props.time * 2,{
                    opacity: 1,
                    y: "0vw",
                    ease: Power3.easeOut,
                    delay: props.time * .2
                })
                let ob = animate
            }else{
                animate.getElementsByTagName("video")[0].pause();
                gsap.to(animate.getElementsByTagName("video")[0], props.time * .5,{
                    opacity: 0,
                })
                gsap.to(animate, props.time * .5,{
                    opacity: 0,
                    pointerEvents: "none",
                    scale: 1,
                    ease: Expo.easeOut,
                })
                gsap.set(animate.getElementsByTagName("img")[0],{
                    pointerEvents: "none",
                })
            }
        }
    }, [props.show, animate, props.time])
    const handleClick = ()=>{
        gsap.to(animate.getElementsByTagName("img")[0], .4,{
            opacity: 0,
        })
        gsap.to(animate.getElementsByTagName("video")[0], .4,{
            opacity: 1,
        })
        setTimeout(()=>{
            animate.getElementsByTagName("video")[0].play();
            gsap.set(animate.getElementsByTagName("img")[0],{
                pointerEvents: "none",
            })
        }, 400)
    }
    return(
        <div ref = {div=>animate=div} className = "video">
            <video src = {props.video} controls>
            Your browser does not support the video tag.
            </video>
            <img 
        onClick = {()=>handleClick()}
        onMouseOver={() => ctx.cursorTransformation(true)}
        onMouseLeave={() => ctx.cursorTransformation(false)}            src={Play} alt="play"/>
           
            <div className = "roleBox"><div className = "role fadeAway">{props.role}</div></div>
            
        </div>
        )
}

export default Video