import React,{useEffect} from 'react';
import {gsap, Power3, Expo} from "../esm/all"
import "../sass/video.scss"

const Video = props =>{
    let animate
    useEffect(()=>{
        if(animate){
            if(props.show){
                let role = animate.getElementsByClassName("roleBox")[0]
                gsap.set(role,{
                    opacity: 0,
                    y: "1vw",
                })
                gsap.to(animate, props.time * .5,{
                    opacity: 1,
                    pointerEvents: "all",
                    scale: 1.2,
                    ease: Expo.easeInOut,
                })
                gsap.to(role, props.time * .3,{
                    opacity: 1,
                    y: "0vw",
                    ease: Power3.easeOut,
                    delay: props.time
                })
                let ob = animate
                setTimeout(()=>{
                    ob.getElementsByTagName("video")[0].play();
                }, props.time * 500)
            }else{
                animate.getElementsByTagName("video")[0].pause();
                gsap.to(animate, props.time * .5,{
                    opacity: 0,
                    pointerEvents: "none",
                    scale: 1,
                    ease: Expo.easeOut,
                })
            }
        }
    }, [props.show, animate, props.time])
    return(
        <div ref = {div=>animate=div} className = "video">
            <video src = {props.video} controls>
            Your browser does not support the video tag.
            </video>
            <div className = "roleBox"><div className = "role fadeAway">{props.role}</div></div>
            
        </div>
        )
}

export default Video