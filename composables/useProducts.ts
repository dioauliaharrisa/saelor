import { GET_PRODUCTS } from '../gql/queries/GetProducts'

export const useProducts = () => {
  const products = ref([])
  const categoryId = ref<string>('')
  const collectionId = ref<string>('')

  const qVariables = ref({ first: 20 })

  const {
    result: dataProducts,
    error,
    refetch
  } = useQuery(GET_PRODUCTS, qVariables)

  watch(collectionId, async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      const filter: any = {}
      filter.collections = [collectionId.value]
      qVariables.value = {
        first: 20,
        ...(Object.keys(filter).length ? { filter } : {})
      }
      const result = await refetch()
      if (result?.data?.products?.edges) {
        products.value = result.data.products.edges
      }
    }
  })

  watchEffect(() => {
    const filter: any = {}
    if (categoryId.value) filter.categories = [categoryId.value]

    if (dataProducts?.value?.products?.edges) {
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

  return { data: products, categoryId, collectionId, refetch }
}
