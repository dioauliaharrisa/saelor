<script setup>
  const cartStore = useCartStore()
  const user = cartStore.user || {}
  const orders = computed(() => cartStore.user?.orders?.edges || [])
  console.log('🦆 ~ orders:', orders)
  const router = useRouter()
  const fieldsOverview = [
    {
      title: 'Orders',
      subtitles: [
        {
          title: 'View all orders',
          onClick: () => router.push('/')
        },
        {
          title: 'Track a package',
          onClick: () => router.push('/')
        }
      ]
    },
    {
      title: 'Quotes',
      subtitles: [
        {
          title: 'View all quotes',
          onClick: () => router.push('/')
        },
        {
          title: 'Create a quote',
          onClick: () => router.push('/')
        }
      ]
    },
    {
      title: 'Parts List',
      subtitles: [
        {
          title: 'View all parts lists',
          onClick: () => router.push('/')
        }
      ]
    },
    {
      title: 'Invoices',
      subtitles: [
        {
          title: 'Request invoice',
          onClick: () => router.push('/')
        }
      ]
    },
    {
      title: 'Profile',
      subtitles: [
        {
          title: 'Update details',
          onClick: () => router.push('/')
        },
        {
          title: 'Change a password',
          onClick: () => router.push('/')
        }
      ]
    },
    {
      title: 'Order Preferences',
      subtitles: [
        {
          title: 'Order preferences',
          onClick: () => router.push('/')
        },
        {
          title: 'Link to RS account',
          onClick: () => router.push('/')
        }
      ]
    }
  ]
</script>

<template>
  <div id="page">
    <div class="container_title">
      <div style="display: flex; align-items: baseline; gap: 1rem">
        <h1>Overview</h1>
        <h5>Good morning, {{ user.firstName }}</h5>
      </div>
      <div id="grid-overview">
        <Card
          v-for="(field, index) in fieldsOverview"
          :key="index"
          class="order"
        >
          <template #title>
            <h5>{{ field.title }}</h5>
          </template>
          <template #content>
            <p v-for="(subtitle, index) in field.subtitles" :key="index">
              {{ subtitle.title }}
            </p>
          </template>
        </Card>
      </div>
      <Divider />
      <h4>Recent Orders</h4>
      <p>Your last 3 order are listed below</p>
      <Card v-for="(order, index) in orders" :key="index" class="order">
        <template #title>
          <h3>Status: {{ order?.node?.statusDisplay }}</h3>
          <h6>
            Order Number: {{ order?.node?.orderNumber }} Order Date:
            {{ order?.node?.createdAt }}
          </h6>
          <Divider />
        </template>
        <template #content>
          <p>
            {{ order?.node?.lines[0]?.productName }}
          </p>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
  #page {
    width: 100%;
    max-width: 80%;
  }
  #grid-overview {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 1rem;
  }
  .p-card {
    padding: 0;
    margin: 0;
  }
</style>
