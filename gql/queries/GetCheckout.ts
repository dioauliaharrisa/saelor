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
          }
          product {
            description
            media {
              url
            }
          }
        }
      }
      totalPrice {
        gross {
          amount
        }
      }
    }
  }
`
