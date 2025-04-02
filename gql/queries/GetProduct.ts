export const GET_PRODUCT = gql`
  query GetProduct($id: ID!, $channel: String!) {
    product(id: $id, channel: $channel, externalReference: "") {
      id
      channel
      description
      pricing {
        priceRange {
          start {
            gross {
              amount
            }
          }
          stop {
            gross {
              amount
            }
          }
        }
      }
      name
      images {
        url(format: ORIGINAL, size: 600)
      }
      variants {
        id
        name
      }
      category {
        description
        level
        metadata {
          key
          value
        }
      }
      attributes {
        values {
          id
          name
          slug
        }
        attribute {
          id
          slug
          name
          unit
        }
      }
    }
  }
`
