import { GET_PRODUCTS } from '../gql/queries/GetProducts'

export const useProducts = () => {
  const { data, error } = useAsyncQuery(GET_PRODUCTS)
  const products = data?.value?.products?.edges || []

  watchEffect(() => {
    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch products',
        cause: error.value
      })
    }
  })

  return products
}
