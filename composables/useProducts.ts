import { GET_PRODUCTS } from '../gql/queries/GetProducts'
import { GET_PRODUCTS_BY_COLLECTION_IDS } from '../gql/queries/GetProductsByCollectionIds'

export const useProducts = () => {
  const products = ref([])
  const productsByCollectionIds = ref([])
  const categoryId = ref<string>('')
  const collectionId = ref<string>('')

  const {
    result: dataProducts,
    error,
    refetch,
    fetchMore,
    loading
  } = useQuery(GET_PRODUCTS, { first: 8, immediate: false })

  const fetchMoreProducts = async () => {
    const pageInfo = dataProducts.value?.products?.pageInfo
    if (pageInfo?.hasNextPage) {
      await fetchMore({
        variables: {
          after: pageInfo.endCursor,
          first: 8
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult

          return {
            products: {
              ...fetchMoreResult.products,
              edges: [
                ...previousResult.products.edges,
                ...fetchMoreResult.products.edges
              ],
              pageInfo: fetchMoreResult.products.pageInfo
            }
          }
        }
      })
    }
  }

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
    if (dataProductsByCollectionIds?.value?.products?.edges) {
      productsByCollectionIds.value =
        dataProductsByCollectionIds.value.products.edges
    }
    if (dataProducts?.value?.products?.edges) {
      const edges = dataProducts.value.products.edges
      products.value = edges

      const pageInfo = dataProducts.value.products.pageInfo
    }
    if (error.value) {
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
    fetchMore: fetchMoreProducts,
    resetFilters,
    dataByCollectionIds: dataProductsByCollectionIds,
    refetchProducts: refetch,
    loading: computed(() => loading.value)
  }
}
