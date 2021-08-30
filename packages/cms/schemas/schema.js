import createSchema from "part:@sanity/base/schema-creator"
import schemaTypes from "all:part:@sanity/base/schema-type"

import studyCase from "./studyCase"
import repository from "./repository"
import note from "./note"
import author from "./author"
import sponsor from "./sponsor"
import siteSettings from "./siteSettings"
import richText from "./blocks/richText"
import figure from "./blocks/figure"
// import caseDataType from "./caseDataType"

export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    studyCase,
    repository,
    note,
    sponsor,
    author,
    siteSettings,
    richText,
    figure,
    // caseDataType,
  ]),
})
