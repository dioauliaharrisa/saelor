import { GET_PRODUCTS } from '../gql/queries/GetProducts'
import { GET_ATTRIBUTES } from '../gql/queries/GetAttributes'
import { GET_PRODUCTS_BY_COLLECTION_IDS } from '../gql/queries/GetProductsByCollectionIds'
import { GET_PRODUCT_TYPES } from '../gql/queries/GetProductTypes'

export const useProducts = () => {
  // const products = ref([])

  const store = useCartStore()

  // This is used to prevent the infinite scroll from loading more products
  const isFullyLoaded = useState('isFullyLoaded', () => false)

  // soon to be deprecated
  const productTypes = ref([])

  const filters = reactive({
    categories: [],
    collections: [],
    productTypes: []
  })

  const productsByCollectionIds = ref([])
  const categoryId = ref<string>('')
  const collectionId = ref<string>('')

  const {
    result: dataProducts,
    error,
    refetch,
    fetchMore,
    loading
  } = useQuery(
    GET_PRODUCTS,
    { first: 8, immediate: false, filter: filters },
    {
      fetchPolicy: 'network-only'
    }
  )

  const {
    result: dataProductTypes,
    error: errorGetProductTypes,
    refetch: refetchProductTypes
  } = useQuery(GET_PRODUCT_TYPES)

  const {
    result: attributes,
    error: errorGetAttributes,
    refetch: refetchAttributes
  } = useQuery(GET_ATTRIBUTES)

  const fetchMoreProducts = async () => {
    const pageInfo = dataProducts?.value?.products?.pageInfo
    console.log('🦆 ~ fetchMoreProducts ~ dataProducts:', dataProducts)
    if (pageInfo?.hasNextPage) {
      const result = await fetchMore({
        variables: {
          after: pageInfo.endCursor,
          first: 8,
          filter: filters
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult
          const combinedEdges = [
            ...(store.products || []),
            ...fetchMoreResult.products.edges
          ]
          store.setProducts(combinedEdges)
          return {
            products: {
              ...fetchMoreResult.products,
              edges: combinedEdges,
              pageInfo: fetchMoreResult.products.pageInfo
            }
          }
        }
      })
      const newPageInfo = result?.data?.products?.pageInfo
      isFullyLoaded.value = !newPageInfo?.hasNextPage
    }
  }

  const refetchProducts = async (variables) => {
    const result = await refetch(variables)
    const pageInfo = result?.data?.products?.pageInfo
    console.log('🦆 ~ refetchProducts ~ pageInfo:', result, pageInfo)

    isFullyLoaded.value = pageInfo?.hasNextPage === false

    if (result?.data?.products?.edges) {
      // products.value = result.data.products.edges
      store.setProducts(result.data.products.edges)
    }
    return result
  }

  const {
    result: dataProductsByCollectionIds,
    error: errorProductsByCollectionIds
  } = useQuery(
    GET_PRODUCTS_BY_COLLECTION_IDS,
    () => ({
      filter: { collections: [collectionId.value] }
    }),
    {
      enabled: computed(() => !!collectionId.value)
    }
  )

  watchEffect(async () => {
    const pageInfo = dataProducts?.value?.products?.pageInfo
    isFullyLoaded.value = pageInfo?.hasNextPage === false

    if (dataProductsByCollectionIds?.value?.products?.edges) {
      productsByCollectionIds.value =
        dataProductsByCollectionIds.value.products.edges
    }

    if (dataProductTypes.value?.productTypes?.edges) {
      productTypes.value = dataProductTypes.value.productTypes.edges
    }

    if (errorGetProductTypes.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch product types',
        cause: errorGetProductTypes.value
      })
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
    store.setProducts([])
    categoryId.value = ''
    collectionId.value = ''
  }

  return {
    categoryId,
    collectionId,
    fetchMore: fetchMoreProducts,
    resetFilters,
    dataByCollectionIds: dataProductsByCollectionIds,
    refetchProducts,
    loading: computed(() => loading.value),
    filters,
    productTypes,
    refetchProductTypes,
    isFullyLoaded,
    attributes
  }
}
