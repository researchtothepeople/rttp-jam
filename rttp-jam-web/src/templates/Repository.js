import { graphql, Link } from "gatsby"
import { css } from "@emotion/react"
import ReactMarkdown from "react-markdown"
import PortableText from "../components/PortableText"
import imgLinks from "../vendor/remark-img-links"
import gfm from "remark-gfm"
import raw from "rehype-raw"
import sanitize from "rehype-sanitize"

const Repository = ({ data: { repository }, pageContext }) => {
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
        img {
          max-width: 100%;
        }
      `}
    >
      <div
        css={css`
          padding: 1rem 0;
          border-bottom: 1px solid #eee;
        `}
      >
        <Link to="/">Cases</Link>
        {repository?.studyCase && " / "}
        {repository?.studyCase && (
          <Link to={"/cases/" + repository?.studyCase?.slug?.current}>
            {repository?.studyCase?.name}: {repository?.studyCase?.topic}
          </Link>
        )}
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: 2fr 1fr;
          border-bottom: 1px solid #eee;
        `}
      >
        <h1
          css={css`
            font-size: 1.75rem;
            line-height: 1.2;
          `}
        >
          {repository.projectTitle}
        </h1>
        <div
          css={css`
            border-left: 1px solid #eee;
            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 24px;
            margin-left: 24px;
          `}
        >
          {repository.authors?.map((author) => (
            <div key={author.name}>
              {author.name}
              {author.affiliation && (
                <span
                  css={css`
                    font-size: 0.5em;
                    margin-left: 1em;
                  `}
                >
                  {author.affiliation}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      {repository.repositoryUrl && (
        <div
          css={css`
            padding: 1rem 0;
            border-bottom: 1px solid #eee;
          `}
        >
          <a href={repository.repositoryUrl}>GitHub Repository</a>
        </div>
      )}
      {/* <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        children={repository.description}
      /> */}
      {repository.descriptionSource === "readme" && (
        <ReactMarkdown
          children={pageContext.githubMarkdown}
          disallowedElements={["h1"]}
          remarkPlugins={[
            [
              imgLinks,
              { absolutePath: repository.repositoryUrl + "/raw/master/" },
            ],
            gfm,
          ]}
          rehypePlugins={[raw, sanitize]}
        />
      )}
      {repository.descriptionSource === "manual" && (
        <PortableText blocks={repository._rawBody} />
      )}
    </main>
  )
}

export const query = graphql`
  query ($repositoryId: String!) {
    repository: sanityRepository(_id: { eq: $repositoryId }) {
      projectTitle
      authors {
        name
        affiliation
      }
      repositoryUrl
      teamAffiliation
      studyCase {
        name
        topic
        slug {
          current
        }
      }
      descriptionSource
      _rawBody
    }
  }
`
export default Repository
