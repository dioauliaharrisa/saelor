import { GET_CATEGORIES } from '../gql/queries/GetCategories'
import { GET_CATEGORY } from '../gql/queries/GetCategory'

export const useCategories = () => {
  const categories = ref([])
  const selectedCategory = ref(null)
  const { data, error } = useAsyncQuery(GET_CATEGORIES)

  const { data: dataCategory, error: errorCategory } = useAsyncQuery(
    GET_CATEGORY,
    {
      id: selectedCategory,
      enabled: computed(() => !!selectedCategory.value)
    }
  )
  console.log('🦆 ~ useCategories ~ dataCategory:', dataCategory)

  watchEffect(() => {
    if (selectedCategory.value)
      console.log(
        '🦆 ~ watchEffect ~ selectedCategory.value:',
        selectedCategory.value
      )
    if (dataCategory.value) {
      console.log('🦆 ~ watchEffect ~ dataCategory.value:', dataCategory.value)
    }
    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch categories',
        cause: error.value
      })
    }
    if (data.value?.categories?.edges) {
      categories.value = data.value.categories.edges
    }
  })

  return { categories, selectedCategory }
}
