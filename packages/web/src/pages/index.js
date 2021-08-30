import * as React from "react"
import { graphql, Link } from "gatsby"
import styled, { css } from "styled-components"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { RiArrowRightSLine as Chevron } from "react-icons/ri"
import { RiSearchLine as SearchIcon } from "react-icons/ri"

const Index = ({ data }) => {
  return (
    <Wrapper>
      <Header>
        <HomeNav>
          <HomeLink href="https://www.researchtothepeople.org/">
            <StaticImage
              src="../images/icon.png"
              alt=""
              width={36}
              placeholder="none"
            />
            Research to the People
          </HomeLink>
          <Link to="/">Case Archive</Link>
          <Spacer />
          <Link to="/search">
            <SearchIcon aria-label="Search" />
          </Link>
        </HomeNav>
      </Header>
      <Main>
        <h1>Cases</h1>
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
      </Main>
      <Footer>
        <div>
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://www.researchtothepeople.org/">
            Research to the People
          </a>
          , unless otherwise noticed.
        </div>
        <div>
          Structured content powered by{" "}
          <a href="https://www.sanity.io/">Sanity.io</a>
        </div>
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const HomeNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1em;
  color: black;
  a {
    color: inherit;
  }
`

const Header = styled.header`
  max-width: 960px;
  margin: auto;
  padding: 2rem 0;
`

const HomeLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1em;
  color: black;
  font-weight: 700;
  text-transform: uppercase;
  font-variation-settings: "wdth" 80;
`

const Spacer = styled.div`
  flex: 1 1 auto;
`

const Main = styled.main`
  max-width: 960px;
  margin: auto;
`

const Footer = styled.footer`
  font-size: 0.75rem;
  border-top: 1px solid #eee;
  max-width: 960px;
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
