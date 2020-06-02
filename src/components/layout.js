import React,{useState, useCallback} from "react"  
import PropTypes from "prop-types"

import "../assets/css/default.css"

import Seo from "./seo"
import Cursor from './cursor.jsx'
import LayoutContext from "./layoutContext.jsx"
import cursorTransformation from './cursorTransformation.js'
import PageTransition from "./transition.jsx"
import {TransitionPortal} from "gatsby-plugin-transition-link"
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
const Layout = (props) => {  
    CustomEase.create("slick", "M0,0 C0,0 0.164,0 0.22,0.064 0.309,0.166 0.289,0.432 0.3,0.51 0.338,0.788 0.39,0.882 0.458,0.926 0.546,0.982 0.698,1 1,1");
    CustomEase.create("slickIn", "M0,0 C0.5,0 0.826,0.086 0.87,0.112 0.965,0.169 0.9,0.23 1,1 ");
                      
    
    const [cursorType, updateCursorType] = useState("cursor") 
    const [trigger, triggerTrans] = useState(false)
    
    const memoContext = useCallback(()=>{
        return({
            cursorType: cursorType,
            updateCursorType: (crs)=>updateCursorType(crs),
            cursorTransformation: (grow, color) => cursorTransformation(grow, color),
            triggerTrans: (b)=>triggerTrans(b),
        })
    }, [cursorType, updateCursorType])
  return (
    <>
      <head>
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,900;1,400;1,900&display=swap" rel="stylesheet"></link>
      </head>
      <Seo title = {props.title}/>
      
      <LayoutContext.Provider 
         value = {memoContext()}
         >
          <main>{props.children}</main>
          <Cursor cursorType = {cursorType} />
          <TransitionPortal>
              <PageTransition trigger = {trigger}/>
          </TransitionPortal>
      </LayoutContext.Provider>   
      
    </>
  )
}

Layout.propTypes = {  
  children: PropTypes.node.isRequired,
}

export default Layout