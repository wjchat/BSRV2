import React, { useEffect, useContext, useCallback } from "react"

import Img from "gatsby-image"
import LayoutContext from './layoutContext.jsx' 
import { gsap, Power3 } from "gsap"
import "../sass/reelItem.scss"

const ReelItem = props => {
  let focus
  let animate
  let ctx = useContext(LayoutContext)
  useEffect(() => {
    if (focus) {
      if (props.item.orderOfAppearance === props.current) {
        props.updateInfo({
          title: props.item.title,
          video: props.item.video.publicURL,
            role: props.item.role
        })
        gsap.to(focus, props.time * 0.4, {
          opacity: 1,
          delay: props.time * 0.5,
        })
      } else {
        gsap.to(focus, props.time, {
          opacity: 0,
        })
      }
    }
  }, [props.current, focus])
  useEffect(() => {
    if (animate) {
      if (props.showVideo) {
        if (props.current === props.item.orderOfAppearance) {
          gsap.to(animate, props.time * 0.5, {
            opacity: 0,
            scale: 1.2,
            pointerEvents: "none",
            ease: Power3.easeInOut,
          })
        } else {
          gsap.to(animate, props.time * 0.5, {
            opacity: 0,
            scale: 0.8,
            pointerEvents: "none",
            ease: Power3.easeInOut,
          })
        }
      } else {
        gsap.to(animate, props.time * 0.5, {
          opacity: 1,
          scale: 1,
          pointerEvents: "all",
          ease: Power3.easeInOut,
        })
      }
    }
  }, [props.showVideo, animate])
    
  const handleClick = useCallback(() => {
    if (props.current === props.item.orderOfAppearance) {
      props.updateShow(true)
    ctx.cursorTransformation(false)
    } else {
      props.updateCurrent(props.item.orderOfAppearance)
    }
  }, [props.current])
  
  
  const handleHover = useCallback(()=>{
    ctx.cursorTransformation(true, props.item.Palette.color1)
     props.updateHover(props.item.orderOfAppearance) 
    if(props.item.orderOfAppearance > props.current){
        ctx.updateCursorType("right")
    }else if (props.item.orderOfAppearance < props.current){
        ctx.updateCursorType("left")
    } else{
        ctx.updateCursorType("play")
    }
      
  }, [props.current])
  return (
    <div
      ref={div => (animate = div)}
      onClick={() => handleClick()}
      className="itemContainer"
      onMouseEnter = {()=>handleHover()}
    >
      <div className="image">
        <Img fluid={props.item.reelPic.childImageSharp.fluid} />
      </div>
      <div ref={div => (focus = div)} className="image focus">
        <Img fluid={props.item.focusPic.childImageSharp.fluid} />
      </div>
    </div>
  )
}

export default ReelItem