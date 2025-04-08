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
      orders(first: 3) {
        edges {
          node {
            id
            number
            lines {
              productName
              quantity
              thumbnail(format: WEBP) {
                url
              }
            }
            status
            statusDisplay
            total {
              net {
                amount
                currency
              }
            }
          }
        }
      }
    }
  }
`
