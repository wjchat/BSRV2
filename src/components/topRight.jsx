import React, { useEffect, useState, useContext } from "react"
import { gsap, Power3, Expo } from "../esm/all"
import "../sass/topRight.scss"
import { Link } from "gatsby"
import LayoutContext from "./layoutContext.jsx"
import TransitionLink from "gatsby-plugin-transition-link"
import moveItems from "./moveitems.js"
import arrow from "../assets/images/whiteright.svg"
import x from "../assets/images/x.svg"

const TopRight = props => {
  let ctx = useContext(LayoutContext)
  let contact
  let back
  const [message, updateMessage] = useState(null)
  useEffect(() => {
    if (contact && back) {
      if (props.showVideo) {
        gsap.set(back, {
          opacity: 0,
          scale: 0.8,
          pointerEvents: "none",
        })
        gsap.to(back, props.time * .5,{
          opacity: 1,
          scale: 1,
          pointerEvents: "all",
          ease: "slick",
        })
        gsap.to(contact, props.time * .5,{
          opacity: 0,
          scale: 1.2,
          pointerEvents: "none",
          ease: "slick",
        })
      }
      if (props.showVideo === false) {
        gsap.to(contact, props.time * .5,{
          opacity: 1,
          scale: 1,
          pointerEvents: "all",
          ease: Expo.easeOut,
        })
        gsap.to(back, props.time * .5,{
          opacity: 0,
          scale: 0.8,
          pointerEvents: "none",
          ease: Expo.easeOut,
        })
      }
    }
  }, [props.showVideo, contact, back])
  return (
    <div className="topRight">
      <h1
      className = "backDiv"
       ref={div => (back = div)}>
        <span
        onClick={() => props.updateShow(false)}
        className = "link shrinkBack"
        onMouseEnter={() => ctx.cursorTransformation(true)}
        onMouseLeave={() => ctx.cursorTransformation(false)}
        ><img src = {x} className = "navArrow"/> BACK</span>
      </h1>
      <h1
       ref={div => (contact = div)}>
        <TransitionLink 
        className = "link rightSlight moveTrans"
        to="about-ben"
        onMouseOver={() => ctx.cursorTransformation(true)}
        onMouseLeave={() => ctx.cursorTransformation(false)}
        exit = {{
                  length: 1.4,
                    trigger: ()=>{
                        ctx.triggerTrans("left")
                        moveItems("left", "start")
                    }
              }}
        entry = {{
                  delay: .7,
                    trigger: ()=>moveItems("right")
              }}
        ><span><img className = "navArrow arrowFlip" src={arrow} alt=""/>  BSR</span></TransitionLink>
      </h1>
    </div>
  )
}

export default TopRight
