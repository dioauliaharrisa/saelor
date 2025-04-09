import { GET_CATEGORIES } from '../gql/queries/GetCategories'

export const useCategories = () => {
  const { data, error } = useAsyncQuery(GET_CATEGORIES)
  const categories = computed(() => data.value?.categories?.edges || [])

  watchEffect(() => {
    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch categories',
        cause: error.value
      })
    }
  })

  return categories
}
