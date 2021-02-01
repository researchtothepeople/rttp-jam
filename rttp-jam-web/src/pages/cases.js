import { graphql, Link } from "gatsby"
import { css } from "@emotion/react"

export default ({ data }) => {
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
      <h1>Cases & Results</h1>
      {data.studyCases.nodes.map((studyCase) => (
        <div
          css={css`
            border-top: 1px solid #eee;
            padding: 1rem 0 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
          `}
        >
          <div>
            <h2>
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
            <Link to={studyCase.slug.current}>Case Detail</Link>
          </div>
          <div>
            {data.repositories.nodes
              .filter(
                (repository) => repository.studyCase._id === studyCase._id
              )
              .map((repository) => {
                return (
                  <div
                    css={css`
                      padding: 1rem 0;
                    `}
                  >
                    <Link
                      to={`${studyCase.slug.current}/results/${repository.slug.current}`}
                    >
                      {repository.projectTitle}
                    </Link>
                  </div>
                )
              })}
          </div>
        </div>
      ))}
    </main>
  )
}

export const query = graphql`
  {
    studyCases: allSanityStudyCase {
      nodes {
        name
        topic
        slug {
          current
        }
        _id
      }
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
  }
`
