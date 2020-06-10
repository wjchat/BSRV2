import React from "react";
import Layout from "../components/layout.js"
import Contact from "../components/contact.jsx"
import { useStaticQuery, graphql } from "gatsby"

const ContactPage = () =>{
    let data = useStaticQuery(graphql`
    query Social {
      strapiSocialLinks {
        email
        instagram
        vimeo
      }
    }
`)
    let info = data.strapiSocialLinks
    return(
        <Layout title = "Contact">
        <div className = "desktopView">
           <Contact
           mobile = {false}
           email = {info.email}
           insta = {info.instagram}
           vimeo = {info.vimeo}
             />
        </div>        
        <div className = "mobileView">
           <Contact
           mobile = {true}
           email = {info.email}
           insta = {info.instagram}
           vimeo = {info.vimeo}
             />
        </div>
        </Layout>
          )
}

export default ContactPage