export const GET_COLLECTIONS = gql`
  query GetCollections {
    collections(channel: "australia-direct-sales", first: 10) {
      edges {
        cursor
        node {
          id
          name
          backgroundImage {
            url
          }
        }
      }
    }
  }
`
