export const GET_PRODUCTS = gql`
  query GetProducts($first: Int, $after: String, $filter: ProductFilterInput) {
    products(
      channel: "default-channel"
      first: $first
      after: $after
      filter: $filter
    ) {
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
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`
