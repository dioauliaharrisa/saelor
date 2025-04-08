export const GET_COLLECTIONS = gql`
  query GetCollections {
    collections(channel: "default-channel", first: 10) {
      edges {
        cursor
        node {
          backgroundImage {
            url
          }
          name
        }
      }
    }
  }
`
