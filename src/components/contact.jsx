import React, {useState, useContext} from "react"
import ContactHalf from "./contactHalf.jsx"
import insta from '../assets/images/insta.svg'
import vimeo from '../assets/images/vimeo.svg'
import "../sass/contact.scss"
import TransitionLink from "gatsby-plugin-transition-link"
import LayoutContext from "./layoutContext.jsx"

const Contact = (props) =>{
    const [focus, updateFocus] = useState("first") 
    let ctx = useContext(LayoutContext)
    return(<div className = "contactPage">
        <ContactHalf 
        focus = {focus} 
        item = "first"
        updateFocus = {(ting)=>updateFocus(ting)}
        >
           <h2 className = "change"><TransitionLink to = "/"
        onMouseOver={() => ctx.cursorTransformation(true)}
        onMouseLeave={() => ctx.cursorTransformation(false)}
        exit = {{
                  length: 3,
                    trigger: ()=>ctx.triggerTrans("left")
              }}
        entry = {{
                  delay: .7,
              }}
           >
           BSR
           </TransitionLink>
           </h2>
           <div className = "center">
            <h1 className = "change">EMAIL</h1>
            <div className = "info">
                <h3>benswansonralph@gmail.com</h3>
            </div>
           </div>
        </ContactHalf>
        
        <ContactHalf 
        focus = {focus} 
        item = "second"
        updateFocus = {(ting)=>updateFocus(ting)}>
           <h2></h2>
           <div className = "center">
            <h1 className = "change">SOCIAL</h1>
            <div className = "info image">
                <img src={insta} alt="instagram"/>
                <img src={vimeo} alt="instagram"/>
            </div>
            <p className = "change foot">&copy;2020 Ben Swanson-Ralph</p>
           </div>
            </ContactHalf>
        
    </div>)
}

export default Contact