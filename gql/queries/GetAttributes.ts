export const GET_ATTRIBUTES = gql`
  query GetAttributes {
    attributes(
      first: 100
      channel: "default-channel"
      filter: { filterableInStorefront: true }
    ) {
      edges {
        node {
          id
          name
          slug
          choices(first: 30) {
            edges {
              node {
                id
                slug
                name
              }
            }
          }
        }
      }
    }
  }
`
