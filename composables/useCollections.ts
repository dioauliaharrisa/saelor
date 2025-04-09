import { GET_COLLECTIONS } from '../gql/queries/GetCollections'

export const useCollections = () => {
  const { data, error } = useAsyncQuery(GET_COLLECTIONS)
  console.log('🦆 ~ useCollections ~ data:', data)
  const collections = computed(() => data.value?.collections?.edges || [])

  watchEffect(() => {
    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch categories',
        cause: error.value
      })
    }
  })

  return collections
}
