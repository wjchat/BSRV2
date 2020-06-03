import React, {useEffect,useContext} from "react"
import "../sass/pageTransition.scss"
import gsap from "../esm/all"
import LayoutContext from "./layoutContext.jsx"

const PageTransition = props =>{
    let ctx = useContext(LayoutContext)
    let one
    let two
    useEffect(()=>{
        let time = .5
        if(props.trigger!=false && one && two){
            let tl = gsap.timeline()
            tl.set([one, two],{
                right: props.trigger === "right" ? 0: "auto",
                left: props.trigger === "right" ? "auto": 0,
            })
            tl.to(one, time,{
                width: "100vw",
            })
            tl.to(two, time,{
                width: "100vw",
            }, `-=${time /2}`)
            tl.set([one,two],{
            right: props.trigger === "right" ? "auto": 0,
              left: props.trigger === "right" ? 0: "auto",
            }, `+=.1`)
            tl.set(document.getElementsByTagName("main"),{
                display: "none",
            })
            tl.to([one, two], time,{
                width: "0vw",
            })
            tl.call(()=>ctx.triggerTrans(false))
        }
    }, [props.trigger,one,two])
    return(
        <div className = "pageTransition">
        <div ref = {div=>one=div}></div>
        <div ref = {div=>two=div}></div>
    </div> )
}

export default PageTransition