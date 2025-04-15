export const DELETE_CHECKOUT_LINES = gql`
  mutation DeleteCheckoutLines($idCheckout: ID, $idCheckoutLines: [ID!]!) {
    checkoutLinesDelete(id: $idCheckout, linesIds: $idCheckoutLines) {
      checkout {
        id
        lines {
          id
          quantity
          variant {
            id
            name
          }
        }
      }
      errors {
        field
        message
        code
      }
    }
  }
`
