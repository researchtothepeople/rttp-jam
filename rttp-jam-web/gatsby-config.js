require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: "RTTP Jam",
  },
  plugins: [
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        watchMode: process.env.NODE_ENV === "development",
        overlayDrafts: process.env.NODE_ENV === "development",
        useCdn: !process.env.NODE_ENV === "development",
      },
    },
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
      },
    },
    "gatsby-plugin-emotion",
    // {
    //   resolve: "gatsby-plugin-google-analytics",
    //   options: {
    //     trackingId: "",
    //   },
    // },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    // "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
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
  ],
}
