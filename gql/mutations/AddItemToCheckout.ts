export const ADD_ITEM_TO_CHECKOUT = gql`
  mutation AddItemToCheckout($checkoutId: ID!, $variantId: ID!) {
    checkoutLinesAdd(
      id: $checkoutId
      lines: [{ quantity: 1, variantId: $variantId }]
    ) {
      checkout {
        lines {
          id
          variant {
            name
          }
          quantity
        }
        totalPrice {
          gross {
            currency
            amount
          }
        }
        shippingMethods {
          name
          description
          id
        }
      }
    }
  }
`
