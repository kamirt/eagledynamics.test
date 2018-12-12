<template>
  <section class="vehicles" onselectstart="return false">
    <div class="arrow arrow--left" @click="handleArrowClick('left')">
      <sprite base-id="arrow" viewbox="0 0 512 512"/>
    </div>
    <div id="vehicles-carousel"
         @mousedown="handleMouseDown"
         @mousemove="handleMove"
         @mouseup="handleMouseUp"
         @mouseleave="handleMouseUp">
      <div
        class="carousel"
        :style="getTransform">
        <div v-for="item in vehicles" :key="item.id"
             class="vehicle" @click="handleClick(item)">
          <div class="vehicle__pic" :class="{ blocked: item.blocked, 'buy-only': item['buy_only'] }" onselectstart="return false">
            <sprite v-if="item.blocked && !item['buy_only']" base-id="block" viewbox="0 0 540 540"></sprite>
            <div v-if="item['buy_only']" class="unlock">
              <p class="regular">Buy to unlock</p>
              <button class="btn">Buy</button>
              <sprite base-id="block" viewbox="0 0 540 540"></sprite>
            </div>
            <img :src="getImage(item.pic)" alt="">
          </div>
          <span class="bold">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="arrow arrow--right" @click="handleArrowClick('right')">
      <sprite base-id="arrow" viewbox="0 0 512 512"/>
    </div>
  </section>
</template>
<script>
import Sprite from './svg/Sprite.vue'
export default {
  components: {
    'sprite': Sprite
  },
  computed: {
    vehicles () {
      return this.$store.state.vehicles.vehicles
    },
    getTransform () {
      return `transform: translateX(${this.offset}%)`
    }
  },
  data () {
    return {
      down: false,
      xPos: 0,
      offset: 0,
      dragged: false
    }
  },
  methods: {
    getImage (pic) {
      return require('../assets/img/vehicles/' + pic)
    },
    handleMove (e) {
      if (this.down) {
        requestAnimationFrame(() => {
          let offset = ((e.clientX - this.xPos) / window.innerWidth) * 100
          let generalOffset = offset + this.offset
          generalOffset > 100
            ? generalOffset = 90
            : generalOffset < -100
              ? generalOffset = -90
              : null
          this.dragged
            ? this.offset = generalOffset
            : this.offset = offset
        })
      }
    },
    handleMouseDown (e) {
      this.down = true
      this.xPos = e.clientX
    },
    handleMouseUp (e) {
      this.down = false
      if (this.offset !== 0) this.dragged = true
    },
    handleArrowClick (direction) {
      if (direction === 'right' && this.offset > -10) {
        this.offset -= 10
      } else if (direction === 'left' && this.offset < 70) {
        this.offset += 10
      }
    },
    handleClick (vehicle) {
      console.log(vehicle.name)
    }
  }
}
</script>
<style lang="scss" scoped>
  .vehicles {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .arrow {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 30px;
    &--right {
      transform: rotateY(180deg);
    }
    & svg {
      stroke-width: 1.5;
      fill: #fff;
      width: 30px;
      height: 30px;
    }
  }
  #vehicles-carousel {
    width: 80%;
    overflow: hidden;
  }
  .carousel {
    display: flex;
    transition: transform .5s;
  }
  .vehicle {
    padding: 10px;
    transition: transform .5s;
    position: relative;
    &:hover {
      transform: scale(1.1);
    }
    &__pic {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      width: 230px;
      height: 120px;
      border-radius: 3px;
      &.blocked:not(.buy-only):before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0, 0, 0, 0.3);
      }
      & svg {
        width: 30px;
        height: 30px;
        fill: white;
        position: absolute;
        top: 10px;
        right: 10px;
      }
      & img {
        width: 100%;
        pointer-events: none;
      }
    }
    & span {
      color: #fff;
      font-weight: bold;
      display: block;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 10px;
    }
  }
  .unlock {
    position: absolute;
    width: 100%;
    height: 100%;
    & p {
      padding: 4px 20px 0;
    }
    & .btn {
      margin: 0 5%;
      width: 90%;
    }
    & svg {
      fill: black;
    }
  }
</style>
