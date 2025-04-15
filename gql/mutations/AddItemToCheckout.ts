export const ADD_ITEM_TO_CHECKOUT = gql`
  mutation AddItemToCheckout(
    $checkoutId: ID!
    $variantId: ID!
    $quantity: Int!
  ) {
    checkoutLinesAdd(
      id: $checkoutId
      lines: [{ quantity: $quantity, variantId: $variantId }]
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
      errors {
        code
        field
        lines
        message
        variants
      }
    }
  }
`
