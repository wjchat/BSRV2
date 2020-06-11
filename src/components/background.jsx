import React,{useEffect} from "react"
import "../sass/background.scss"
import gsap from "../esm/all"
import grain from "../assets/images/grainGif.gif"

const Background = props =>{
    return<div className = "background">
    <img src={grain} alt=""/>
    </div>
}

export default Background