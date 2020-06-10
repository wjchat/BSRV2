import React, { useEffect, useState } from "react"
import gsap from "../esm/all"

const ContactHalf = props => {
  let black = "#1B1818"
  let white = "#fffafa"
  let background
  let events

  useEffect(() => {
    if (background) { 
        gsap.to(background, 0.2, {
          backgroundColor: props.focus === props.item ? white : black,
        })
        gsap.to(background.getElementsByClassName("change"), 0.2, {
          color: props.focus === props.item ? black : white,
        })
      }
      if(props.focus === props.item && events){
          gsap.set(events,{
              pointerEvents: "all",
          })
      }else{
          gsap.set(events,{
              pointerEvents: "none",
          })
      }
  }, [props.focus, background, props.item, events])

  return (
    <div
      onMouseOver={() => props.updateFocus(props.item)}
      ref={div => (background = div)}
    >
     <div ref = {div=>events=div}>
          {props.children}
     </div>
    </div>
  )
}

export default ContactHalf
