const path = require(`path`)
const fetch = require("isomorphic-fetch")

// exports.onCreateNode = async ({
//   node,
//   getNode,
//   actions: { createNodeField },
// }) => {
//   if (node._type === "repository" && node.descriptionSource === "readme") {

//   }
// }

exports.createPages = async ({
  graphql,
  actions: { createPage, createRedirect },
}) => {
  createRedirect({
    fromPath: `/edit`,
    toPath: `https://rttp-jam.sanity.studio/desk`,
  })

  const res = await graphql(`
    {
      studyCases: allSanityStudyCase {
        nodes {
          _id
          slug {
            current
          }
        }
      }
      repositories: allSanityRepository {
        nodes {
          _id
          slug {
            current
          }
          studyCase {
            _id
            slug {
              current
            }
          }
          repositoryUrl
          descriptionSource
        }
      }
      notes: allSanityNote {
        nodes {
          _id
          slug {
            current
          }
          studyCase {
            _id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  return Promise.all([
    ...res.data.studyCases.nodes.map(async (studyCase) => {
      if (!studyCase.slug.current) {
        return
      }
      createPage({
        path: `/${studyCase.slug.current}`,
        component: path.resolve(`src/templates/Case.js`),
        context: {
          studyCaseId: studyCase._id,
        },
      })
    }),

    ...res.data.repositories.nodes.map(async (repository) => {
      if (!repository.slug.current) {
        return
      }
      createPage({
        path: `/${repository?.studyCase?.slug?.current || "_"}/${
          repository.slug.current
        }`,
        component: path.resolve(`src/templates/Repository.js`),
        context: {
          repositoryId: repository._id,
          withGitHubReadme: repository.descriptionSource === "readme",
          repositoryUrl: repository.repositoryUrl || "",
        },
      })
    }),

    ...res.data.notes.nodes.map(async (note) => {
      if (!note.slug.current) {
        return
      }
      createPage({
        path: `/${note?.studyCase?.slug?.current || "_"}/${note.slug.current}`,
        component: path.resolve(`src/templates/Note.js`),
        context: {
          noteId: note._id,
        },
      })
    }),
  ])
}
