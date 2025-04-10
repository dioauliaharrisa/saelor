export const GET_PRODUCTS = gql`
  query GetProducts {
    products(channel: "default-channel", first: 20) {
      edges {
        node {
          id
          name
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
          media {
            url(format: WEBP)
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
      }
    }
  }
`
