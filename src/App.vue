<template>
  <div id="app">
    <navigation/>
    <router-view/>
  </div>
</template>
<script>
import Nav from '@/components/navigation/Nav.vue'
export default {
  components: {
    'navigation': Nav
  }
}
</script>
