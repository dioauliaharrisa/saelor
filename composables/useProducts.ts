import { GET_PRODUCTS } from '../gql/queries/GetProducts'
import { GET_PRODUCTS_BY_COLLECTION_IDS } from '../gql/queries/GetProductsByCollectionIds'

export const useProducts = (pagination) => {
  const products = ref([])
  const productsByCollectionIds = ref([])
  const categoryId = ref<string>('')
  const collectionId = ref<string>('')

  const variables = computed(() => ({
    first: pagination.perPage.value
    // after: pagination.cursor.value
  }))

  const {
    result: dataProducts,
    error,
    refetch
  } = useQuery(GET_PRODUCTS, variables)

  const {
    result: dataProductsByCollectionIds,
    error: errorProductsByCollectionIds
  } = useQuery(
    GET_PRODUCTS_BY_COLLECTION_IDS,
    () => ({
      first: 20,
      filter: { collections: [collectionId.value] }
    }),
    {
      enabled: computed(() => !!collectionId.value)
    }
  )

  watchEffect(() => {
    // console.log('🦆 ~ variables ~ variables:', variables.value)
    if (dataProductsByCollectionIds?.value?.products?.edges) {
      productsByCollectionIds.value =
        dataProductsByCollectionIds.value.products.edges
    }
    if (dataProducts?.value?.products?.edges) {
      const edges = dataProducts.value.products.edges
      products.value = edges
      // Set new cursor (endCursor of current page)
      // const pageInfo = dataProducts.value.products.pageInfo
      // const endCursor = pageInfo.endCursor
      // pagination.setCursor(endCursor) // Update cursor
      // pagination.hasNextPage.value = pageInfo.hasNextPage
    }
    if (error.value) {
      console.log('🦆 ~ watchEffect ~ error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch products',
        cause: error.value
      })
    }
  })

  const resetFilters = () => {
    products.value = []
    categoryId.value = ''
    collectionId.value = ''
  }

  return {
    data: products,
    categoryId,
    collectionId,
    refetch,
    resetFilters,
    dataByCollectionIds: dataProductsByCollectionIds
  }
}
