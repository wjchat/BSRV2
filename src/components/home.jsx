import React, { useState, useEffect, useCallback, useContext } from "react"

import { gsap, Power3, Power2, Power4, Expo } from "../esm/all"

import LayoutContext from "./layoutContext.jsx"
import PaletteContainer from "./paletteContainer.jsx"
import Reel from "./reel.jsx"
import Title from "./title.jsx"
import TopRight from "./topRight.jsx"
import Video from "./video.jsx"
import "../sass/home.scss"
import TransitionLink from "gatsby-plugin-transition-link"


let timer = 0;
const Home = props => {
    let ctx = useContext(LayoutContext)
  let reel
  let contact
  let time = 1.4
  const [current, updateCurrent] = useState(1)
  const [prev, updatePrev] = useState(0)
  const [currentInfo, updateInfo] = useState({
    title: "",
    video: "",
    role: "",
  })
  const [showVid, updateShow] = useState(false)
  const [hover, updateHover] = useState(1)
  const [globalTimer, updateGlobalTimer] = useState()
    
  useEffect(() => {
    if(contact){
        if(showVid){
            gsap.to(contact, time * .5,{
                scale: 1.2,
                x: "15vw",
                y: " -3vw",
                opacity: 0,
                pointerEvents: "none",
                ease: Expo.easeInOut,
            })
        }else{
            gsap.to(contact, time * .5,{
                scale: 1,
                x: "0vw",
                y: " 0vw",
                opacity: 1,
                pointerEvents: "all",
                ease: Expo.easeOut,
            })
            }
    }
    window.addEventListener("keydown", handleKey)
    return () => {
      window.removeEventListener("keydown", handleKey)
    }
  }, [current, showVid,contact])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    if (showVid) {
        ctx.updateCursorType("cursor")
        handleMouseMove()
    } else {
        handleMouseMove()
    }
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
  }, [showVid, timer])

  const handleMouseMove = useCallback(() => {
      let items = document.body.getElementsByClassName("fadeAway")
      gsap.to(items, .1,{
          opacity: 1,
      })
    window.clearTimeout(timer)
    if(showVid){
        timer = window.setTimeout(() => {
              gsap.to(items, .5,{
                  opacity: 0,
                  })
            }, 4000)
    }else{
          gsap.to(items, .1,{
              opacity: 1,
          })
    }
  }, [showVid, timer])
  
  const handleKey = useCallback(
    e => {
      //    console.log(e.keyCode)
      if (e.keyCode === 39) {
        let num =
          current < document.body.getElementsByClassName("palette").length &&
          !showVid
            ? current + 1
            : current
        updateCurrent(num)
      } else if (e.keyCode === 37) {
        let num = current > 1 && !showVid ? current - 1 : current
        updateCurrent(num)
      } else if (e.keyCode === 13) {
        updateShow(true)
      } else if (e.keyCode === 27) {
        updateShow(false)
      }
    },
    [current, showVid]
  )

  useEffect(() => {
    if (reel) {
      gsap.to(reel, time, {
        x: `${(current - 1) * -50}vw`,
        ease: "slick",
      })
    }
  }, [current, reel])
  useEffect(() => {
    setTimeout(() => {
      updatePrev(current)
    }, 100)
  }, [current])
    
const handleMouseOut=useCallback(()=>{
    updateHover(current)
}, [current])

  return (
    <div className="homeContainer">
      <div className="header fadeAway">
        <TopRight
          currentInfo={currentInfo}
          updateShow={b => updateShow(b)}
          showVideo={showVid}
          time= {time}
        />
        <h1 ref = {div=>contact=div}>
        <TransitionLink 
        className = "link"
        to="contact"
        onMouseOver={() => ctx.cursorTransformation(true)}
        onMouseLeave={() => ctx.cursorTransformation(false)}
        exit = {{
                  length: 1.4,
                    trigger: ()=>ctx.triggerTrans("right")
              }}
        entry = {{
//                  length: 2,
                  delay: .7,
              }}
        >CONTACT</TransitionLink>
        </h1>
      </div>
      <div className="reel">
        <div
          ref={div => (reel = div)}
          onMouseLeave={() => handleMouseOut()}
          className="case"
        >
          <div className="placeholder"></div>
          <Reel
            updateShow={b => updateShow(b)}
            updateHover={num => updateHover(num)}
            showVideo={showVid}
            time={time}
            updateCurrent={num => updateCurrent(num)}
            updateInfo={info => updateInfo(info)}
            current={current}
          />
        </div>
        <Title
          showVideo={showVid}
          direction={prev < current ? 1 : -1}
          time={time}
          title={currentInfo.title}
        />
      </div>
      <Video
        time={time}
        video={currentInfo.video}
        show={showVid}
        role={currentInfo.role}
      />
      <PaletteContainer
        updateShow={b => updateShow(b)}
        time={time}
        showVideo={showVid}
        hover={hover}
        updateCurrent={num => updateCurrent(num)}
        current={current}
        direction={prev < current ? 1 : -1}
      />
      <p className = "change foot fadeAway">&copy;2020 Ben Swanson-Ralph</p>
    </div>
  )
}
export default Home
