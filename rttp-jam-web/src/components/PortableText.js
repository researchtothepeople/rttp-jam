import React from "react"
import BasePortableText from "@sanity/block-content-to-react"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { GatsbyImage } from "gatsby-plugin-image"

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
}

const serializers = {
  types: {
    figure: ({ node }) => {
      const gatsbyImageData = getGatsbyImageData(
        node.image.asset._ref,
        { placeholder: "dominantColor" },
        sanityConfig
      )
      console.log(gatsbyImageData)
      return (
        <figure>
          {/* <pre>{JSON.stringify(props, null, " ")}</pre> */}
          <GatsbyImage image={gatsbyImageData} alt="" />
          <figcaption>{node.caption}</figcaption>
        </figure>
      )
    },
    file: ({ node }) => {
      return <pre>{JSON.stringify(node, null, " ")}</pre>
    },
  },
}

const PortableText = ({ blocks }) => (
  <BasePortableText blocks={blocks} serializers={serializers} />
)

export default PortableText
