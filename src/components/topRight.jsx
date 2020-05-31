import React, { useEffect, useState, useContext } from "react"
import { gsap, Power3 } from "gsap"
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
        gsap.to(back, {
          opacity: 1,
          scale: 1,
          pointerEvents: "all",
          ease: Power3.easeInOut,
        })
        gsap.to(contact, {
          opacity: 0,
          scale: 1.2,
          pointerEvents: "none",
          ease: Power3.easeInOut,
        })
      }
      if (props.showVideo === false) {
        gsap.to(contact, {
          opacity: 1,
          scale: 1,
          pointerEvents: "all",
          ease: Power3.easeInOut,
        })
        gsap.to(back, {
          opacity: 0,
          scale: 0.8,
          pointerEvents: "none",
          ease: Power3.easeInOut,
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
        onMouseEnter={() => ctx.cursorTransformation(true)}
        onMouseLeave={() => ctx.cursorTransformation(false)}
        >
        BACK</span>
      </h1>
      <h1
        ref={div => (contact = div)}
      >
        <TransitionLink to="contact"
        onMouseOver={() => ctx.cursorTransformation(true)}
        onMouseLeave={() => ctx.cursorTransformation(false)}
        exit = {{
                  length: 3,
                    trigger: ()=>ctx.triggerTrans("right")
              }}
        entry = {{
//                  length: 2,
                  delay: .7,
              }}
        >CONTACT</TransitionLink>
      </h1>
    </div>
  )
}

export default TopRight
