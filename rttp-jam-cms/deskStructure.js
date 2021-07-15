import S from "@sanity/desk-tool/structure-builder"
import React from "react"
import { RiSettings3Fill as settingsIcon } from "react-icons/ri"

const JsonPreview = ({ document }) => {
  console.log(document.displayed)
  return (
    <>
      <h1>JSON Data for "{document.displayed.slug.current}"</h1>
      <pre>{JSON.stringify(document.displayed, null, 2)}</pre>
    </>
  )
}

const StudyCasePreview = ({ document }) => {
  const url = `${
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000`
      : `https://preview-rttpjam61104.gtsb.io`
  }/cases/${document.displayed.slug.current}/`
  return <iframe src={url} frameBorder={0} width="100%" height="100%"></iframe>
}

const RepositoryPreview = ({ document: { displayed } }) => {
  const url = `${
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000`
      : `https://preview-rttpjam61104.gtsb.io`
  }/results/${displayed?.slug.current}`
  return <iframe src={url} frameBorder={0} width="100%" height="100%"></iframe>
}

export const getDefaultDocumentNode = ({ documentId, schemaType }) => {
  if (schemaType === "studyCase") {
    return S.document().views([
      S.view.form(),
      S.view.component(StudyCasePreview).title("Preview"),
      S.view.component(JsonPreview).title("Raw"),
    ])
  }
  if (schemaType === "repository") {
    return S.document().views([
      S.view.form(),
      S.view.component(RepositoryPreview).title("Preview"),
      S.view.component(JsonPreview).title("Raw"),
    ])
  }
}

export default () =>
  S.list()
    .title("Home")
    .items([
      // S.listItem()
      //   .title("Study Cases")
      //   .icon(studyCaseIcon)
      //   .child(
      //     S.documentList()
      //       .title("Study Cases")
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
