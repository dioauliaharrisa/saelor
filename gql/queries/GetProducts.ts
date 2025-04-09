export const GET_PRODUCTS = gql`
  query GetProducts {
    products(channel: "default-channel", first: 20) {
      edges {
        node {
          id
          name
          thumbnail {
            url
          }
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
        }
      }
    }
  }
`
