import { graphql, Link } from "gatsby"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import BlockContent from "@sanity/block-content-to-react"
import { GatsbyImage } from "gatsby-plugin-image"

const Case = ({ data: { studyCase, repositories, notes } }) => {
  return (
    <div
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
      <nav
        css={css`
          padding: 1rem 0;
          /* border-top: 1px solid #eee; */
          border-bottom: 1px solid #eee;
        `}
      >
        <Link to="/">Cases</Link>
      </nav>
      <header
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 1rem;
        `}
      >
        <div
          css={css`
            margin-right: 4rem;
          `}
        >
          <h1>
            {studyCase.name}
            <br />
            <span
              css={css`
                font-weight: normal;
              `}
            >
              {studyCase.topic}
            </span>
          </h1>
          <BlockContent blocks={studyCase._rawBio} />
        </div>
        <div>
          {studyCase.photo && (
            <ProfilePicture
              image={studyCase.photo.asset.gatsbyImageData}
              alt={`A photo of ${studyCase.name}.`}
              $shouldCrop={studyCase.type === "person"}
            />
          )}
        </div>
      </header>
      <main>
        {repositories.nodes.length > 0 && (
          <Section>
            <h2>Results</h2>
            {repositories.nodes.map((repository) => (
              <div
                key={repository._id}
                css={css`
                  padding: 1rem 0;
                `}
              >
                <Link to={`/results/${repository.slug.current}`}>
                  {repository.projectTitle}
                </Link>
              </div>
            ))}
          </Section>
        )}
        {notes.nodes.length > 0 && (
          <Section>
            <h2>Notes</h2>
            {notes.nodes.map((note) => (
              <div
                key={note._id}
                css={css`
                  padding: 1rem 0;
                `}
              >
                <Link to={`/notes/${note.slug.current}`}>{note.title}</Link>
              </div>
            ))}
          </Section>
        )}
      </main>
    </div>
  )
}

const ProfilePicture = styled(GatsbyImage)`
  width: 256px;
  object-fit: cover;
  border-radius: 0;
  z-index: 1;
  flex: 0 0 256px;
  ${({ $shouldCrop }) =>
    $shouldCrop &&
    css`
      border-radius: 256px;
    `}
`
const Section = styled.section`
  border-top: 1px solid #eee;
  margin-top: 2rem;
`

export const query = graphql`
  query ($studyCaseId: String!) {
    studyCase: sanityStudyCase(_id: { eq: $studyCaseId }) {
      _id
      slug {
        current
      }
      name
      topic
      type
      time
      photo {
        asset {
          gatsbyImageData(placeholder: NONE)
        }
      }
      _rawBio
    }
    repositories: allSanityRepository(
      filter: { studyCase: { _id: { eq: $studyCaseId } } }
    ) {
      nodes {
        _id
        projectTitle
        slug {
          current
        }
        studyCase {
          _id
        }
      }
    }
    notes: allSanityNote(
      filter: { studyCase: { _id: { eq: $studyCaseId } } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        _id
        title
        slug {
          current
        }
        studyCase {
          _id
        }
      }
    }
  }
`

export default Case
