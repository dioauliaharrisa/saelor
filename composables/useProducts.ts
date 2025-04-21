import { GET_PRODUCTS } from '../gql/queries/GetProducts'
import { GET_PRODUCTS_BY_COLLECTION_IDS } from '../gql/queries/GetProductsByCollectionIds'
import { GET_PRODUCT_TYPES } from '../gql/queries/GetProductTypes'

export const useProducts = () => {
  const products = ref([])

  const store = useCartStore()

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
    { first: 24, immediate: false, filter: filters },
    {
      fetchPolicy: 'network-only'
    }
  )

  const {
    result: dataProductTypes,
    error: errorGetProductTypes,
    refetch: refetchProductTypes
  } = useQuery(GET_PRODUCT_TYPES)

  const fetchMoreProducts = async () => {
    console.log('🦆 fetchMoreProducts invoked')
    console.log('🦆 ~ useProducts ~ filters:', filters)
    const pageInfo = dataProducts.value?.products?.pageInfo
    if (pageInfo?.hasNextPage) {
      await fetchMore({
        variables: {
          after: pageInfo.endCursor,
          first: 11
          // filter: filters
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

  const refetchProducts = async (variables) => {
    const result = await refetch(variables)
    if (result?.data?.products?.edges) {
      products.value = result.data.products.edges
      console.log('🦆 ~ refetchProducts ~ store:', store)
      store.setProducts(result.data.products.edges)
      console.log('🦆 ~ refetchProducts ~ products:', products.value)
    }
    return result
  }

  const {
    result: dataProductsByCollectionIds,
    error: errorProductsByCollectionIds
  } = useQuery(
    GET_PRODUCTS_BY_COLLECTION_IDS,
    () => ({
      first: 24,
      filter: { collections: [collectionId.value] }
    }),
    {
      enabled: computed(() => !!collectionId.value)
    }
  )

  // watch(
  //   () => dataProducts,
  //   (newVal) => {
  //     if (newVal?.products?.edges) {
  //       products.value = newVal.products.edges

  //       store.products = newVal.products.edges
  //       console.log('🦆 ~ watch ~ products.value:', products.value)
  //       console.log(
  //         '🦆 ~ watch ~ newVal.products.edges:',
  //         newVal.products.edges
  //       )
  //     }
  //   }
  // )

  watchEffect(async () => {
    if (dataProductsByCollectionIds?.value?.products?.edges) {
      productsByCollectionIds.value =
        dataProductsByCollectionIds.value.products.edges
    }

    if (dataProducts.value?.products?.edges) {
      const edges = dataProducts.value.products.edges
      products.value = edges
    }

    if (dataProductTypes.value?.productTypes?.edges) {
      productTypes.value = dataProductTypes.value.productTypes.edges
      // console.log('🦆 ~ watchEffect ~ productTypes:', productTypes)
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
    refetchProducts,
    loading: computed(() => loading.value),
    filters,
    productTypes,
    refetchProductTypes
  }
}
