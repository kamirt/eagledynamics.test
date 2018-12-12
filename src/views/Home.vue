<template>
  <main id="scene-wrapper" @mousemove="onSceneHover">
    <scene></scene>
  </main>
</template>

<script>
import Scene from '../components/Scene'

export default {
  name: 'home',
  components: {
    'scene': Scene
  },
  data () {
    return {
      turbulenced: false,
      clicked: false
    }
  },
  methods: {
    onSceneHover (e) {
      if (this.turbulenced) return
      requestAnimationFrame(() => {
        this.$addClass(document.querySelector('#scene-wrapper'), 'turbulenced')
        this.turbulenced = true
      })
      setTimeout(() => {
        this.$removeClass(document.querySelector('#scene-wrapper'), 'turbulenced')
      }, 1000)
      setTimeout(() => {
        this.turbulenced = false
      }, 1000)
    }
  },
  mounted () {
    this.$store.dispatch('fetchUser')
    this.$store.dispatch('fetchVehicles')
  }
}
</script>
<style lang="scss">
  @import '@/assets/css/main.scss';

  @keyframes turbulence {
    0% {
      -webkit-filter: blur(0px);
      transform: translateX(-1px);
      transform: scale(1.01);
    }
    30% {
      -webkit-filter: blur(1px);
      transform: scale(1.015);
    }
    40% {
      -webkit-filter: blur(0px);
      transform: translateX(0px);
      transform: translateY(1px);
      transform: scale(1);
    }
    60% {
      transform: scale(1.01);
    }
  }
  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
  }
  #scene-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 0;
  }
  #scene-wrapper:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background: url("../assets/img/background/su-27c.jpg") center/calc( 100% + 2px );
  }
  .turbulenced:before {
    animation: turbulence .5s infinite;
  }
</style>
