export const UPDATE_CHECKOUT_EMAIL = gql`
  mutation CheckoutEmailUpdate($checkoutId: ID!, $email: String!) {
    checkoutEmailUpdate(id: $checkoutId, email: $email) {
      checkout {
        id
        email
      }
      errors {
        field
        message
      }
    }
  }
`
