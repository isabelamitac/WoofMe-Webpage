<template>
  <div id="app">
    <PageHeader />
    <!-- Render the content of the current page view -->
    <router-view/>
    <PageFooter />
    </div>
</template>

<script>
import PageFooter from './components/PageFooter.vue'
import PageHeader from './components/PageHeader.vue'

export default {
  name: 'App',
  components: {
    PageFooter,
    PageHeader
  }
}
</script>
