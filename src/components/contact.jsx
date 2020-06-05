import React, {useState, useContext, useEffect} from "react"
import ContactHalf from "./contactHalf.jsx"
import insta from '../assets/images/insta.svg'
import instaColor from '../assets/images/instaColor.svg'
import vimeo from '../assets/images/vimeo.svg'
import vimeoColor from '../assets/images/vimeoColor.svg'
import "../sass/contact.scss"
import TransitionLink from "gatsby-plugin-transition-link"
import LayoutContext from "./layoutContext.jsx"
import Email from "./email.jsx"
import ImageSwitch from "./imageSwitch.jsx"


const Contact = (props) =>{
    const [focus, updateFocus] = useState("first") 
    let ctx = useContext(LayoutContext)
    let black = "#1B1818"
    useEffect(()=>{
        setTimeout(()=>{
            ctx.cursorTransformation(false, black)
        }, 400)
    }, [])
    return(<div className = "contactPage">   
        <ContactHalf 
        focus = {focus} 
        item = "second"
        updateFocus = {(ting)=>updateFocus(ting)}>
           <h2 className = "change"><TransitionLink 
           className = "link"
           to = "/"
        onMouseOver={() => ctx.cursorTransformation(true)}
        onMouseLeave={() => ctx.cursorTransformation(false,black)}
        exit = {{
                  length: 1.4,
                    trigger: ()=>ctx.triggerTrans("left")
              }}
        entry = {{
                  delay: .7,
              }}
           >
           WORK
           </TransitionLink>
           </h2>
           <div className = "center">
            <h1 className = "change">SOCIAL</h1>
            <div className = "info image">
               <ImageSwitch 
               link = {props.insta}
                onMouseEnter={() => ctx.cursorTransformation(true)}
                onMouseLeave={() => ctx.cursorTransformation(false, black)}
               imageOne = {insta}
               imageTwo = {instaColor}
               />               
               <ImageSwitch 
               link = {props.vimeo}
                onMouseEnter={() => ctx.cursorTransformation(true)}
                onMouseLeave={() => ctx.cursorTransformation(false, black)}
               imageOne = {vimeo}
               imageTwo = {vimeoColor}
               /> 
            </div>
           </div>
            </ContactHalf>
            <ContactHalf 
            focus = {focus} 
            item = "first"
            updateFocus = {(ting)=>updateFocus(ting)}
            >
              <h2></h2>
               <div className = "center">
                <h1 className = "change">EMAIL</h1>
                <div className = "info">
                    <Email 
                    onMouseEnter = {()=>ctx.cursorTransformation(true)}
                    onMouseLeave = {()=>ctx.cursorTransformation(false, black)}
                    email = {props.email}
                    message = {"EMAIL COPIED TO CLIPBOARD"}
                    />
                </div>
               </div>
            <p className = "change foot">&copy;2020 Ben Swanson-Ralph</p>
            </ContactHalf>
    </div>)
}

export default Contact