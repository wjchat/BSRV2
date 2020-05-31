import React,{useState, useCallback} from "react"  
import PropTypes from "prop-types"

import "../assets/css/default.css"

import Seo from "./seo"
import Cursor from './cursor.jsx'
import LayoutContext from "./layoutContext.jsx"
import cursorTransformation from './cursorTransformation.js'
import PageTransition from "./transition.jsx"
import {TransitionPortal} from "gatsby-plugin-transition-link"


const Layout = (props) => {  
    const [cursorType, updateCursorType] = useState("cursor") 
    const [trigger, triggerTrans] = useState(false)
    const memoContext = useCallback(()=>{
        return({
            cursorType: cursorType,
            updateCursorType: (crs)=>updateCursorType(crs),
            cursorTransformation: (grow, color) => cursorTransformation(grow, color),
            triggerTrans: (b)=>triggerTrans(b)
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