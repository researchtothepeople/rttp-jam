import * as React from "react"
import { graphql, Link } from "gatsby"
import styled, { css } from "styled-components"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { RiArrowRightSLine as Chevron } from "react-icons/ri"
import { RiSearchLine as SearchIcon } from "react-icons/ri"

const Index = ({ data }) => {
  return (
    <>
      <Main>
        <div
          css={css`
            display: grid;
            grid-template-columns: 128px 3fr auto;
            gap: 3rem;
            align-items: baseline;
          `}
        >
          <h1>Results</h1>
          <p
            css={css`
              color: #666;
            `}
          >
            Quickly iterated patient research.
          </p>
          <Link to="/search">
            <SearchIcon aria-label="Search" />
          </Link>
        </div>
        {data.studyCases.nodes.map((studyCase) => (
          <div
            key={studyCase._id}
            css={css`
              border-top: 1px solid #eee;
              padding: 2rem 0 2rem;
              display: grid;
              grid-template-columns: 128px 3fr auto;
              gap: 3rem;
              position: relative;
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
              {/* <p>{studyCase.summary}</p> */}
              <p
                css={css`
                  font-size: 0.75rem;
                  margin: 0;
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
            <div>
              <p>
                <Link
                  to={"/" + studyCase.slug.current}
                  css={css`
                    ::after {
                      display: block;
                      content: "";
                      position: absolute;
                      inset: 0;
                    }
                  `}
                >
                  See Results{" "}
                  <Chevron
                    aria-hidden
                    css={css`
                      vertical-align: middle;
                    `}
                  />
                </Link>
              </p>
            </div>
          </div>
        ))}
      </Main>
      <Footer>
        <div>
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://www.researchtothepeople.org/">
            Research to the People
          </a>
          , unless otherwise noticed. Research results belong to their
          respective contributors.
        </div>
        <div>
          Structured content powered by{" "}
          <a href="https://www.sanity.io/">Sanity.io</a>
        </div>
      </Footer>
    </>
  )
}

export default Index
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

const Spacer = styled.div`
  flex: 1 1 ${({ $basis }) => $basis || 0};
`

const Main = styled.main`
  max-width: 1020px;
  padding: 0 20px;
  margin: auto;
`

const Footer = styled.footer`
  font-size: 0.75rem;
  border-top: 1px solid #eee;
  max-width: 1020px;
  padding: 0 20px;
  margin: auto;
  color: #999;
  padding: 1em 0 2em;
  display: flex;
  justify-content: space-between;
  a {
    color: inherit;
  }
`

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
