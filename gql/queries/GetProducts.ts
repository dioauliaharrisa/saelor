export const GET_PRODUCTS = gql`
  query GetProducts(
    $first: Int
    $after: String
    $filter: ProductFilterInput
    $search: String
  ) {
    products(
      first: $first
      after: $after
      filter: $filter
      search: $search
      channel: "australia-direct-sales"
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
                net {
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
          productType {
            id
            name
            kind
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
