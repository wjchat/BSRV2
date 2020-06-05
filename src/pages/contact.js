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
           <Contact
           email = {info.email}
           insta = {info.instagram}
           vimeo = {info.vimeo}
             />
        </Layout>
          )
}

export default ContactPage