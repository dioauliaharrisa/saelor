import { GET_PRODUCTS } from '../gql/queries/GetProducts'
import { GET_PRODUCTS_BY_COLLECTION_IDS } from '../gql/queries/GetProductsByCollectionIds'

export const useProducts = () => {
  const products = ref([])
  const productsByCollectionIds = ref([])
  const categoryId = ref<string>('')
  const collectionId = ref<string>('')

  const pagination = usePaginations()

  const variables = computed(() => ({
    first: pagination.perPage.value,
    offset: (pagination.page.value - 1) * pagination.perPage.value
  }))
  console.log('🦆 ~ variables ~ variables:', variables)

  const {
    result: dataProducts,
    error,
    refetch
  } = useQuery(GET_PRODUCTS, {
    first: 20
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

  // watch(collectionId, async (newValue, oldValue) => {
  //   if (newValue !== oldValue && !!newValue) {
  //     console.log('🦆 ~ watch ~ newValue:', newValue)

  //     const filter: any = {}
  //     filter.collections = [collectionId.value]
  //     qVariables.value = {
  //       first: 20,
  //       ...(Object.keys(filter).length ? { filter } : {})
  //     }
  //     try {
  //       const result = await refetch({
  //         first: 20,
  //         collections: [collectionId.value]
  //       })

  //       if (result?.data?.products?.edges) {
  //         products.value = result.data.products.edges
  //       }
  //     } catch (errorx) {
  //       console.log('🦆 ~ useProducts ~ error:', errorx)
  //     }
  //   }
  // })

  // watch(categoryId, async (newValue, oldValue) => {
  //   if (newValue !== oldValue && !!newValue) {
  //     const filter: any = {}
  //     filter.categories = [categoryId.value]
  //     qVariables.value = {
  //       first: 20,
  //       categories: [categoryId.value]
  //     }
  //     const result = await refetch()

  //     if (result?.data?.products?.edges) {
  //       products.value = result.data.products.edges
  //     }
  //   }
  // })

  watchEffect(() => {
    if (dataProductsByCollectionIds?.value?.products?.edges) {
      productsByCollectionIds.value =
        dataProductsByCollectionIds.value.products.edges
    }
    if (dataProducts?.value?.products?.edges) {
      products.value = dataProducts.value.products.edges
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
