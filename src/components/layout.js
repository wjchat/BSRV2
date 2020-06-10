import React,{useState, useCallback, useEffect} from "react"  
import PropTypes from "prop-types"

import "../assets/css/default.css"

import Seo from "./seo"
import Background from "./background.jsx"
import Cursor from './cursor.jsx'
import LayoutContext from "./layoutContext.jsx"
import cursorTransformation from './cursorTransformation.js'
import PageTransition from "./transition.jsx"
import {TransitionPortal} from "gatsby-plugin-transition-link"
import { gsap } from "../esm/all";
import { CustomEase } from "../esm/CustomEase";

gsap.registerPlugin(CustomEase);
const Layout = (props) => {  
    useEffect(()=>{
        console.log("Website by Will Chatterson <wchatterson@gmail.com>")
    }, [])
    CustomEase.create("slick", ".25,.1,.25,1");
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
             <Background />
          <main>{props.children}</main>
          <TransitionPortal>
              <PageTransition trigger = {trigger}/>
          </TransitionPortal>
            <Cursor cursorType = {cursorType} />
      </LayoutContext.Provider>   
      
    </>
  )
}

Layout.propTypes = {  
  children: PropTypes.node.isRequired,
}

export default Layout