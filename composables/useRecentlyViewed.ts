export const useRecentlyViewed = () => {
  const key = 'recentlyViewedProducts'

  const save = (productId: string) => {
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    const updated = [
      productId,
      ...existing.filter((p) => p.id !== productId)
    ].slice(0, 5)

    localStorage.setItem(key, JSON.stringify(updated))
  }

  const get = () => {
    return JSON.parse(localStorage.getItem(key) || '[]')
  }

  return { save, get }
}
