import React, { useEffect, useContext, useCallback } from "react"

import Img from "gatsby-image"
import LayoutContext from './layoutContext.jsx' 
import { gsap, Power3, Expo } from "../esm/all"
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
          let xVal = "0vw";
          if(props.item.orderOfAppearance > props.current){
              xVal = "30vw"
          }          
          if(props.item.orderOfAppearance < props.current){
              xVal = "-30vw"
          }
        if (props.current === props.item.orderOfAppearance) {
          gsap.to(animate, props.time * .5 , {
            opacity: 1,
            scale: 1.2,
            pointerEvents: "none",
            ease: "slick",
          })
        } else {
          gsap.to(animate, props.time* .25, {
            opacity: 0,
            scale: 1.2,
            x: xVal,
            pointerEvents: "none",
            ease: "slick",
          })
        }
      } else {
        gsap.to(animate, props.time * 0.5, {
          opacity: 1,
          scale: 1,
          x: "0vw",
          pointerEvents: "all",
          ease: Expo.easeOut,
        })
      }
    }
  }, [props.showVideo, animate, props.item.orderOfAppearance, props.current])
    
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
