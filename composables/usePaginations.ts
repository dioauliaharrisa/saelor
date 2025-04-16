export const usePaginations = () => {
  const perPage = ref<number>(8)
  const totalItems = ref<number>(0)

  const currentPage = ref(0)
  const cursorNextPage = ref<string | null>(null)
  const cursorPrevPage = ref<string | null>(null)
  const cursor = ref<string | null>(null)
  const hasNextPage = ref<boolean>(false)
  const hasPreviousPage = ref<boolean>(false)
  const isForward = ref(true)
  const totalCount = ref(0)
  const updateFromPaginator = (e) => {
    console.log('🦆 ~ updateFromPaginator ~ e:', e)
    e.page > currentPage.value ? nextPage() : prevPage()
  }

  // Set the current cursor and store the history
  const setCursor = (value: string | null): void => {
    if (value && value !== cursor.value) {
      cursor.value = value
    }
  }

  // Go to the next page using the new cursor
  const nextPage = (): void => {
    if (hasNextPage.value && cursorNextPage.value) {
      isForward.value = true
      cursor.value = cursorNextPage.value
      currentPage.value++
    }
  }

  // Go to the previous page by removing the last cursor and updating the current one
  const prevPage = (): void => {
    isForward.value = false
    if (hasPreviousPage.value && cursorPrevPage.value) {
      console.log('🦆 ~ prevPage ~ cursorPrevPage.value:', cursorPrevPage.value)
      cursor.value = cursorPrevPage.value
      currentPage.value--

      console.log('prevPage called', {
        hasPrevious: hasPreviousPage.value,
        cursorPrev: cursorPrevPage.value,
        cursor: cursor.value,
        isForward: isForward.value
      })
    }
  }

  // Reset pagination (clear cursor history)
  const resetPagination = (): void => {
    cursor.value = null
  }

  const setTotalItems = (count: number): void => {
    totalItems.value = count
  }

  return {
    perPage,
    totalItems,
    setTotalItems,
    cursor,
    setCursor,
    cursorNextPage,
    cursorPrevPage,
    hasNextPage,
    hasPreviousPage,
    resetPagination,
    updateFromPaginator,
    isForward,
    totalCount
  }
}
