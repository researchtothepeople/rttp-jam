import * as React from "react"
import { graphql, Link } from "gatsby"
import styled, { css } from "styled-components"
import ReactMarkdown from "react-markdown"
import PortableText from "../components/PortableText"
import imgLinks from "@pondorasti/remark-img-links"
import gfm from "remark-gfm"
import raw from "rehype-raw"
import sanitize from "rehype-sanitize"

const Repository = ({ data: { repository, github = null } }) => {
  return (
    <div
      css={css`
        max-width: 960px;
        padding: 2rem;
        margin: auto;
        img {
          max-width: 100%;
        }
      `}
    >
      <nav
        css={css`
          padding: 1rem 0;
          border-bottom: 1px solid #eee;
        `}
      >
        <Link to="/">Home</Link>
        {" | "}
        {repository?.studyCase && (
          <Link to={"/cases/" + repository?.studyCase?.slug?.current}>
            {repository?.studyCase?.name}: {repository?.studyCase?.topic}
          </Link>
        )}
        {" / Results"}
      </nav>
      <main>
        <div
          css={css`
            display: grid;
            grid-template-columns: 3fr 1fr;
            border-bottom: 1px solid #eee;
          `}
        >
          <h1
            css={css`
              font-size: 1.75rem;
              line-height: 1.2;
              margin: 1rem 0;
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
        <div
          css={css`
            display: grid;
            grid-template-columns: 3fr 1fr;
            padding: 1rem 0;
          `}
        >
          <div>
            {/* <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              children={repository.description}
            /> */}
            {repository.descriptionSource === "readme" && (
              <ReactMarkdown
                children={github.resource.object.text.replaceAll(
                  "/blob/",
                  "/raw/"
                )}
                disallowedElements={["h1"]}
                remarkPlugins={[
                  [
                    imgLinks,
                    { absolutePath: repository.repositoryUrl + "/raw/master/" },
                  ],
                  gfm,
                  // math
                ]}
                rehypePlugins={[
                  raw,
                  // katex
                  sanitize,
                ]}
              />
            )}
            {repository.descriptionSource === "manual" && (
              <PortableText blocks={repository._rawBody} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export const query = graphql`
  query (
    $repositoryId: String!
    $withGitHubReadme: Boolean!
    $repositoryUrl: GitHub_URI!
  ) {
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
    github @include(if: $withGitHubReadme) {
      resource(url: $repositoryUrl) {
        ... on GitHub_Repository {
          nameWithOwner
          url
          updatedAt
          object(expression: "master:README.md") {
            ... on GitHub_Blob {
              text
            }
          }
        }
      }
    }
  }
`
export default Repository
