export const GET_USER = gql`
  query GetUser {
    me {
      id
      firstName
      lastName
    }
  }
`
