<template>
  <nav>
    <div class="nav">
      <div v-if="toggleMenu === true" class="menu-mask" @click="toggleBurgerMenu()"></div>
      <div class="nav-container" :style="[ toggleMenu === true ? { 'left': '0' } : { 'left': '-250px' }]">
        <div class="nav-invi-box"></div>
        <div class="nav-main-box">
          <!-- Play -->
          <!-- Dancer -->
          <h4 class="sidebar-title-custom">Play</h4>
          <!-- <img class="play-title" src="./../assets/images/play.png"> -->
          <router-link :to="{ path: '/PlayDancer', query: { ref: paramsRef }}" class="nav-bar-item" @click="toggleBurgerMenu('pdancer')">
            <div class="item-box">
              <img class="box-icon" src="./../assets/images/icon/01.png">
              <div class="item-title">
                <h5 class="sidebar-nav-custom" :class="{ active: menu === 'pdancer' }">Dancer</h5>
                <!-- <img src="./../assets/images/title/Dancer.png"> -->
              </div>
            </div>
          </router-link>
          <!-- Coach -->
          <router-link :to="{ path: '/PlayCoach', query: { ref: paramsRef }}" class="nav-bar-item" @click="toggleBurgerMenu('pcoach')">
            <div class="item-box">
              <img class="box-icon" src="./../assets/images/icon/02.png">
              <div class="item-title">
                <h5 class="sidebar-nav-custom" :class="{ 'active': menu === 'pcoach' }">Coach</h5>
                <!-- <img src="./../assets/images/title/Coach.png"> -->
              </div>
            </div>
          </router-link>
          <!-- Crew -->
          <router-link :to="{ path: '/PlayCrew', query: { ref: paramsRef }}" class="nav-bar-item" @click="toggleBurgerMenu('pcrew')">
            <div class="item-box">
              <img class="box-icon" src="./../assets/images/icon/03.png">
              <div class="item-title">
                <h5 class="sidebar-nav-custom" :class="{ 'active': menu === 'pcrew' }">Crew</h5>
                <!-- <img src="./../assets/images/title/Crew.png"> -->
              </div>
            </div>
          </router-link>
          <!-- Battle -->
          <router-link :to="{ path: '/PlayBattle', query: { ref: paramsRef }}" class="nav-bar-item" @click="toggleBurgerMenu('pbattle')">
            <div class="item-box">
              <img class="box-icon" src="./../assets/images/icon/04.png">
              <div class="item-title">
                <h5 class="sidebar-nav-custom" :class="{ 'active': menu === 'pbattle' }">Battle</h5>
                <!-- <img src="./../assets/images/title/Battle.png"> -->
              </div>
            </div>
          </router-link>
          <div class="custom-hr"></div>
          <!-- Market -->
          <!-- Dancer -->
          <h4 class="sidebar-title-custom">Market</h4>
          <!-- <img class="market-title" src="./../assets/images/market.png"> -->
          <router-link :to="{ path: '/DancerMarket', query: { ref: paramsRef }}" class="nav-bar-item" @click="toggleBurgerMenu('mdancer')">
            <div class="item-box">
              <img class="box-icon" src="./../assets/images/icon/05.png">
              <div class="item-title">
                <h5 class="sidebar-nav-custom" :class="{ 'active': menu === 'mdancer' }">Dancer</h5>
                <!-- <img src="./../assets/images/title/Dancer.png"> -->
              </div>
            </div>
          </router-link>
          <!-- Coach -->
          <router-link :to="{ path: '/CoachMarket', query: { ref: paramsRef }}" class="nav-bar-item" @click="toggleBurgerMenu('mcoach')">
            <div class="item-box">
              <img class="box-icon" src="./../assets/images/icon/06.png">
              <div class="item-title">
                <h5 class="sidebar-nav-custom" :class="{ 'active': menu === 'mcoach' }">Coach</h5>
                <!-- <img src="./../assets/images/title/Coach.png"> -->
              </div>
            </div>
          </router-link>
          <!-- Crew -->
          <router-link :to="{ path: '/CrewMarket', query: { ref: paramsRef }}" class="nav-bar-item" @click="toggleBurgerMenu('mcrew')">
            <div class="item-box">
              <img class="box-icon" src="./../assets/images/icon/07.png">
              <div class="item-title">
                <h5 class="sidebar-nav-custom" :class="{ 'active': menu === 'mcrew' }">Crew</h5>
                <!-- <img src="./../assets/images/title/Crew.png"> -->
              </div>
            </div>
          </router-link>
          <!-- How To play -->
          <div class="custom-hr"></div>
          <h4 class="sidebar-title-custom pc-only">How To Play</h4>
          <!-- <img class="market-title pc-only" src="./../assets/images/how-to-play.png"> -->
          <a class="nav-bar-item pc-only" href="https://meta-dancing-crew.gitbook.io/meta-dancing-crew/" target="_blank">
            <div class="item-box">
                <img class="box-icon" src="./../assets/images/icon/08.png">
                <div class="item-title">
                  <h5 class="sidebar-nav-custom" :class="{ 'active': menu === 'whitepaper' }">Whitepaper</h5>
                  <!-- <img src="./../assets/images/title/Whitepaper.png"> -->
                </div>
            </div>
          </a>
          <!-- Social -->
          <div class="social-container pc-only">
            <a class="social-item" href="https://twitter.com/MetaDancingCrew" target="_blank">
              <img src="./../assets/images/icon/social01.png">
            </a>
            <a class="social-item" href="https://t.me/MetaDancingCrew" target="_blank">
              <img src="./../assets/images/icon/social02.png">
            </a>
            <a class="social-item" href="https://bscscan.com/address/0xbb2889B9B27B91358dD7c12325263c83D4a6e0A6" target="_blank">
              <img src="./../assets/images/icon/social03.png">
            </a>
          </div>
          <div class="language-container pc-only">
            <!-- <select class="language-select" aria-label="Country">
              <option selected value="en">567
                <div>
                  <img src="./../assets/images/icon/uk.png" alt="">
                </div>
              </option>
            </select>
            <img class="select-arrow" src="./../assets/images/icon/polygon.png" alt=""> -->
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  
export default {
  name: 'SidebarNavigation',
  emits: {
    "toggleMenu": false
  },
  props: {
  },
  data() {
    return {
      toggleMenu: false,
      windowWidth: window.innerWidth,
      menu: '',
      paramsRef: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });

    this.paramsRef = this.$route.query.ref;
  },

  beforeUnmount() { 
    window.removeEventListener('resize', this.onResize); 
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      // console.log(this.windowWidth)
    },

    activeClass(ac) {
      this.menu = ac;
    },

    toggleBurgerMenu(menu) {
      this.menu = menu;
      // console.log(this.menu);
      if (this.windowWidth < 960) {
        this.toggleMenu = !this.toggleMenu;
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  nav {
    position: relative;
    z-index: 8;
  }

  .menu-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0, 0.5);
  }

  .nav-container {
    box-sizing: border-box;
    width: 250px;
  }

  .play-title {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .market-title {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .nav-bar-item {
    display: block;
    color: #fff;
    text-decoration: none;
    margin-bottom: 10px;
  }

  .box-icon {
    width: 30px;
  }

  .item-box {
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    border-radius: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    color: inherit;
    display: flex;
    -webkit-box-flex: 1;
    flex-grow: 1;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    text-decoration: none;
    min-width: 0px;
    box-sizing: border-box;
    text-align: left;
    padding: 8px 16px;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .nav-container {
    background-color: rgba(18, 18, 18, .8);
    color: rgb(255, 255, 255);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0));
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1 0 auto;
    z-index: 1200;
    position: fixed;
    top: 0px;
    outline: 0px;
    border-right: 1px solid rgba(255, 255, 255, 0.12);
    transition: 1s all;
  }

  .menu-active {
    left: 0px;
  }

  .item-title {
    padding-left: 15px;
  }

  .custom-hr {
    border-bottom: 1px solid #544758;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .social-container {
    display: flex;
    justify-content: space-around;
    margin: 20px 5px;
  }

  .social-item img{
    height: 35px;
  }

  @media (min-width: 960px) {
    nav {
      width: 250px;
      flex-shrink: 0;
    }

    .nav-invi-box {
      min-height: 110px;
    }

    .nav-main-box {
      list-style: none;
      margin: 0px;
      padding: 15px 0px 0px;
      position: relative;
    }
  }
  @media (min-width: 960px) {
    .nav-container {
      left: 0 !important;
    }
  }

  @media (max-width: 960px) {
    .nav-main-box {
      padding: 15px 0px 0px;
    }

    .nav-invi-box {
      min-height: 45px;
    }

    .nav-container {
      width: 250px;
      top: 50px;
      background-color: rgb(38 24 95);
    }
  }
</style>
