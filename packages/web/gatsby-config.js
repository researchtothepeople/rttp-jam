process.env.NODE_ENV === "development" && require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: "RTTP Jam",
  },
  plugins: [
    `gatsby-plugin-netlify`,
    // `gatsby-plugin-gatsby-cloud`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        dataset: process.env.GATSBY_SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        watchMode: process.env.NODE_ENV === "development",
        overlayDrafts: process.env.NODE_ENV === "development",
        useCdn: !(process.env.NODE_ENV === "development"),
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        },
        batch: true,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_API_KEY,
        queries: require("./src/utils/algolia-queries"),
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.js`),
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    // "gatsby-plugin-sitemap",
    // {
    //   resolve: "gatsby-plugin-google-analytics",
    //   options: {
    //     trackingId: "",
    //   },
    // },
  ],
}
