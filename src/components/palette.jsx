import React, { useEffect,useState, useCallback, useContext } from "react"
import "../sass/palette.scss"
import { gsap, Power3, Power2 } from "gsap"
import LayoutContext from "./layoutContext.jsx"


const Palette = props => {
let ctx = useContext(LayoutContext)
  let palette
  const [current, updateCurrent]=useState(props.current)
  const [direction, updateDirection]=useState(1)
  const [palOb, updatePal] = useState(null)
  const [canGo, updateCanGo] = useState(true)
  const [tween, updateTween] =useState(gsap.timeline())
  
  
  useEffect(() => {
    if (palette) {
      updatePal(palette)
      let direction
      window.addEventListener("mousemove", e => {
        if (e.movementX !== 0) {
          let dir = e.movementX
          if (dir > 0) {
            updateDirection(1)
          } else {
            updateDirection(-1)
          }
        }
      })
    }
  }, [palette])

  useEffect(() => {
    if (props.current === props.item.orderOfAppearance) {
      hoverAnimate(
        palette.getElementsByClassName("color"),
        props.direction,
        1,
        50
      )
    } else {
      hoverAnimate(
        palette.getElementsByClassName("color"),
        props.direction,
        -1,
        50
      )
    }
      updateCurrent(props.current)
  }, [props.current])

  const hoverAnimate = useCallback((target, horizontal, vertical, amt, currentP) => {
    if(amt === 25 && props.item.orderOfAppearance === currentP){
        return
    }else{
            let tl = gsap.timeline({paused: true})
            let stagger = horizontal * 0.03
            let ease = vertical === 1 ? Power2.easeIn : Power2.easeIn
            tl.staggerTo(
              target,
              0.4,
              {
                height: `${amt + amt * vertical}%`,
                ease: ease,
              },
              stagger,
              `-=.1`
            )
            if(tween){
                if(tween.isActive()){
                    tween.eventCallback("onComplete", ()=>{updateTween(tl)})
                }else{
                    updateTween(tl)
                }
            }
    }
  }, [tween])
  
  useEffect(()=>{
      if(tween){
          tween.play();
      }
  }, [tween])
  
  const handleClick = () =>{
      props.updateCurrent(props.item.orderOfAppearance)
  }
  
  const handleMouseMove = useCallback((move)=>{
      if(palOb){
          let beforeAfter = current < props.item.orderOfAppearance ? 1:-1
          let dir = props.inside ? direction : beforeAfter
          if(move === "enter"){
              hoverAnimate(palOb.getElementsByClassName("color"), dir, 1, 25, current)
          }
          if(move === "leave"){
              hoverAnimate(palOb.getElementsByClassName("color"), dir, -1, 25, current)
          }
      }
  }, [palOb, current, direction, props.inside, props.item.orderOfAppearance])
  
  useEffect(()=>{
      if(props.hover === props.item.orderOfAppearance){
          handleMouseMove("enter")
      }else{
          handleMouseMove("leave")
      }
  }, [props.hover])
    
  return (
    <div 
     onClick = {()=>handleClick()}
     onMouseEnter = {()=>handleMouseMove("enter")}
     onMouseLeave = {()=>handleMouseMove("leave")}
     ref={div => (palette = div)} 
     className="palette"
     onMouseOver = {()=>ctx.cursorTransformation(true, props.item.Palette.color1)}
     >
      <div
        className="color"
        style={{ background: props.item.Palette.color1 }}
      ></div>
      <div
        className="color"
        style={{ background: props.item.Palette.color2 }}
      ></div>
      <div
        className="color"
        style={{ background: props.item.Palette.color3 }}
      ></div>
      <div
        className="color"
        style={{ background: props.item.Palette.color4 }}
      ></div>
    </div>
  )
}

export default Palette
