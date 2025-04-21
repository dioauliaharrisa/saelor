export const GET_ATTRIBUTES = gql`
  query GetAttributes {
    attributes(first: 100, channel: "default-channel") {
      edges {
        node {
          id
          name
          choices(first: 10) {
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
`
