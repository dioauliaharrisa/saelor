export const REGISTER_ACCOUNT = gql`
  mutation RegisterAccount(
    $email: String!
    $password: String!
    $channel: String!
  ) {
    accountRegister(
      input: {
        email: $email
        password: $password
        channel: $channel
        autoConfirm: true
      }
    ) {
      errors {
        field
        code
      }
      user {
        email
        isActive
        isConfirmed
      }
    }
  }
`
