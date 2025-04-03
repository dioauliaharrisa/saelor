export const GET_USER = gql`
  query GetUser {
    me {
      firstName
      lastName
    }
  }
`
