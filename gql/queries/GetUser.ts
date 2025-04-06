export const GET_USER = gql`
  query GetUser {
    me {
      id
      firstName
      lastName
      addresses {
        countryArea
        city
        cityArea
        companyName
        phone
        postalCode
        streetAddress1
      }
    }
  }
`
