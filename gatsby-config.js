module.exports = {
  siteMetadata: {
    title: `The portfolio of Ben Swanson-Ralph.`,
    description: `The portfolio of cinemetographer, editor, and photographer Ben Swanson-Ralph.`,
    author: `Will Chatterson`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-image`,
       {
          resolve: "gatsby-plugin-transition-link",
          options: {
            }
       },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: "https://bsr-portfolio.herokuapp.com",
        contentTypes: [
          // List of the Content Types you want to be able to request from Gatsby.
          "projects",
        ],
        singleTypes: [
          "about-ben",
            "social-links",
        ],
        queryLimit: 1000,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
