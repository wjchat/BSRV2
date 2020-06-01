import React, { useEffect, useState, useContext } from "react"
import { gsap, Power3, Expo } from "gsap"
import "../sass/topRight.scss"
import { Link } from "gatsby"
import LayoutContext from "./layoutContext.jsx"
import TransitionLink from "gatsby-plugin-transition-link"

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
          ease: Expo.easeInOut,
        })
        gsap.to(contact, props.time * .5,{
          opacity: 0,
          scale: 1.2,
          pointerEvents: "none",
          ease: Expo.easeInOut,
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
        ref={div => (back = div)}
        onClick={() => props.updateShow(false)}
      >
        <span
        className = "link"
        onMouseEnter={() => ctx.cursorTransformation(true)}
        onMouseLeave={() => ctx.cursorTransformation(false)}
        >
        BACK</span>
      </h1>
      <h1
        ref={div => (contact = div)}
      >
        <TransitionLink 
        className = "link"
        to="contact"
        onMouseOver={() => ctx.cursorTransformation(true)}
        onMouseLeave={() => ctx.cursorTransformation(false)}
        exit = {{
                  length: 1.4,
                    trigger: ()=>ctx.triggerTrans("left")
              }}
        entry = {{
                  delay: .7,
              }}
        >BSR</TransitionLink>
      </h1>
    </div>
  )
}

export default TopRight
