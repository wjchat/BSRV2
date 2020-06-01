import React, { useState, useEffect, useContext } from "react"
import "../sass/paletteContainer.scss"
import { graphql, useStaticQuery } from "gatsby"
import Palette from "./palette.jsx"
import { gsap, Power3, Expo } from "gsap"
import LayoutContext from "./layoutContext.jsx"

const PaletteContainer = props => {
    let ctx = useContext(LayoutContext)
  const data = useStaticQuery(graphql`
    query MyQuery {
      allStrapiProjects(sort: {fields: orderOfAppearance, order: ASC}) {
        edges {
          node {
            Palette {
              color1
              color2
              color3
              color4
            }
            orderOfAppearance
          }
        }
      }
    }
  `)
  const items = data.allStrapiProjects.edges
  let animate
  const [inside, updateInside] = useState(false)
  const insideChange = t => {
    setTimeout(() => {
      if (t) {
        updateInside(true)
      } else {
        updateInside(false)
      }
    }, 50)
  }
  useEffect(() => {
    if (props.showVideo) {
      gsap.to(animate, props.time * .5, {
        opacity: 0,
        scale: 1.2,
        y: "15vw",
        pointerEvents: "none",
        ease: Expo.easeInOut,
      })
    }else{
      gsap.to(animate, props.time * 0.5, {
        opacity: 1,
        scale: 1,
        y: "0vw",
        pointerEvents: "all",
        ease: Expo.easeOut,
      }) 
    }
  }, [props.showVideo])
    const handleMouseLeave = () =>{
        insideChange(false)
        ctx.cursorTransformation(false)
    }
  return (
    <div ref={div => (animate = div)} className="paletteContainer">
      <div
        className="box"
        onMouseEnter={() => insideChange(true)}
        onMouseLeave={() => handleMouseLeave()}
      >
        {items.map(item => (
          <Palette
            hover={props.hover}
            updateCurrent={num => props.updateCurrent(num)}
            inside={inside}
            direction={props.direction}
            current={props.current}
            item={item.node}
          />
        ))}
        <div className="bottomBorder"></div>
      </div>
    </div>
  )
}

export default PaletteContainer
