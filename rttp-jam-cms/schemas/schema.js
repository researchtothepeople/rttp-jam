import createSchema from "part:@sanity/base/schema-creator"
import schemaTypes from "all:part:@sanity/base/schema-type"

import author from "./author"
import repository from "./repository"
import studyCase from "./studyCase"
import note from "./note"

export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([studyCase, repository, author, note]),
})
