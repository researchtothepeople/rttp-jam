const queries = [
  {
    query: `#graphql
      query {
        repositories: allSanityRepository {
          nodes {
            _id
            slug {
              current
            }
            projectTitle
            studyCase {
              _id
              name
              topic
              slug {
                current
              }
            }
          }
        }
      }`,
    transformer: ({ data }) =>
      data.repositories.nodes.map(({ _id, ...node }) => ({
        objectID: _id,
        ...node,
      })),
    indexName: `repositories`,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries
