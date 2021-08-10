import * as React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { RiSearchLine as SearchIcon } from "react-icons/ri"

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus }) => (
    <form className={className}>
      <SearchIcon aria-hidden className="SearchIcon" />
      <input
        className="SearchInput"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
      />
    </form>
  )
)
