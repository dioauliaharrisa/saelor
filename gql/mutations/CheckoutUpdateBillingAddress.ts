export const CHECKOUT_UPDATE_BILLING_ADDRESS = gql`
  mutation CheckoutBillingAddressUpdate(
    $id: ID!
    $billingAddress: AddressInput!
  ) {
    checkoutBillingAddressUpdate(id: $id, billingAddress: $billingAddress) {
      checkout {
        id
        billingAddress {
          streetAddress1
          city
          cityArea
          postalCode
          country {
            code
          }
          countryArea
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
