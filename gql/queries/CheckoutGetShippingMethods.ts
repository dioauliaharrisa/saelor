export const GET_SHIPPING_METHODS = gql`
  query CheckoutShippingMethodsAndCollectionPoints($id: ID!) {
    checkout(id: $id) {
      shippingMethods {
        id
        name
        active
        price {
          currency
          amount
        }
      }
      availableCollectionPoints {
        id
        name
        clickAndCollectOption
      }
    }
  }
`