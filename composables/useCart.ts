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
    () => ({
      checkoutId: checkoutId.value
    }),
    // {
    //   enabled: computed() => !!checkoutId.value
    // }
    {
      enabled: () => !!checkoutId.value
    }
  )

  const handleAddToCart = async ({
    productVariantId,
    quantity
  }: {
    productVariantId: string
    quantity: number
  }) => {
    let checkoutId = cartStore.checkoutId

    if (!quantity) throw ['ERROR 666 QUANTITY REQUIRED']
    if (!productVariantId) throw ['ERROR 666 PRODUCT VARIANT ID REQUIRED']

    if (checkoutId) {
      try {
        const {
          data: {
            checkoutLinesAdd: {
              // checkout,
              // errors
            }
          }
        } = await addItemToCheckout({
          quantity,
          checkoutId,
          variantId: productVariantId
        })

        // if (errors.length) throw errors

        showSuccessToast(
          `${quantity} item/s of ${productVariantId} successfully in the cart`
        )
      } catch (error) {
        showFieldErrors(Array.isArray(error) ? error : [error])
      }
    }

    if (!checkoutId) {
      try {
        const { data } = await createCheckout({
          input: {
            channel: 'default-channel',
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
        await refetch()
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
      await refetch({ fetchPolicy: 'network-only' })
      const refetchResult = await refetch({ fetchPolicy: 'network-only' })
      checkoutItems.value = refetchResult?.data.checkout.lines
    } catch (error) {
      showFieldErrors(Array.isArray(error) ? error : [error])
    }
  }

  watch(
    () => checkoutId.value,
    async (newId) => {
      if (newId) {
        await refetch()
      }
    },
    { immediate: true }
  )

  watchEffect(() => {
    if (result.value?.checkout.lines) {
      checkoutItems.value = result.value?.checkout || []
    }

    if (error.value) {
      console.log('🦆 ~ watchEffect ~ error:', error)
      showFieldErrors(Array.isArray(error) ? error : [error])
    }
  })

  return {
    handleAddToCart,
    handleDeleteCheckoutItem,
    checkoutItems
  }
}
