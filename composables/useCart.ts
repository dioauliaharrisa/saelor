// useShowNotification.ts
import { ADD_ITEM_TO_CHECKOUT } from '../gql/mutations/AddItemToCheckout'
import { CREATE_CHECKOUT } from '../gql/mutations/CreateCheckout'
import { DELETE_CHECKOUT_LINES } from '../gql/mutations/CheckoutDeleteLineItem'
import { GET_CHECKOUT } from '../gql/queries/GetCheckout'

export default function useCheckout() {
  const { showFieldErrors, showSuccessToast } = useShowNotification()
  const cartStore = useCartStore()

  const checkoutItems = ref([])

  const checkoutId = computed(() => cartStore.checkoutId?.toString())

  const { mutate: addItemToCheckout } = useMutation(ADD_ITEM_TO_CHECKOUT)
  const { mutate: createCheckout } = useMutation(CREATE_CHECKOUT)
  const { mutate: deleteCheckoutItem } = useMutation(DELETE_CHECKOUT_LINES)

  const { result, error, refetch } = useQuery(
    GET_CHECKOUT,
    () => {
      return { checkoutId: checkoutId.value }
    },
    {
      fetchPolicy: 'network-only',
      enabled: !!checkoutId.value
    }
  )
  const handleAddToCart = async ({
    productVariantId,
    quantity,
    productName
  }: {
    productVariantId: string
    quantity: number
    productName: string
  }) => {
    let checkoutId = cartStore.checkoutId
    if (result?.value?.checkout?.lines?.length === 0)
      cartStore.checkoutId = null

    if (!quantity) throw ['ERROR 666 QUANTITY REQUIRED']
    if (!productVariantId) throw ['ERROR 666 PRODUCT VARIANT ID REQUIRED']

    if (checkoutId) {
      try {
        const {
          data: {
            checkoutLinesAdd: {
              // checkout,
              errors
            }
          }
        } = await addItemToCheckout({
          quantity,
          checkoutId,
          variantId: productVariantId
        })

        if (errors.length) throw errors
        await refetch()

        showSuccessToast(
          `${quantity} item/s of ${productName} successfully in the cart`
        )
      } catch (errors) {
        showFieldErrors(Array.isArray(error) ? error : [error])
      }
    }

    if (!checkoutId) {
      try {
        const { data } = await createCheckout({
          input: {
            channel: 'australia-direct-sales',
            lines: [
              {
                quantity: quantity,
                variantId: productVariantId
              }
            ],
            validationRules: {
              billingAddress: {
                checkRequiredFields: false,
                checkFieldsFormat: false
              }
            }
          }
        })

        checkoutId = data?.checkoutCreate?.checkout?.id

        if (checkoutId) cartStore.checkoutId = checkoutId
        showSuccessToast(
          `${quantity} item/s of ${productVariantId} successfully in the cart`
        )
      } catch (error) {
        showFieldErrors(Array.isArray(error) ? error : [error])
      } finally {
        if (cartStore.checkoutId) {
          await refetch()
        }
      }
    }
  }
  const handleDeleteCheckoutItem = async (idCheckoutLines) => {
    try {
      const { data } = await deleteCheckoutItem({
        idCheckout: checkoutId.value,
        idCheckoutLines
      })
      const errors = data.checkoutLinesDelete.errors
      if (errors.length) throw errors
      showSuccessToast(`Item successfully deleted in the cart`)
      const refetchResult = await refetch({ fetchPolicy: 'network-only' })
      checkoutItems.value = refetchResult?.data.checkout.lines
    } catch (error) {
      showFieldErrors(Array.isArray(error) ? error : [error])
    }
  }

  watchEffect(() => {
    if (result.value?.checkout.lines) {
      checkoutItems.value = result.value?.checkout || []
    }

    if (error.value) {
      showFieldErrors(Array.isArray(error) ? error : [error])
    }
  })

  return {
    handleAddToCart,
    handleDeleteCheckoutItem,
    checkoutItems
  }
}
