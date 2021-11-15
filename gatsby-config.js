module.exports = {
  siteMetadata: {
    title: `Nate Wolfe`,
    description: `Hi, I'm Nate. I'm a frontend web developer focused on the future decentralized web.`,
    author: `@wxlfe`,
    siteUrl: `https://wxlfe.dev/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'wdcyy16y',
        dataset: 'production'
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nate Wolfe Portfolio`,
        short_name: `Nate Wolfe`,
        start_url: `/`,
        background_color: `#d1ad54`,
        theme_color: `#d1ad54`,
        display: `minimal-ui`,
        icon: `src/images/wxlfe-gold.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `wxlfe.dev`,
      },
    },
  ],
}
