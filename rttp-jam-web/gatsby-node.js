const path = require(`path`)

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const res = await graphql(`
    {
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
        }
      }
    }
  `)

  res.data.repositories.nodes.forEach((node) => {
    createPage({
      path: `/cases/${node.studyCase.slug.current}/results/${node.slug.current}`,
      component: path.resolve(`src/templates/Repository.js`),
      context: {
        studyCaseId: node.studyCase._id,
        repositoryId: node._id,
      },
    })
  })
}
