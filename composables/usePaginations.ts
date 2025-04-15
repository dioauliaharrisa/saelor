export function usePaginations(
  initialPage: number = 1,
  initialPerPage: number = 8
) {
  const page = ref<number>(initialPage)
  const perPage = ref<number>(initialPerPage)
  const totalItems = ref<number>(0)

  const totalPages = computed<number>(() =>
    Math.ceil(totalItems.value / perPage.value)
  )

  const goToPage = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages.value) {
      page.value = newPage
    }
  }

  const updateFromPaginator = (event: { page: number; rows: number }) => {
    page.value = event.page + 1 // PrimeVue page is 0-based
    perPage.value = event.rows
  }

  const nextPage = (): void => {
    if (page.value < totalPages.value) page.value++
  }

  const prevPage = (): void => {
    if (page.value > 1) page.value--
  }

  const setTotalItems = (count: number): void => {
    totalItems.value = count
  }

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    setTotalItems,
    updateFromPaginator
  }
}
