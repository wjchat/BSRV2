import React, {useEffect, useContext}  from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import LayoutContext from "../components/layoutContext.jsx"
import "../sass/about-ben.scss"
import Img from "gatsby-image"
import arrow from "../assets/images/arrow.svg"
import moveItems from "./moveitems.js"


const About = props =>{
    let ctx = useContext(LayoutContext)
    return(
        <div className = "aboutContainer">
                 <div className = "header">
                     <h2>
                             <TransitionLink 
        className = "link moveTrans"
        to="/"
        onMouseOver={() => ctx.cursorTransformation(true)}
        onMouseLeave={() => ctx.cursorTransformation(false)}
        exit = {{
                  length: 1.4,
                    trigger: ()=>{
                        ctx.triggerTrans("right")
                        moveItems("right", "start")
                    }
              }}
        entry = {{
//                  length: 2,
                  delay: .7,
                      trigger: () => moveItems("left")
              }}
        >WORK <img src = {arrow} /></TransitionLink>
                     </h2>
                 </div>
                <div className = "content">
                    <div className = "imageContainer moveTrans" weight = "large">
                        <Img fluid = {props.picture} />
                    </div>
                        <p className="moveTrans" weight = "large">{props.aboutText}</p>
                </div>
                   
              <p className = "foot moveTrans">&copy;2020 Ben Swanson-Ralph</p>
        </div>    
    )
}

export default About