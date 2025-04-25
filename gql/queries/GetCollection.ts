export const GET_COLLECTION = gql`
  query GetCollection($id: ID!) {
    collection(id: $id, channel: "default-channel") {
      id
      name
      description
      backgroundImage(format: WEBP) {
        url
      }
    }
  }
`
