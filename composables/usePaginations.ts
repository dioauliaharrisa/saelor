export const usePaginations = () => {
  const perPage = ref<number>(8)
  const totalItems = ref<number>(0)

  const cursors = ref<string[]>([]) // History of cursors
  const cursor = ref<string | null>(null)
  const hasNextPage = ref<boolean>(false)
  const hasPreviousPage = computed(() => cursors.value.length > 1)

  // Set the current cursor and store the history
  const setCursor = (value: string | null): void => {
    if (value && value !== cursor.value) {
      cursors.value.push(value)
      cursor.value = value
    }
  }

  // Go to the next page using the new cursor
  const nextPage = (newCursor: string | null): void => {
    if (hasNextPage.value && newCursor) {
      // setCursor(newCursor) // Update the cursor for the next page
    }
  }

  // Go to the previous page by removing the last cursor and updating the current one
  const prevPage = (): void => {
    if (hasPreviousPage.value) {
      // cursors.value.pop() // Remove the current cursor
      // cursor.value = cursors.value[cursors.value.length - 1] || null
    }
  }

  // Reset pagination (clear cursor history)
  const resetPagination = (): void => {
    cursors.value = []
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
    hasNextPage,
    hasPreviousPage,
    nextPage,
    prevPage,
    resetPagination
  }
}
