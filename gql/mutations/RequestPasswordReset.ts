export const REQUEST_PASSWORD_RESET = gql`
  mutation {
    requestPasswordReset(
      email: "daharrisa@gmail.com"
      redirectUrl: "http://localhost:3001/change-password/"
    ) {
      errors {
        field
        code
      }
    }
  }
`
