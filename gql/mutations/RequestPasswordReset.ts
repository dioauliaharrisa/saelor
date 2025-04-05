export const REQUEST_PASSWORD_RESET = gql`
  mutation {
    requestPasswordReset(
      email: "customer@example.com"
      redirectUrl: "http://localhost:3001/reset-password/"
    ) {
      errors {
        field
        code
      }
    }
  }
`
