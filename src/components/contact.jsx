import React, { useState, useContext, useEffect } from "react"
import ContactHalf from "./contactHalf.jsx"
import insta from "../assets/images/insta.svg"
import instaColor from "../assets/images/instaColor.svg"
import vimeo from "../assets/images/vimeo.svg"
import vimeoColor from "../assets/images/vimeoColor.svg"
import "../sass/contact.scss"
import TransitionLink from "gatsby-plugin-transition-link"
import LayoutContext from "./layoutContext.jsx"
import Email from "./email.jsx"
import ImageSwitch from "./imageSwitch.jsx"
import arrow from "../assets/images/blackarrow.svg"
import moveItems from "./moveitems.js"


const Contact = props => {
  const [focus, updateFocus] = useState("first")
  let ctx = useContext(LayoutContext)
  let black = "#1B1818"
  useEffect(() => {
    setTimeout(() => {
      ctx.cursorTransformation(false, black)
    }, 400)
  }, [])
  return (
    <div className="contactPage">
      <ContactHalf
        mobile={props.mobile}
        focus={focus}
        item="second"
        updateFocus={ting => updateFocus(ting)}
      >
        <h2 className="change">
          <TransitionLink
            className="link moveTrans rightSlight"
            to="/"
            onMouseOver={() => ctx.cursorTransformation(true)}
            onMouseLeave={() => ctx.cursorTransformation(false, black)}
            exit={{
              length: 1.4,
              trigger: () => {
                  ctx.triggerTrans("left")
                moveItems("left", "start")       
              },
            }}
            entry={{
              delay: 0.7,
                trigger: () => moveItems("right"),
            }}
          >
            <img className = "navArrow" src={arrow} alt=""/> WORK 
          </TransitionLink>
        </h2>
        <div className="center">
          <h1 className="change moveTrans" weight = "large">SOCIAL</h1>
          <div className="info image">
            <p>
              <a
                onMouseEnter={() => {
                        ctx.cursorTransformation(true)
                        ctx.updateCursorType("newTab")
                        }
                    }
                onMouseLeave={() => {
                        ctx.cursorTransformation(false, black)
                        ctx.updateCursorType("cursor")
                                    }
                    }
                    
                href={props.insta}
              >
                INSTAGRAM
              </a>
            </p>{" "}
            <br />
            <p>
              <a
                onMouseEnter={() => {
                        ctx.cursorTransformation(true)
                        ctx.updateCursorType("newTab")
                        }
                    }
                onMouseLeave={() => {
                        ctx.cursorTransformation(false, black)
                        ctx.updateCursorType("cursor")
                                    }
                    }
                href={props.vimeo}
              >
                VIMEO
              </a>
            </p>
          </div>
        </div>
      </ContactHalf>
      <ContactHalf
        mobile={props.mobile}
        focus={focus}
        item="first"
        updateFocus={ting => updateFocus(ting)}
      >
        <h2></h2>
        <div className="center">
          <h1 className="change moveTrans" weight = "large">EMAIL</h1>
          <div className="info image moveTrans">
            <Email
                onMouseEnter={() => {
                        ctx.cursorTransformation(true)
                        ctx.updateCursorType("copy")
                        }
                    }
                onMouseLeave={() => {
                        ctx.cursorTransformation(false, black)
                        ctx.updateCursorType("cursor")
                                    }
                    }
              email={props.email}
              message={"EMAIL COPIED TO CLIPBOARD"}
            />
          </div>
        </div>
        <p className="change foot moveTrans">&copy;2020 Ben Swanson-Ralph</p>
      </ContactHalf>
    </div>
  )
}

export default Contact
