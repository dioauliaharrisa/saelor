import { GET_PRODUCTS } from '../gql/queries/GetProducts'
import { GET_ATTRIBUTES } from '../gql/queries/GetAttributes'
import { GET_PRODUCTS_BY_COLLECTION_IDS } from '../gql/queries/GetProductsByCollectionIds'
import { GET_PRODUCT_TYPES } from '../gql/queries/GetProductTypes'
import { GET_RECENTLY_VIEWED_PRODUCTS } from '../gql/queries/GetRecentlyViewedProducts'
// import { MeiliSearch } from 'meilisearch'

export const useProducts = () => {
  const store = useCartStore()
  // const client = new MeiliSearch({
  //   host: 'http://localhost:7700',
  //   apiKey: useRuntimeConfig().meiliAdminKey
  // })

  // This is used to prevent the infinite scroll from loading more products
  const isFullyLoaded = useState('isFullyLoaded', () => false)

  // soon to be deprecated
  const productTypes = ref([])

  const filters = useState('filters', () => ({
    categories: [],
    collections: [],
    productTypes: [],
    attributes: []
  }))

  const toggleAttributeFilter = (slug: string, value) => {
    const existingFilter = filters.value.attributes.find(
      (attr) => attr.slug === slug
    )
    if (existingFilter) {
      const valueIndex = existingFilter.values.indexOf(value)
      if (valueIndex > -1) {
        // Remove the value
        existingFilter.values.splice(valueIndex, 1)
        // If no values left, remove the attribute filter
        if (existingFilter.values.length === 0) {
          const attrIndex = filters.value.attributes.findIndex(
            (attr) => attr.slug === slug
          )
          filters.value.attributes.splice(attrIndex, 1)
        }
      } else {
        // Add the value
        existingFilter.values.push(value)
      }
    } else {
      // Add new attribute filter
      filters.value.attributes.push({ slug, values: [value] })
    }
  }

  const productsByCollectionIds = ref([])
  const categoryId = ref<string>('')
  const collectionId = ref<string>('')

  const variables = ref({
    first: 8,
    filter: {} // start empty or with initial values
  })

  const {
    result: dataProducts,
    error,
    refetch,
    fetchMore,
    loading
  } = useQuery(GET_PRODUCTS, variables, {
    fetchPolicy: 'network-only',
    immediate: false
  })

  const applyFilters = () => {
    variables.value.filter = toRaw(filters.value)
  }

  const { refetch: refetchRVP } = useQuery(GET_RECENTLY_VIEWED_PRODUCTS, {
    fetchPolicy: 'network-only',
    immediate: false
  })

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
    if (pageInfo?.hasNextPage) {
      const result = await fetchMore({
        variables: {
          after: pageInfo.endCursor,
          first: 8,
          filter: filters.value
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

    // if (dataProducts?.value?.products?.edges) {
    // const fetchedProducts = dataProducts?.value?.products?.edges.map(
    //   (edge) => {
    //     const product = edge.node

    //     return {
    //       id: product.id.replace(/=$/, ''),
    //       name: product.name,
    //       thumbnail: product.media?.[0]?.url
    //     }
    //   }
    // )

    // ON HOLD
    // const indexExists = await client
    //   .getIndex('products')
    //   .then(() => true)
    //   .catch(() => false)

    // if (!indexExists) {
    //   await client.createIndex('products', { primaryKey: 'id' })
    // }

    // await client
    //   .index('products')
    //   .addDocuments(fetchedProducts, { primaryKey: 'id' })
    // }

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
      console.log('🦆 ~ watchEffect ~ error:', error)
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
    applyFilters,
    products: dataProducts,
    categoryId,
    collectionId,
    fetchMore: fetchMoreProducts,
    resetFilters,
    dataByCollectionIds: dataProductsByCollectionIds,
    refetchProducts,
    loading: computed(() => loading.value),
    filters: filters.value,
    productTypes,
    refetchProductTypes,
    isFullyLoaded,
    attributes,
    toggleAttributeFilter,
    refetchRVP
  }
}
