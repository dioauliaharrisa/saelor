export const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
      user {
        email
        isActive
      }
      errors {
        field
        message
      }
    }
  }
`
