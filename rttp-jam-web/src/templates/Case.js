import { graphql, Link } from "gatsby"
import { css } from "@emotion/react"

const Case = ({ data }) => {
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
      <div
        css={css`
          padding: 1rem 0;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        `}
      >
        <Link to="/cases">Cases</Link>
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: 2fr 1fr;
        `}
      >
        <h1
          css={css`
            font-size: 1.75rem;
            line-height: 1.2;
          `}
        >
          {data.studyCase.name}: {data.studyCase.topic}
        </h1>
      </div>
      <div>
        <h3>Results</h3>
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
        <h3>Notes</h3>
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
      </div>
    </main>
  )
}

export const query = graphql`
  query ($studyCaseId: String!) {
    studyCase: sanityStudyCase(_id: { eq: $studyCaseId }) {
      _id
      slug {
        current
      }
      name
      topic
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
