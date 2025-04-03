export const REFRESH_TOKEN = gql`
  mutation tokenRefresh($refreshToken: String!) {
    tokenRefresh(refreshToken: $refreshToken) {
      token
      errors {
        message
        code
      }
    }
  }
`
