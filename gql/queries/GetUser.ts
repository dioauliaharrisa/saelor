export const GET_USER = gql`
  query GetUser {
    me {
      id
      email
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
