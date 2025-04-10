export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name
      id
      children {
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
