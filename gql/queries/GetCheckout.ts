export const GET_CHECKOUT = gql`
  query GetCheckout($checkoutId: ID!) {
    checkout(id: $checkoutId) {
      id
      lines {
        id
        quantity
        variant {
          id
          name
          media {
            url
            productId
          }
          product {
            name
            description
            media {
              url
            }
            category {
              name
            }
          }
        }
        totalPrice {
          currency
          gross {
            amount
          }
          net {
            amount
          }
        }
        unitPrice {
          currency
          gross {
            amount
          }
          net {
            amount
          }
        }
      }
      totalPrice {
        gross {
          amount
        }
        net {
          amount
        }
      }
      created
    }
  }
`
