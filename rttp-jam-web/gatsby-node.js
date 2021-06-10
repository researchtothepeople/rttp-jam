const path = require(`path`)

exports.createPages = async ({ graphql, actions: { createPage } }) => {
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

  res.data.studyCases.nodes.forEach((studyCase) => {
    createPage({
      path: `/cases/${studyCase.slug.current}`,
      component: path.resolve(`src/templates/Case.js`),
      context: {
        studyCaseId: studyCase._id,
      },
    })
  })

  res.data.repositories.nodes.forEach((repository) => {
    createPage({
      path: `/cases/${repository.studyCase.slug.current}/results/${repository.slug.current}`,
      component: path.resolve(`src/templates/Repository.js`),
      context: {
        repositoryId: repository._id,
      },
    })
  })

  res.data.notes.nodes.forEach((note) => {
    createPage({
      path: `/cases/${note.studyCase.slug.current}/notes/${note.slug.current}`,
      component: path.resolve(`src/templates/Note.js`),
      context: {
        noteId: note._id,
      },
    })
  })
}
