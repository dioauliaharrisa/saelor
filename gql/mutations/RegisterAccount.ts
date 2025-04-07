export const REGISTER_ACCOUNT = gql`
  mutation RegisterAccount(
    $email: String!
    $password: String!
    $channel: String!
    $firstName: String!
    $lastName: String!
  ) {
    accountRegister(
      input: {
        email: $email
        password: $password
        channel: $channel
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      user {
        id
        email
        isActive
        isConfirmed
      }
      errors {
        message
        field
      }
    }
  }
`
