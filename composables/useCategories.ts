import { GET_CATEGORIES } from '../gql/queries/GetCategories'
import { GET_CATEGORY } from '../gql/queries/GetCategory'

export const useCategories = () => {
  const categories = ref([])
  const categoryHeader = ref<string>('')

  const selectedCategory = ref<string | null>(null)

  const { data, error } = useAsyncQuery(GET_CATEGORIES)

  const categoriesVariables = computed(() => ({
    id: selectedCategory.value
  }))

  const categoryVariable = ref<{ id?: string } | null>(null)

  const {
    result: dataCategories,
    loading: loadingCategories,
    error: errorCategories,
    refetch: refetchCategories
  } = useQuery(GET_CATEGORY, categoriesVariables, {
    enabled: computed(() => !!selectedCategory.value)
  })

  const {
    result: dataCategory,
    loading: loadingCategory,
    error: errorCategory,
    refetch: refetchCategory
  } = useQuery(GET_CATEGORY, categoryVariable, {
    enabled: computed(() => !!categoryVariable.value)
  })
  const fetchCategory = async (id: string) => {
    categoryVariable.value = { id }
    return await refetchCategory()
  }

  watchEffect(() => {
    if (dataCategories.value) {
      categoryHeader.value = dataCategories.value.category.name
      categories.value = dataCategories.value.category.children.edges
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
    loadingCategories,
    fetchCategory
  }
}
