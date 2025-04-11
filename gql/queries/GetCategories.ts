export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(first: 50, level: 0) {
      edges {
        node {
          description
          id
          name
          children(first: 10) {
            totalCount
          }
        }
        cursor
      }
    }
  }
`
