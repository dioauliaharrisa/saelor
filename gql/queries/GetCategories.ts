export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(first: 20, level: 0) {
      edges {
        node {
          description
          id
          name
          children(first: 10) {
            totalCount
            edges {
              node {
                name
                id
                children(first: 10) {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
