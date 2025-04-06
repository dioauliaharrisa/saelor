// useShowNotification.ts
import { useToast } from 'primevue/usetoast'

export default function useShowNotification() {
  const toast = useToast()

  const showFieldErrors = (
    errors: Array<{ message: string; field?: string }>
  ) => {
    for (const error of errors) {
      toast.add({
        severity: 'error',
        summary: error.field ? `Error in ${error.field}` : 'Error',
        detail: error.message || 'Something went wrong',
        life: 6000
      })
    }
  }

  const showErrorToast = (message: string) => {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 6000
    })
  }

  const showSuccessToast = (message: string) => {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 4000
    })
  }

  return {
    showFieldErrors,
    showErrorToast,
    showSuccessToast
  }
}
