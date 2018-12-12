<template>
  <div class="popup regular" :class="position" @mouseleave="onMouseLeave">
    <ul class="popup-menu">
      <li
        v-for="(item, key) in items"
        :key="key"
        :class="{profile: item.subname}"
        @click="(e) => { item.button || item.icon ? handlePopupItemClick(e, item) : null }">
        <sprite v-if="item.icon && !item.subname" :viewbox="item.viewbox" :base-id="item.icon" class="icon"></sprite>
        <span v-if="!item.subname && !item.button">{{ item.name }}</span>
        <div v-if="item.subname" class="details">
          <div class="details__icon">
            <svg
              class="circle"
            >
              <circle
                stroke="#26b526"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="circumference.split(' ')[0]"
                stroke-width="3"
                fill="transparent"
                :r="radius"
                :cx="radius + 2"
                :cy="radius + 2"

              />
            </svg>
            <div class="details__icon__inner">
              <sprite v-if="item.icon" :viewbox="item.viewbox" :base-id="item.icon" class="icon__profile"></sprite>
            </div>
          </div>
          <div class="details__text">
            <span>{{ item.name }}</span>
            <span>{{ item.subname }}: {{ user.rank }}</span>
          </div>
        </div>
        <button v-if="item.button" class="btn" :class="item.button">{{ item.text }}</button>
      </li>
    </ul>
    <svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
      <linearGradient id="rank-gradient" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffcc00" />
        <stop offset="100%" stop-color="#ff8d00" />
      </linearGradient>
    </svg>
  </div>
</template>
<script>
import Sprite from '@/components/svg/Sprite'
export default {
  props: {
    items: Array,
    position: String,
    user: Object
  },
  computed: {
    circumference () {
      return `${this.radius * 2 * Math.PI} ${this.radius * 2 * Math.PI}`
    }
  },
  data () {
    return {
      radius: 21
    }
  },
  mounted () {
    if (!this.user) return
    setTimeout(() => {
      requestAnimationFrame(() => {
        let circumference = this.radius * 2 * Math.PI
        let circle = document.querySelector('circle')
        let offset = circumference - (circumference / 100 * this.user.score);
        circle.style.strokeDashoffset = `-${offset}`
      })
    }, 500)
  },
  components: {
    'sprite': Sprite
  },
  methods: {
    getCircleStyle () {
      return `stroke-dashoffset:${this.radius * 2 * Math.PI}`
    },
    classObj (item) {
      return (!item.button && !item.icon) || item.button
        ? 'without-transition'
        : ''
    },
    handlePopupItemClick (e, { name = '', text = '' }) {
      console.log(name, text)
    },
    onMouseLeave () {
      this.$emit('mouseleave')
    }
  }
}
</script>
<style lang="scss" scoped>
  .popup {
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 110px;
    left: 35%;
    font-size: 16px;
    letter-spacing: 1px;
    color: #000000;
    font-weight: 300;
    border-radius: 3px;
    min-width: 305px;
    &.left {
      left: auto;
      right: 0;
      background: #fff;
      & li:hover {
        background: #c2c2c2!important;
      }
      &:before {
        left: auto;
        right: 15%;
      }
    }
    &:before {
      content: "";
      position: absolute;
      width: 0;
      top: -14px;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 14px solid rgba(255, 255, 255, 0.5);
      left: 16px;
    }
    &-menu {
      padding: 0;
      & li {
        display: flex;
        align-items: center;
        padding: 20px;
        background: rgba(255, 255, 255, 0);
        &.profile {
          border-bottom: 1px solid #c2c2c2;
          background: rgba(255, 255, 255, 1);
        }
        &:not(.without-transition) {
          transition: background .3s ease-in;
          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        & span {
          margin: 0 20px;
        }
      }
    }
    .details {
      display: flex;
      align-items: center;
      &__icon {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: green;
        position: relative;
        & .circle {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 2;
          width: 46px;
          height: 46px;
        }
        &__inner {
          position: absolute;
          left: 0;
          top: 0;
          background: grey;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          & svg {
            margin-bottom: -3px;
            width: 28px;
            height: 28px;
            fill: url(#rank-gradient) #447799;
          }
        }
      }
      &__text {
        & span {
          display: block;
          &:first-child {
            font-size: 14px;
            margin-bottom: 8px;
          }
          &:last-child {
            font-size: 12px;
          }
        }
      }
    }
  }
  circle {
    transition: stroke-dashoffset 1s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
</style>
