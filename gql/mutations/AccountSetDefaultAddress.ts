export const ACCOUNT_SET_DEFAULT_ADDRESS = gql`
  mutation AccountSetDefaultAddress($id: ID!, $type: AddressTypeEnum!) {
    accountSetDefaultAddress(id: $id, type: $type) {
      errors {
        code
        field
        message
        addressType
      }
    }
  }
`
