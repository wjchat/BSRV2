import React from "react"
import Layout from "../components/layout.js"
import About from "../components/aboutBen.jsx"
import { useStaticQuery, graphql } from "gatsby"

const AboutBen = () => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      strapiAboutBen {
        aboutText
        picture {
          childImageSharp {
            fluid(quality: 100){
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  `)
  let aboutText = data.strapiAboutBen.aboutText
  let picture = data.strapiAboutBen.picture.childImageSharp.fluid
  return (
    <Layout title="About Ben">
      <About 
      aboutText = {aboutText}
      picture = {picture}
      />
    </Layout>
  )
}

export default AboutBen
