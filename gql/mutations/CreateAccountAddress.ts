export const CREATE_ACCOUNT_ADDRESS = gql`
  mutation account($input: AddressInput!, $type: AddressTypeEnum) {
    accountAddressCreate(type: $type, input: $input) {
      address {
        id
        firstName
        lastName
        streetAddress1
        city
        postalCode
        country {
          code
          country
        }
        phone
        countryArea
      }
      errors {
        field
        message
      }
    }
  }
`
