export const GET_CATEGORIES = gql`
  query GetCollections {
    categories(first: 50, level: 0) {
      edges {
        node {
          description
          id
          name
        }
        cursor
      }
    }
  }
`
