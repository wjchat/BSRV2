import React, {useEffect} from "react"

import Layout from "../components/layout"
import Home from "../components/home.jsx"

const IndexPage = () => {
    useEffect(()=>{
        console.log("Website by Will Chatterson <will@willchatterson.com>")
    }, [])
    return(
    <Layout title = "Ben Swanson-Ralph">
        <div className = "desktopView">
            <Home mobile = {false} />
        </div>
        <div className = "mobileView">
            <Home mobile = {true}/>
        </div>
    </Layout>
    )
}

export default IndexPage 