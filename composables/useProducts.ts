import { GET_PRODUCTS } from '../gql/queries/GetProducts'

export const useProducts = () => {
  const products = ref([])
  const categoryId = ref<string>('')
  const qVariables = computed(() => {
    const base: any = { first: 20 }
    if (categoryId.value) {
      base.filter = { categories: [categoryId.value] }
    }
    return base
  })

  const {
    result: dataProducts,
    error,
    refetch
  } = useQuery(GET_PRODUCTS, qVariables)

  watchEffect(() => {
    console.log('🦆 ~ useProducts ~ dataProducts:', dataProducts, error)
    if (dataProducts?.value?.products?.edges) {
      console.log('🦆 ~ watchEffect ~ dataProducts:', dataProducts)
      products.value = dataProducts.value.products.edges
    }
    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch products',
        cause: error.value
      })
    }
  })

  return { data: products, categoryId }
}
