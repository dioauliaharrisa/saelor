import { GET_COLLECTIONS } from '../gql/queries/GetCollections'
import { GET_COLLECTION } from '../gql/queries/GetCollection'

export const useCollections = () => {
  const collections = ref<Array<any>>([])
  const variables = ref<{ id?: string } | null>(null) 

  const {
    result,
    error: errorGC,
    refetch,
    loading
  } = useQuery(GET_COLLECTION, variables, {
    fetchPolicy: 'network-only',
    immediate: false, // Prevent the query from running immediately
    enabled: computed(() => !!variables.value?.id) // Enable only if `variables.id` has a value
  })
  const fetchCollection = async (id: string) => {
    variables.value = { id } // Dynamically set the `id` in variables
    return await refetch() // Explicitly call refetch to execute the query
  }

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

  return { data: collections, fetchCollection }
}
