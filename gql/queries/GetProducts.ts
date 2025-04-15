export const GET_PRODUCTS = gql`
  query GetProducts($first: Int, $filter: ProductFilterInput) {
    products(channel: "default-channel", first: $first, filter: $filter) {
      edges {
        node {
          id
          name
          description
          variants {
            id
          }
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
