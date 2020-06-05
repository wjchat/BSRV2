import React, {useEffect, useContext}  from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import LayoutContext from "../components/layoutContext.jsx"
import "../sass/about-ben.scss"
import Img from "gatsby-image"


const About = props =>{
    let ctx = useContext(LayoutContext)
    return(
        <div className = "aboutContainer">
                 <div className = "header">
                     <h2>
                             <TransitionLink 
        className = "link"
        to="/"
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
        >WORK</TransitionLink>
                     </h2>
                 </div>
                <div className = "content">
                    <div className = "imageContainer">
                        <Img fluid = {props.picture} />
                    </div>
                        <p>{props.aboutText}</p>
                </div>
                   
              <p className = "foot">&copy;2020 Ben Swanson-Ralph</p>
        </div>    
    )
}

export default About