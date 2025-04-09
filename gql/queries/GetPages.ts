export const GET_PAGES = gql`
  query GetPages {
    pages(first: 10) {
      edges {
        node {
          id
          content
          title
        }
      }
    }
  }
`
