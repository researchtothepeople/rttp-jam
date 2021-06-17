import { graphql, Link } from "gatsby"
import { css } from "@emotion/react"
import SanityImage from "gatsby-plugin-sanity-image"
import styled from "@emotion/styled"
import BlockContent from "@sanity/block-content-to-react"

const Case = ({ data }) => {
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
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        `}
      >
        <Link to="/cases">Cases</Link>
      </nav>
      <header
        css={css`
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        `}
      >
        <div
          css={css`
            margin-right: 2rem;
          `}
        >
          <h1>
            {data.studyCase.name}
            <br />
            <span
              css={css`
                font-weight: normal;
              `}
            >
              {data.studyCase.topic}
            </span>
          </h1>
          <BlockContent blocks={data.studyCase._rawBio} />
        </div>
        <ProfilePicture
          {...data.studyCase.photo}
          width={256}
          alt={`A photo of ${data.studyCase.name}.`}
        />
      </header>
      <main>
        <Section>
          <h2>Results</h2>
          {data.repositories.nodes
            .filter(
              (repository) => repository.studyCase._id === data.studyCase._id
            )
            .map((repository) => (
              <div
                key={repository._id}
                css={css`
                  padding: 1rem 0;
                `}
              >
                <Link to={`results/${repository.slug.current}`}>
                  {repository.projectTitle}
                </Link>
              </div>
            ))}
        </Section>
        <Section>
          <h2>Notes</h2>
          {data.notes.nodes
            .filter((note) => note.studyCase._id === data.studyCase._id)
            .map((note) => (
              <div
                key={note._id}
                css={css`
                  padding: 1rem 0;
                `}
              >
                <Link to={`notes/${note.slug.current}`}>{note.title}</Link>
              </div>
            ))}
        </Section>
      </main>
    </div>
  )
}

const ProfilePicture = styled(SanityImage)`
  width: 256px;
  height: 256px;
  object-fit: cover;
  border-radius: 256px;
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
      time
      photo {
        ...ImageWithPreview
      }
      _rawBio
    }
    repositories: allSanityRepository {
      nodes {
        _id
        name
        projectTitle
        slug {
          current
        }
        studyCase {
          _id
        }
      }
    }
    notes: allSanityNote(sort: { fields: date, order: DESC }) {
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
