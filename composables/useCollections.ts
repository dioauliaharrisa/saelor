import { GET_COLLECTIONS } from '../gql/queries/GetCollections'

export const useCollections = () => {
  const { data, error } = useAsyncQuery(GET_COLLECTIONS)
  const collections = computed(() => data.value?.collections?.edges || [])

  watchEffect(() => {
    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch cOLLECTIONS',
        cause: error.value
      })
    }
  })

  return collections
}
