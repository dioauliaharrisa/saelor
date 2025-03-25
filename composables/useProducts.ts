import { useQuery } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";

const GET_PRODUCTS = gql`
  query GetProducts {
    products(channel: "default-channel", first: 10) {
      edges {
        node {
          id
          name
          thumbnail {
            url
          }
        }
      }
    }
  }
`;

export function useProducts() {
  const { result, loading, error } = useQuery(GET_PRODUCTS);
  return { products: result, loading, error };
}
