import React, { useContext } from "react"

import ReelItem from "./reelItem.jsx"
import LayoutContext from "./layoutContext.jsx"
import { useStaticQuery, graphql } from "gatsby"

const Reel = props => {
  let ctx = useContext(LayoutContext)
  let data = useStaticQuery(graphql`
    query ReelQuery {
      allStrapiProjects(sort: { order: ASC, fields: orderOfAppearance }) {
        edges {
          node {
            Palette {
              color1
            }
            title
            orderOfAppearance
            role
            video {
              publicURL
              relativePath
              absolutePath
            }
            focusPic {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            reelPic {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  `)
  let items = data.allStrapiProjects.edges
  const handleMouseLeave = () =>{
      ctx.cursorTransformation(false)
      ctx.updateCursorType("cursor")
  }
  return (
    <div
      style={{ display: "flex" }}
      onMouseLeave={() =>handleMouseLeave()}
    >
      {items.map(item => (
        <ReelItem
          updateShow={b => props.updateShow(b)}
          updateHover={num => props.updateHover(num)}
          showVideo={props.showVideo}
          time={props.time}
          updateCurrent={num => props.updateCurrent(num)}
          updateInfo={info => props.updateInfo(info)}
          current={props.current}
          key={item.node}
          item={item.node}
        />
      ))}
    </div>
  )
}
export default Reel
