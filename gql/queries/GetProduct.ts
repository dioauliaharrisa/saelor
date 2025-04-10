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
            currency
          }
        }
      }
      name
      variants {
        id
        name
        sku
        quantityAvailable
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
      media {
        id
        url(format: ORIGINAL)
      }
    }
  }
`
