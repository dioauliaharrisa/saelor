export const CREATE_CHECKOUT = gql`
  mutation CreateCheckout(
    $id: ID!
    $channel: String!
    $address: ShippingAddressInput!
  ) {
    checkoutCreate(
      input: {
        channel: $channel
        lines: [{ variantId: $id, quantity: 1 }]
        shippingAddress: $address
      }
    ) {
      checkout {
        id
        token
        shippingAddress {
          city
          country
          postalCode
        }
        availableShippingMethods {
          id
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
