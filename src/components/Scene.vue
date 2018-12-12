<template>
  <div id="scene">
    <vehicles/>
  </div>
</template>

<script>
  import Vehicles from './Vehicles.vue'
export default {
  name: 'Scene',
  components: {
    'vehicles': Vehicles
  }
}
</script>
<style scoped lang="scss">
  #scene {
    z-index: 1;
    position: absolute;
    top: 40px;
    width: 100%;
    height: calc( 100% - 40px );
  }
</style>
