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
    res.data.studyCases.nodes.map((studyCase) =>
      createPage({
        path: `/cases/${studyCase.slug.current}`,
        component: path.resolve(`src/templates/Case.js`),
        context: {
          studyCaseId: studyCase._id,
        },
      })
    ),

    res.data.repositories.nodes.map(async (repository) => {
      // /cases/${
      //   repository?.studyCase?.slug.current || "general"
      // }
      let readme =
        (await repository.descriptionSource) === "readme" &&
        fetch("https://api.github.com/graphql", {
          method: "POST",
          body: JSON.stringify({
            query: `
          query GET_REPO_README_FROM_URL ($url: URI!) {
            resource(url: $url) {
              ... on Repository {
                nameWithOwner
                url
                updatedAt
                object(expression: "master:README.md") {
                  ... on Blob {
                    text
                  }
                }
              }
            }
          }
          `,
            variables: {
              url: repository.repositoryUrl,
            },
          }),
          headers: {
            "content-type": "application/json",
            authorization: "bearer " + process.env.GITHUB_API_TOKEN,
          },
        })
          .then((r) => r.json())
          .then((r) =>
            r.data.resource.object.text.replaceAll("/blob/", "/raw/")
          )

      createPage({
        path: `/results/${repository.slug?.current}`,
        component: path.resolve(`src/templates/Repository.js`),
        context: {
          repositoryId: repository._id,
          githubMarkdown: readme || "",
        },
      })
    }),

    res.data.notes.nodes.map((note) => {
      createPage({
        path: `/notes/${note.slug?.current}`,
        component: path.resolve(`src/templates/Note.js`),
        context: {
          noteId: note._id,
        },
      })
    }),

    createRedirect({
      fromPath: `/edit`,
      toPath: `https://rttp-jam.sanity.studio/desk`,
    }),
  ])
}
