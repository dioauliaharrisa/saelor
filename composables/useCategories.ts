import { GET_CATEGORIES } from '../gql/queries/GetCategories'
import { GET_CATEGORY } from '../gql/queries/GetCategory'

export const useCategories = () => {
  const categories = ref([])
  const categoryHeader = ref<string>('')

  const selectedCategory = ref<string | null>(null)

  const { data, error } = useAsyncQuery(GET_CATEGORIES)

  const categoryVariables = computed(() => ({
    id: selectedCategory.value
  }))

  const {
    result: dataCategory,
    loading: loadingCategories,
    error: errorCategory,
    refetch: refetchCategories
  } = useQuery(GET_CATEGORY, categoryVariables, {
    enabled: computed(() => !!selectedCategory.value)
  })

  watchEffect(() => {
    if (dataCategory.value) {
      categoryHeader.value = dataCategory.value.category.name
      categories.value = dataCategory.value.category.children.edges
    } else if (data.value?.categories?.edges) {
      categories.value = data.value.categories.edges
    }

    //if back button is clicked, set it back to the main category
    if (!selectedCategory.value) {
      categories.value = data.value?.categories?.edges
      categoryHeader.value = null
    }

    if (error.value) {
      console.error('GET_CATEGORIES error:', error.value)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch categories',
        cause: error.value
      })
    }

    if (errorCategory.value) {
      console.error('GET_CATEGORY error:', errorCategory.value)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch selected category',
        cause: errorCategory.value
      })
    }
  })

  return {
    data: categories,
    selectedCategory,
    categoryHeader,
    refetchCategories,
    loadingCategories
  }
}
