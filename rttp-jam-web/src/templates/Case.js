import * as React from "react"
import { graphql, Link } from "gatsby"
import styled, { css } from "styled-components"
import BlockContent from "@sanity/block-content-to-react"
import { GatsbyImage } from "gatsby-plugin-image"

const Case = ({ data: { studyCase, repositories, notes } }) => {
  return (
    <div
      css={css`
        max-width: 960px;
        padding: 2rem;
        margin: auto;
      `}
    >
      <header>
        <nav
          css={css`
            padding: 1rem 0;
            border-bottom: 1px solid #eee;
          `}
        >
          <Link to="/">Home</Link>
        </nav>
      </header>
      <section
        css={css`
          display: grid;
          margin-top: 3rem;
          grid-template-columns: 160px 1fr;
          gap: 40px;
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
          {studyCase.caseDataTypes.length > 0 && (
            <div
              css={css`
                margin-top: 3rem;
                border-top: 1px solid #eee;
                font-size: 0.875rem;
                color: var(--FG2);
              `}
            >
              <h2
                css={css`
                  font-size: 1em;
                  margin-bottom: 0.25em;
                `}
              >
                Available Data
              </h2>
              <p>{studyCase.caseDataTypes.flatMap(Object.values).join(", ")}</p>
            </div>
          )}
        </div>
        <div>
          <h1
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
          </h1>
          <BlockContent blocks={studyCase._rawBio} />
        </div>
      </section>
      {repositories.nodes.length > 0 && (
        <Section>
          <h2>Results</h2>
          <ul
            css={css`
              list-style: none;
              padding: 0;
            `}
          >
            {repositories.nodes.map((repository) => (
              <li key={repository._id}>
                <Link to={`/results/${repository.slug?.current}`}>
                  {repository.projectTitle}
                </Link>
                <div
                  css={css`
                    color: var(--FG2);
                    font-size: 0.75rem;
                    margin-left: 1ch;
                    margin-bottom: 1em;
                  `}
                >
                  {repository.authors.flatMap(Object.values).join(", ")}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}
      {notes.nodes.length > 0 && (
        <Section>
          <h2>Notes</h2>
          <ul
            css={css`
              list-style: none;
              padding: 0;
            `}
          >
            {notes.nodes.map((note) => (
              <li
                key={note._id}
                css={css`
                  margin-bottom: 1em;
                `}
              >
                <Link to={`/notes/${note.slug?.current}`}>{note.title}</Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  )
}

const ProfilePicture = styled(GatsbyImage)`
  object-fit: cover;
  border-radius: 0;
  z-index: 1;
  ${({ $shouldCrop }) =>
    $shouldCrop &&
    css`
      border-radius: 1024px;
    `}
`
const Section = styled.section`
  border-top: 1px solid #eee;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 40px;
  align-items: baseline;
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
      caseDataTypes {
        value
      }
      _rawBio
    }
    repositories: allSanityRepository(
      filter: { studyCase: { _id: { eq: $studyCaseId } } }
      sort: { fields: slug___current, order: ASC }
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
        authors {
          name
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
