import React,{useEffect} from "react"
import "../sass/background.scss"
import background from "../assets/images/base.png"
import gsap from "../esm/all"

let shake= (target)=>{
    console.log(target)
}

const Background = props =>{
    let base
    useEffect(()=>{
        if(base){
            shake(base)
        }
    }, [base])
    return<div className = "background">
    </div>
}

export default Background