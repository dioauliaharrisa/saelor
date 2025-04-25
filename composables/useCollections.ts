import { GET_COLLECTIONS } from '../gql/queries/GetCollections'

export const useCollections = () => {
  const collections = ref<Array<any>>([])

  const { data, error } = useAsyncQuery(GET_COLLECTIONS)

  watchEffect(() => {
    collections.value = data.value?.collections?.edges || []

    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch cOLLECTIONS',
        cause: error.value
      })
    }
  })
  console.log('🦆 ~ watchEffect ~ collections:', collections)

  return { data: collections }
}
