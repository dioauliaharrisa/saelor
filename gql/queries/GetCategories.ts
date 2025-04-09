export const GET_CATEGORIES = gql`
  query GetCollections {
    categories(first: 50) {
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
