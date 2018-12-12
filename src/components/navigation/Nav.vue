<template>
  <nav id="nav">
    <ul class="main-menu decorative">
      <li class="hovered" @mouseenter="onMenuItemHover" @click="(e) => onMenuItemClick(e, 'mac')">
        MAC
        <span class="bold">modern air combat</span>
        <transition name="fade">
          <popup v-if="chosen==='mac'" position="right" :items="popupItems" @mouseleave="hideMenu"/>
        </transition>
      </li>
      <li @mouseenter="onMenuItemHover" @click="(e) => onMenuItemClick(e, 'fl')">
        FL
        <span class="bold">digital combat simulator</span>
        <transition name="fade">
          <popup v-if="chosen==='fl'" position="right" :items="popupItems" @mouseleave="hideMenu"/>
        </transition>
      </li>
      <li @mouseenter="onMenuItemHover" @click="(e) => onMenuItemClick(e, 'dsc')">
        DSC
        <span class="bold">flying legend</span>
        <transition name="fade">
          <popup v-if="chosen==='dsc'" position="right" :items="popupItems" @mouseleave="hideMenu"/>
        </transition>
      </li>
      <li class="profile" @click="openProfile">
        <span class="profile__username regular">{{ profile.username }}</span>
        <div class="profile__avatar" :style="{ 'background-image': 'url(' + getAva(profile.avatar) + ')' }">
        </div>
        <span class="profile__more regular"><sprite base-id="down" viewbox="0 0 512 512"></sprite></span>
        <transition name="fade">
          <popup v-if="chosen==='profile'" position="left" :user="profile" :items="popupItems" @mouseleave="hideMenu" />
        </transition>
      </li>
    </ul>
  </nav>
</template>
<script>
import Popup from './Popup'
import Sprite from '../svg/Sprite'

export default {
  components: {
    'popup': Popup,
    'sprite': Sprite
  },
  computed: {
    profile () {
      return this.$store.state.user.user
    }
  },
  data () {
    return {
      chosen: false,
      popupItems: [],
      menu: {
        mac: [
          {
            name: 'Game options',
            icon: 'gear',
            viewbox: '0 0 54 54'
          },
          {
            name: 'Encyclopedia',
            icon: 'book',
            viewbox: '0 0 413 413'
          },
          {
            name: 'Shop',
            icon: 'cart',
            viewbox: '0 0 512 512'
          },
          {
            name: 'Exit',
            icon: 'door',
            viewbox: '0 0 512 512'
          }
        ],
        fl: [
          {
            name: 'Lorem Ipsum is simply dummy \n' +
            'text of the printing'
          },
          {
            button: 'btn-transparent',
            text: 'Buy Game'
          }
        ],
        dsc: [
          {
            name: 'Lorem Ipsum is simply dummy \n' +
            'text of the printing'
          },
          {
            button: 'btn-red',
            text: 'Run Game'
          }
        ],
        profile: [
          {
            name: 'Login user',
            subname: 'User Rank',
            icon: 'rank',
            viewbox: '0 0 298 298'
          },
          {
            name: 'Logbook',
            icon: 'agenda',
            viewbox: '0 0 381 381'
          },
          {
            name: 'Setup aircraft',
            icon: 'gear',
            viewbox: '0 0 54 54'
          },
          {
            name: 'Setup controls',
            icon: 'joystick',
            viewbox: '0 0 512 512'
          }
        ]
      }
    }
  },
  methods: {
    onMenuItemHover (e) {
      requestAnimationFrame(() => {
        let hovered = document.querySelector('.hovered')
        if (hovered) this.$removeClass(hovered, 'hovered')
        this.$addClass(e.target, 'hovered')
      })
    },
    onMenuItemClick (e, itemName) {
      if (e.target.className === 'popup') return
      requestAnimationFrame(() => {
        let active = document.querySelector('.active')
        if (active) this.$removeClass(active, 'active')
        this.$addClass(e.target, 'active')
      })
      this.popupItems = this.menu[itemName]
      this.chosen = itemName
    },
    openProfile () {
      this.popupItems = this.menu.profile
      this.chosen = 'profile'
    },
    hideMenu () {
      this.chosen = ''
    },
    getAva (avatar) {
      if (avatar) return require('@/assets/img/avatars/' + avatar)
    }
  }
}
</script>
<style lang="scss" scoped>
  @keyframes slide {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
  #nav {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 10px 0 0;
    color: #fff;
    z-index: 1;
    &:before {
      content: "";
      width: 100%;
      height: 10px;
      box-shadow: 0px 20px 60px rgba(0,0,0,0.5);
      background-color: rgba(255, 255, 255, 0.1);
      position: absolute;
      top: 0;
    }
  }
  .main-menu {
    list-style: none;
    display: flex;

    & li {
      background: rgba(255, 255, 255, 0);
      border-radius: 3px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 170px;
      height: 90px;
      margin-right: 3px;
      font-size: 48px;
      letter-spacing: 5px;
      position: relative;
      transition: background .3s ease-in;
      &:before {
        content: "";
        width: 67%;
        height: 10px;
        background: pink;
        position: absolute;
        top: -26px;
        transform: scaleX(0);
      }
      & span {
        display: block;
        font-size: 8px;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: font-size .1s ease-in;
        pointer-events: none;
      }
      &.hovered {
        background: rgba(255, 255, 255, 0.1);
        & span {
          font-size: 12px;
          text-align: center;
        }
        &:before {
          animation: slide .2s ease-in-out;
          transform: scaleX(1);
        }
      }
      &.active {
        transition: background .3s;
        background: linear-gradient(to bottom, #ff8259 0%,#ffdf3f 100%);
      }
    }
    .profile {
      font-size: 19px;
      position: absolute;
      right: 2%;
      flex-direction: row;
      justify-content: space-around;
      &__avatar {
        background-size: cover;
        background-position: center center;
        width: 50px;
        height: 50px;
        border-radius: 25px;
      }
      & span {
        display: block;
        font-size: 19px;
        letter-spacing: 1px;
      }
      &__more {
        & svg {
          width: 10px;
          height: 10px;
          fill: #fff;
        }
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s ease, transform .2s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .fade-enter{
      opacity: 0;
      transform: scaleX(0.5);
    }
    .fade-leave-to {
      opacity: 0;
    }
  }

</style>
