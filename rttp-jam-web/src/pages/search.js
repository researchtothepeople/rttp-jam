import { createRef, default as React, useState, useMemo } from "react"
import styled, { css, ThemeProvider } from "styled-components"
import SearchBox from "../components/search/SearchBox"
import SearchResult from "../components/search/SearchResult"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, PoweredBy } from "react-instantsearch-dom"
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
    <Wrapper ref={rootRef}>
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
        <PoweredBy />
      </InstantSearch>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 960px;
  margin: auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export default Search
