import React, { useState, useEffect, useCallback, useContext } from "react"

import { gsap, Power3, Power2 } from "gsap"

import LayoutContext from "./layoutContext.jsx"
import PaletteContainer from "./paletteContainer.jsx"
import Reel from "./reel.jsx"
import Title from "./title.jsx"
import TopRight from "./topRight.jsx"
import Video from "./video.jsx"
import "../sass/home.scss"


let timer = 0;
const Home = props => {
    let ctx = useContext(LayoutContext)
  let reel
  let time = 0.8
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
    window.addEventListener("keydown", handleKey)
    return () => {
      window.removeEventListener("keydown", handleKey)
    }
  }, [current, showVid])

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
            }, 2500)
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
        ease: Power3.easeInOut,
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
        <h1>BSR</h1>
        <TopRight
          currentInfo={currentInfo}
          updateShow={b => updateShow(b)}
          showVideo={showVid}
        />
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
