import React, {useEffect, useContext}  from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import LayoutContext from "../components/layoutContext.jsx"
import "../sass/about-ben.scss"
import Img from "gatsby-image"
import arrow from "../assets/images/whiteright.svg"
import moveItems from "./moveitems.js"
import ReactMarkdown from "react-markdown"


const About = props =>{
    console.log(props.aboutText)
    let ctx = useContext(LayoutContext)
    return(
        <div className = "aboutContainer">
                 <div className = "header moveTrans">
                     <h2>
                             <TransitionLink 
        className = "link leftSlight"
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
        >WORK <img className = "navArrow" src = {arrow} /></TransitionLink>
                     </h2>
                 </div>
                <div className = "content">
                    <div className = "imageContainer moveTrans" weight = "large">
                        <Img fluid = {props.picture} />
                    </div>
                        <p className="moveTrans" weight = "large"><ReactMarkdown className = "markdown" source = {props.aboutText} /></p>
                </div>
                   
              <p className = "foot moveTrans">&copy;2020 Ben Swanson-Ralph</p>
        </div>    
    )
}

export default About