import * as React from "react"
import { graphql, Link } from "gatsby"
import styled, { css } from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightSLine as Chevron } from "react-icons/ri"

const Index = ({ data }) => {
  return (
    <main
      css={css`
        max-width: 960px;
        padding: 2rem;
        margin: auto;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        `}
      >
        <h1>Cases</h1>
      </div>
      {data.studyCases.nodes.map((studyCase) => (
        <div
          key={studyCase._id}
          css={css`
            border-top: 1px solid #eee;
            padding: 2rem 0 2rem;
            display: grid;
            grid-template-columns: auto 3fr 1fr;
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
            <p>{studyCase.summary}</p>
          </div>
          <div>
            <p>
              <Link to={"/cases/" + studyCase.slug.current}>
                Case Detail{" "}
                <Chevron
                  aria-hidden
                  css={css`
                    vertical-align: middle;
                  `}
                />
              </Link>
            </p>
            <p
              css={css`
                font-size: 0.75rem;
                color: #666;
              `}
            >
              {studyCase.caseDataTypes.flatMap(Object.values).join(", ")}
            </p>
            <p
              css={css`
                font-size: 0.75rem;
                color: #666;
              `}
            >
              {studyCase.time}
            </p>
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
        summary
        caseDataTypes {
          value
        }
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

export default Index
