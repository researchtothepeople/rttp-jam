import { graphql, Link } from "gatsby"
import { css } from "@emotion/react"

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
      <h1>Cases & Results</h1>
      {data.studyCases.nodes.map((studyCase) => (
        <div
          key={studyCase._id}
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
            <p>{studyCase.time}</p>
            <Link to={studyCase.slug.current}>Case Detail</Link>
          </div>
        </div>
      ))}
    </main>
  )
}

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
      }
    }
  }
`

export default Cases
