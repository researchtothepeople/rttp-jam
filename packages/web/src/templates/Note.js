import * as React from "react"
import { graphql, Link } from "gatsby"
import styled, { css } from "styled-components"
import BlockContent from "@sanity/block-content-to-react"

const Note = ({ data: { note } }) => {
  return (
    <div
      css={css`
        max-width: 960px;
        padding: 2rem;
        margin: auto;
      `}
    >
      <nav
        css={css`
          padding: 1rem 0;
          border-bottom: 1px solid #eee;
        `}
      >
        <Link to="/">Results</Link>
        {" / "}
        <Link to={"/" + note.studyCase.slug.current}>
          {note.studyCase.name}: {note.studyCase.topic}
        </Link>
        {" / Notes"}
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
            {note.title}
          </h1>
          <div
            css={css`
              border-left: 1px solid #eee;
              padding-top: 20px;
              margin-left: 24px;
              padding-left: 24px;
            `}
          >
            {note.authors.map((author) => (
              <div key={author.name}>
                {author.name}
                <span
                  css={css`
                    font-size: 0.5em;
                    margin-left: 1em;
                  `}
                >
                  {author.affiliation}
                </span>
              </div>
            ))}
            <div>
              {new Date(note.date).toLocaleDateString([], {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
        <div
          css={css`
            margin-top: 1rem;
            display: grid;
            grid-template-columns: 3fr 1fr;
          `}
        >
          <BlockContent blocks={note._rawBody} />
        </div>
      </main>
    </div>
  )
}

export const query = graphql`
  query ($noteId: String!) {
    note: sanityNote(_id: { eq: $noteId }) {
      title
      authors {
        name
        affiliation
      }
      studyCase {
        name
        topic
        slug {
          current
        }
      }
      date
      _rawBody
    }
  }
`
export default Note
