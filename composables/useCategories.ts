import { GET_CATEGORIES } from '../gql/queries/GetCategories'
import { GET_CATEGORY } from '../gql/queries/GetCategory'

export const useCategories = () => {
  const categories = ref([])
  const categoryHeader = ref<string>('')

  const selectedCategory = ref<string | null>(null)
  console.log('🦆 ~ useCategories ~ selectedCategory:', selectedCategory)
  const { data, error } = useAsyncQuery(GET_CATEGORIES)

  const categoryVariables = computed(() => ({
    id: selectedCategory.value
  }))

  const {
    result: dataCategory,
    loading,
    error: errorCategory,
    refetch
  } = useQuery(GET_CATEGORY, categoryVariables, {
    // Only fetch when we have an ID
    enabled: computed(() => !!selectedCategory.value)
  })

  watchEffect(() => {
    if (dataCategory.value) {
      console.log(
        '🦆 ~ watchEffect ~ dataCategory:',
        dataCategory.value.category.children.edges
      )
      categoryHeader.value = dataCategory.value.category.name
      categories.value = dataCategory.value.category.children.edges
    } else if (data.value?.categories?.edges) {
      categories.value = data.value.categories.edges
    }

    //if back button is clicked, set it back to the main category
    if (!selectedCategory.value) {
      categories.value = data.value.categories.edges
      categoryHeader.value = null
    }

    if (error.value) {
      throw createError({
        statusCode: 300,
        statusMessage: 'Failed to fetch categories',
        cause: error.value
      })
    }
  })

  return { categories, selectedCategory, categoryHeader }
}
