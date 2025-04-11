export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name
      id
      children(first: 10) {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }
`
