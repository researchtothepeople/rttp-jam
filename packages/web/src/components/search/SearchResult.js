import * as React from "react"
import { Link } from "gatsby"
import { Highlight, Hits, Index } from "react-instantsearch-dom"

const PageHit = ({ hit }) => (
  <article>
    <div>
      <strong>
        <Highlight attribute="projectTitle" hit={hit} tagName="mark" />
      </strong>
    </div>
    <div>
      <Highlight attribute="studyCase.topic" hit={hit} tagName="mark" />
      {" - "}
      <Highlight attribute="studyCase.name" hit={hit} tagName="mark" />
    </div>
  </article>
)

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    {/* <HitCount /> */}
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
)

const SearchResult = ({ indices, className }) => (
  <div>
    {indices.map((index) => (
      <HitsInIndex index={index} key={index.name} />
    ))}
  </div>
)

export default SearchResult
