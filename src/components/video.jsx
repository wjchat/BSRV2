import React,{useEffect} from 'react';
import {gsap, Power3} from "gsap"
import "../sass/video.scss"

const Video = props =>{
    let animate
    useEffect(()=>{
        if(animate){
            if(props.show){
                gsap.to(animate, props.time * .5,{
                    opacity: 1,
                    pointerEvents: "all",
                    scale: 1.2,
                    ease: Power3.easeInOut,
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
                    ease: Power3.easeInOut,
                })
            }
        }
    }, [props.show, animate])
    return(
        <div ref = {div=>animate=div} className = "video">
            <video src = {props.video} controls>
            Your browser does not support the video tag.
            </video>
            <div className = "role fadeAway">{props.role}</div>
        </div>
        )
}

export default Video