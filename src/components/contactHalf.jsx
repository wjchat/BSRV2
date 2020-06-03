import React, { useEffect, useState } from "react"
import gsap from "../esm/all"

const ContactHalf = props => {
  let black = "#1B1818"
  let white = "#fffafa"
  let background

  useEffect(() => {
    if (background) { 
        gsap.to(background, 0.2, {
          backgroundColor: props.focus === props.item ? white : black,
        })
        gsap.to(background.getElementsByClassName("change"), 0.2, {
          color: props.focus === props.item ? black : white,
        })
      }
  }, [props.focus, background, props.item])

  return (
    <div
      onMouseOver={() => props.updateFocus(props.item)}
      ref={div => (background = div)}
    >
      {props.children}
    </div>
  )
}

export default ContactHalf
