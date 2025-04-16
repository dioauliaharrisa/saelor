import { GET_PRODUCTS } from '../gql/queries/GetProducts'
import { GET_PRODUCTS_BY_COLLECTION_IDS } from '../gql/queries/GetProductsByCollectionIds'

export const useProducts = (pagination) => {
  const products = ref([])
  const productsByCollectionIds = ref([])
  const categoryId = ref<string>('')
  const collectionId = ref<string>('')

  const variables = computed(() => {
    const result = pagination.isForward.value
      ? {
          first: pagination.perPage.value,
          after: pagination.cursor.value
        }
      : {
          last: pagination.perPage.value,
          before: pagination.cursor.value
        }

    console.log('Variables computed:', {
      isForward: pagination.isForward.value,
      cursor: pagination.cursor.value,
      result
    })

    return result
  })

  const {
    result: dataProducts,
    error,
    refetch
  } = useQuery(GET_PRODUCTS, variables, {
    fetchPolicy: 'network-only' // Try adding this to force refetch
  })

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
    console.log('Current variables:', variables.value)
    console.log('Query result variables:', dataProducts.value)
    if (dataProductsByCollectionIds?.value?.products?.edges) {
      productsByCollectionIds.value =
        dataProductsByCollectionIds.value.products.edges
    }
    if (dataProducts?.value?.products?.edges) {
      const edges = dataProducts.value.products.edges
      products.value = edges

      const pageInfo = dataProducts.value.products.pageInfo
      console.log('🦆 ~ watchEffect ~ pageInfo:', pageInfo)
      const totalCount = dataProducts.value.products?.totalCount
      pagination.cursorNextPage.value = pageInfo.endCursor
      pagination.cursorPrevPage.value = pageInfo.startCursor
      pagination.hasNextPage.value = pageInfo.hasNextPage
      pagination.hasPreviousPage.value = pageInfo.hasPreviousPage
      pagination.totalCount.value = totalCount
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
