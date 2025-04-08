export const CHECKOUT_UPDATE_DELIVERY_METHOD = gql`
  mutation checkoutDeliveryMethodUpdate($id: ID!, $deliveryMethodId: ID!) {
    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $deliveryMethodId) {
      checkout {
        deliveryMethod {
          ... on ShippingMethod {
            id
            name
          }
          ... on Warehouse {
            id
            email
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
