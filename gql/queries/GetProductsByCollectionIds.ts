export const GET_PRODUCTS_BY_COLLECTION_IDS = gql`
  query GetProductsByCollectionIds($first: Int, $filter: ProductFilterInput) {
    products(
      channel: "australia-direct-sales"
      first: $first
      filter: $filter
    ) {
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
