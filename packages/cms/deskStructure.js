import S from "@sanity/desk-tool/structure-builder"
import React from "react"
import { RiSettings3Fill as settingsIcon } from "react-icons/ri"

const WebPreview = ({ document: { displayed } }) => {
  const urlMap = {
    studyCase: "cases",
    repository: "results",
  }
  const url = `${
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000`
      : `https://preview-rttpjam61104.gtsb.io`
  }/${urlMap[displayed._type]}/${displayed?.slug.current}`
  return <iframe src={url} frameBorder={0} width="100%" height="100%"></iframe>
}

export const getDefaultDocumentNode = ({ documentId, schemaType }) => {
  if (schemaType === "studyCase") {
    return S.document().views([
      S.view.form(),
      // S.view.component(WebPreview).title("Preview"),
    ])
  }
  if (schemaType === "repository") {
    return S.document().views([
      S.view.form(),
      // S.view.component(WebPreview).title("Preview"),
    ])
  }
}

export default () =>
  S.list()
    .title("Home")
    .items([
      // S.listItem()
      //   .title("Study Cases")
      //   .icon()
      //   .child((id) =>
      //     S.documentList("studyCase")
      //       .id(id)
      //       .filter('_type == "studyCase"')
      //       .defaultOrdering([{ field: "launchDate", direction: "desc" }])
      //   ),
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings"].includes(listItem.getId())
      ),
      S.divider(),
      // S.listItem()
      //   .title("All Content")
      //   .icon(archiveIcon)
      //   .child(
      //     S.list()
      //       .title("All Content")
      //       .items(
      //         S.documentTypeListItems().filter(
      //           (listItem) => !["siteSettings"].includes(listItem.getId())
      //         )
      //       )
      //   ),
      S.listItem()
        .title("Settings")
        .icon(settingsIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
    ])
