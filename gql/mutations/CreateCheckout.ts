export const CREATE_CHECKOUT = gql`
  mutation CreateCheckout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        token
        totalPrice {
          gross {
            amount
            currency
          }
        }
        lines {
          id
          quantity
          variant {
            id
            name
          }
        }
        shippingMethods {
          active
          id
          message
          name
        }
      }
      errors {
        field
        message
      }
    }
  }
`
