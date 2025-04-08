export const CHECKOUT_UPDATE_SHIPPING_ADDRESS = gql`
  mutation CheckoutShippingAddressUpdate(
    $id: ID!
    $shippingAddress: AddressInput!
  ) {
    checkoutShippingAddressUpdate(id: $id, shippingAddress: $shippingAddress) {
      checkout {
        shippingAddress {
          firstName
          lastName
          streetAddress1
          city
          postalCode
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
