import * as React from "react"
import { Link } from "gatsby"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom"

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div className={HitCount}>
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null
})

const PageHit = ({ hit }) => (
  <article>
    <h4>
      <Highlight attribute="projectTitle" hit={hit} tagName="mark" />
    </h4>
    <p>
      <Highlight attribute="studyCase.topic" hit={hit} tagName="mark" />
      {" - "}
      <Highlight attribute="studyCase.name" hit={hit} tagName="mark" />
    </p>
  </article>
)

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
)

const SearchResult = ({ indices, className }) => (
  <div>
    {indices.map((index) => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </div>
)

export default SearchResult
