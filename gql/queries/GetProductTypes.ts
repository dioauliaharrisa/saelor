export const GET_PRODUCT_TYPES = gql`
  query ProductTypes {
    productTypes(first: 10, filter: {}) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`
