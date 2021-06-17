import S from "@sanity/desk-tool/structure-builder"
import React from "react"
import { RiSettings3Fill as settingsIcon } from "react-icons/ri"
import { RiArchiveFill as archiveIcon } from "react-icons/ri"
import { RiContactsBook2Fill as studyCaseIcon } from "react-icons/ri"

const JsonPreview = ({ document }) => (
  <>
    <h1>JSON Data for "{document.displayed.slug.current}"</h1>
    <pre>{JSON.stringify(document.displayed, null, 2)}</pre>
  </>
)

export const getDefaultDocumentNode = ({ documentId, schemaType }) => {
  if (schemaType === "studyCase" || documentId === "siteSettings") {
    return S.document().views([
      S.view.form(),
      S.view.component(JsonPreview).title("JSON"),
    ])
  }
}

export default () =>
  S.list()
    .title("Home")
    .items([
      S.listItem()
        .title("Study Cases")
        .icon(studyCaseIcon)
        .child(
          S.documentList()
            .title("Study Cases")
            .filter('_type == "studyCase"')
            .defaultOrdering([{ field: "launchDate", direction: "desc" }])
        ),
      S.divider(),
      S.listItem()
        .title("All Content")
        .icon(archiveIcon)
        .child(
          S.list()
            .title("All Content")
            .items(
              S.documentTypeListItems().filter(
                (listItem) => !["siteSettings"].includes(listItem.getId())
              )
            )
        ),
      S.listItem()
        .title("Settings")
        .icon(settingsIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
    ])
