export const GET_PRODUCTS_BY_CATEGORY_ID = gql`
  query GetProductsByCategoryId {
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
