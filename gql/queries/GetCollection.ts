export const GET_COLLECTION = gql`
  query GetCollection($id: ID!) {
    collection(id: $id, channel: "australia-direct-sales") {
      id
      name
      description
      backgroundImage(format: WEBP) {
        url
      }
    }
  }
`
