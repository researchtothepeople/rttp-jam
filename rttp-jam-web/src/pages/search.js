import { createRef, default as React, useState, useMemo } from "react"
import styled, { css, ThemeProvider } from "styled-components"
import SearchBox from "../components/search/SearchBox"
import SearchResult from "../components/search/SearchResult"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch } from "react-instantsearch-dom"
import "instantsearch.css/themes/satellite.css"

const indices = [{ name: `repositories`, title: `Repositories` }]

const Search = () => {
  const rootRef = createRef()
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
      ),
    []
  )
  return (
    <div ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
        <SearchResult
          show={query && query.length > 0 && hasFocus}
          indices={indices}
        />
      </InstantSearch>
    </div>
  )
}

export default Search
