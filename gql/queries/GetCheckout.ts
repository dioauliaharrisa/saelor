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
          pricing {
            price {
              gross {
                amount
              }
            }
          }
          media {
            url
            productId
          }
          product {
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
        }
        unitPrice {
          currency
          gross {
            amount
          }
        }
      }
      totalPrice {
        gross {
          amount
        }
      }
      created
    }
  }
`
