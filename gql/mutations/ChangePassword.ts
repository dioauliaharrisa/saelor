export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors {
        field
        code
      }
    }
  }
`
