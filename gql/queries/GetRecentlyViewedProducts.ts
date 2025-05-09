export const GET_RECENTLY_VIEWED_PRODUCTS = gql`
  query GetRecentlyViewedProducts($ids: [ID!]) {
    products(
      channel: "australia-direct-sales"
      first: 5
      where: { ids: $ids }
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
                net {
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
    }
  }
`
