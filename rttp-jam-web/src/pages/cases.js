import * as React from "react"
import { graphql, Link } from "gatsby"
import styled, { css } from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

const Cases = ({ data }) => {
  return (
    <main
      css={css`
        max-width: 960px;
        padding: 2rem;
        margin: auto;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        line-height: 1.35;
        a {
          color: #0466c8;
          text-decoration: none;
        }
      `}
    >
      <h1>All Cases</h1>
      {data.studyCases.nodes.map((studyCase) => (
        <div
          key={studyCase._id}
          css={css`
            border-top: 1px solid #eee;
            padding: 2rem 0 2rem;
            display: flex;
            gap: 3rem;
          `}
        >
          <div>
            {studyCase.photo && (
              <ProfilePicture
                image={studyCase.photo.asset.gatsbyImageData}
                alt={`A photo of ${studyCase.name}.`}
                $shouldCrop={studyCase.type === "person"}
              />
            )}
          </div>
          <div
            css={css`
              flex-grow: 1;
            `}
          >
            <h2
              css={css`
                margin-top: 0;
              `}
            >
              {studyCase.name}
              <br />
              <span
                css={css`
                  font-weight: normal;
                `}
              >
                {studyCase.topic}
              </span>
            </h2>
            <p>{studyCase.time}</p>
            <Link to={studyCase.slug.current}>Case Detail</Link>
          </div>
        </div>
      ))}
    </main>
  )
}

const ProfilePicture = styled(GatsbyImage)`
  width: 128px;
  object-fit: cover;
  border-radius: 0;
  z-index: 1;
  flex: 0 0 128px;
  ${({ $shouldCrop }) =>
    $shouldCrop &&
    css`
      border-radius: 128px;
    `}
`

export const query = graphql`
  {
    studyCases: allSanityStudyCase(sort: { fields: launchDate, order: DESC }) {
      nodes {
        name
        topic
        slug {
          current
        }
        _id
        time
        type
        photo {
          asset {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default Cases
