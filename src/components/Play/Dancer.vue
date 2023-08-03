<template>
  <Header ref="headerBar" @toggle-menu="toggleBurgerMenu()"/>
  <Sidebar ref="sideBarMobileToggle"/>
  <div>
    <div class="dancer-invi-box"></div>
    <div class="dancer-container">
      <h1>Dancer</h1>
      <div class="container-box">
        <div class="dancer-wrapper">
          <div class="dancer-data-box">
            <h3 class="h3-text-style">Hire Dancers</h3>
            <div @click="hireDancerModal()" class="btn-style-custom cursor-pointer ex-btn">
              <div class="btnCustom-blue">
                <img src="./../../assets/images/icon/frame.png">
                Hire Quantity</div>
            </div>
          </div>
          <div class="dancer-data-box">
            <h3 class="h3-text-style">Current Dancers</h3>
            <h5>{{ currentDancers }}</h5>
            <router-link :to="{ path: '/CreateCrew', query: { ref: paramsRef }}">
              <div class="btn-style-custom cursor-pointer ex-btn">
                <div class="btnCustom-blue">Create Crew</div>
              </div>
            </router-link>
          </div>
          <div class="dancer-data-box">
            <h3 class="h3-text-style">Total Dance Power</h3>
            <h5>{{ totalDancePower }}</h5>
            <div class="mass-btn-box">
              <div @click="selectAll()" class="btn-style-custom cursor-pointer">
                <div class="btnCustom-blue half-left">Select All</div>
              </div>
              <div @click="dismissItemGroup()" class="btn-style-custom cursor-pointer">
                <div class="btnCustom-purple half-right">Mass Dismiss</div>
              </div>
            </div>
          </div>
        </div>
        <div ref="levelChoose" class="choose-level-wrapper">
          <!-- FilterByLevel -->
          <div class="filter-level-container">
            <h5>Filter By Level-</h5>
            <div class="pagintaion-level-custom">
              <div @click="filterByLevel('all');" class="pag-box cursor-pointer" :class="{ 'active': levelChoose === 'all' }">
                <span>All</span>
              </div>
              <div @click="filterByLevel(1);" class="pag-box cursor-pointer" :class="{ 'active': levelChoose === 1 }">
                <span>1</span>
              </div>
              <div @click="filterByLevel(2);" class="pag-box cursor-pointer" :class="{ 'active': levelChoose === 2 }">
                <span>2</span>
              </div>
              <div @click="filterByLevel(3);" class="pag-box cursor-pointer" :class="{ 'active': levelChoose === 3 }">
                <span>3</span>
              </div>
              <div @click="filterByLevel(4);" class="pag-box cursor-pointer" :class="{ 'active': levelChoose === 4 }">
                <span>4</span>
              </div>
              <div @click="filterByLevel(5);" class="pag-box cursor-pointer" :class="{ 'active': levelChoose === 5 }">
                <span>5</span>
              </div>
            </div>
          </div>
          <!-- Range Slider -->
          <div class="range-slider-container">
            <vue-slider 
            ref="slider"
              v-model="rangeValue" 
              v-bind="rangeOptions"
              :enable-cross="false"
            ></vue-slider>
              <div class="rangeValueConvert">
                <span>1</span>
                <span>200+</span>
              </div>
          </div>
        </div>
        <!-- Dancer Card -->
        <div class="dancer-card-wrapper">
          <div class="dancer-card-container">
            <div v-for="(dancer, index) in dancerCardData" :key="index" v-show="
            dancer.dp >= rangeValue[0] && (dancer.dp <= rangeValue[1] || rangeValue[1] === 200) &&
            ((levelChoose === 'all') ||
            (levelChoose === 1 && dancer.rate === 1) ||
            (levelChoose === 2 && dancer.rate === 2) ||
            (levelChoose === 3 && dancer.rate === 3) ||
            (levelChoose === 4 && dancer.rate === 4) ||
            (levelChoose === 5 && dancer.rate === 5) )
            " @click="checkDancer(index)" class="dancer-card-box cursor-pointer card-box-hover" :class="{ 'active-check': dancer.check === true }">
              <img class="card-character" v-if="dancer.name === 'Andy'" :src="require(`./../../assets/images/card/Dancer/LV1-Andy.png`)">
              <img class="card-character" v-if="dancer.name === 'Ava'" :src="require(`./../../assets/images/card/Dancer/LV1-Ava.png`)">
              <img class="card-character" v-if="dancer.name === 'Bess'" :src="require(`./../../assets/images/card/Dancer/LV2-Bess.png`)">
              <img class="card-character" v-if="dancer.name === 'Bivins'" :src="require(`./../../assets/images/card/Dancer/LV2-Bivins.png`)">
              <img class="card-character" v-if="dancer.name === 'Carlos'" :src="require(`./../../assets/images/card/Dancer/LV3-Carlos.png`)">
              <img class="card-character" v-if="dancer.name === 'Colton'" :src="require(`./../../assets/images/card/Dancer/LV3-Colton.png`)">
              <img class="card-character" v-if="dancer.name === 'Casy'" :src="require(`./../../assets/images/card/Dancer/LV3-Casy.png`)">
              <img class="card-character" v-if="dancer.name === 'Dannie'" :src="require(`./../../assets/images/card/Dancer/LV4-Dannie.png`)">
              <img class="card-character" v-if="dancer.name === 'Daphne'" :src="require(`./../../assets/images/card/Dancer/LV4-Daphne.png`)">
              <img class="card-character" v-if="dancer.name === 'Edward'" :src="require(`./../../assets/images/card/Dancer/LV5-Edward.png`)">
              <img class="card-character" v-if="dancer.name === 'Evelyn'" :src="require(`./../../assets/images/card/Dancer/LV5-Evelyn.png`)">
              <div class="corner-left-top">
                <h5 class="cardName-style">{{ dancer.name }}</h5>
                <h6>#{{ dancer.tokenID }}</h6>
              </div>
              <div class="corner-right-top">
                <img  v-for="(key, index) in dancer.rate" :key="index" class="star-rate" src="./../../assets/images/icon/star-rate.png">
              </div>
              <div class="corner-left-bottom">
                <div class="cursor-pointer tooltip-custom" @click="dismissItem(dancer.tokenID)">
                  <img class="star-rate" src="./../../assets/images/icon/character-delete.png">
                  <span class="tooltiptext-custom">Dismiss</span>
                </div>

                <!-- sellItemToMarket( dancer.tokenID, 1) -->
                <div @click="listMarketModal( 'dancer' , dancer.tokenID, index)" class="cursor-pointer tooltip-custom">
                  <img class="star-rate" src="./../../assets/images/icon/character-buy.png">
                  <span class="tooltiptext-custom">Sell</span>
                </div>
              </div>
              <div class="corner-right-bottom " v-if="dancer.check === true" :class="{ 'checked': dancer.check === true }">
                <img src="./../../assets/images/icon/check-v.png">
              </div>
              <h4 class="cardName-style">{{ dancer.dp }} DP</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalHireDancer ref="modalHireDancer" @reveal-modal="revealStart()"/>
  <ModalListOnMarketPlace ref="modalListOnMarketPlace" @refresh="revealDancers()"/>
  <ModalReveal ref="modalReveal" @reveal-dancers="revealDancers()"/>
  <ModalDismissConfirm ref="modalDismissConfirm" @refresh="revealDancers()"/>
  <ModalDismissComplete ref="modalDismissComplete" @collect-reward="collectReward()" />
</template>

<script>
import Web3 from 'web3';
import { useRoute } from "vue-router";
import { defineComponent } from "vue";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import ModalHireDancer from './../../components/Modal/ModalHireDancer.vue'
import ModalListOnMarketPlace from './../../components/Modal/ModalListOnMarketPlace.vue'
import ModalDismissComplete from './../../components/Modal/ModalDismissComplete.vue'
import ModalReveal from './../../components/Modal/ModalReveal.vue';
import ModalDismissConfirm from './../../components/Modal/ModalDismissConfirm.vue';
import Header from './../../components/Header.vue'
import Sidebar from './../../components/Sidebar.vue'

export default defineComponent ({
  name: 'DancerPage',
  props: {
  },
  inject: {
    Display: {
      from: 'Display'
    },
    MarketPlace: {
      from: 'MarketPlace'
    }
  },
  components: {
    VueSlider,
    ModalHireDancer,
    ModalListOnMarketPlace,
    ModalReveal,
    ModalDismissComplete,
    ModalDismissConfirm,
    Header,
    Sidebar,
  },

  data() {
    return {
      loadingStatus: '',
      walletAddress: null,
      currentDancers: 0,
      totalDancePower: 0,
      levelChoose: 'all',

      rangeValue: [1, 200],
      rangeOptions: {
        dotSize: 16,
        width: 'auto',
        height: 2,
        contained: false,
        direction: 'ltr',
        data: null,
        dataLabel: 'label',
        dataValue: 'value',
        min: 1,
        max: 200,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: 'active',
        tooltipPlacement: 'top',
        tooltipFormatter: void 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        marks: false,
        dotOptions: void 0,
        dotAttrs: void 0,
        process: true,
        dotStyle: void 0,
        railStyle: void 0,
        processStyle: void 0,
        tooltipStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0,
      },

      selectAllCheck: false,
      dancerCardData: [],
      dancerCardListTotalPower: [],
      route: useRoute(),

      groupCardDataDismiss: [],
      paramsRef: ''
    }
  },

  mounted() {
    this.rangeValue = [1, 200];
    this.displayDancer();
    this.$refs.sideBarMobileToggle.activeClass('pdancer');
    this.paramsRef = this.$route.query.ref;
  },
  methods: {
    toggleBurgerMenu() {
      this.$refs.sideBarMobileToggle.toggleBurgerMenu();
    },

    hireDancerModal() {
      this.$refs.modalHireDancer.showDancerModal();
    },

    listMarketModal( itemType, tokenId, index) {
      this.$refs.modalListOnMarketPlace.showModal(itemType, tokenId);
      this.dancerCardData[index].check = !this.dancerCardData[index].check;
    },

    revealStart() {
      this.$refs.modalReveal.showModal('dancers');
    },

    collectReward() {
      this.$refs.headerBar.collectReward();
    },

    async revealDancers() {
      // console.log("TEST");
      this.rangeValue = [1, 200];
      this.levelChoose = 'all';
      this.$refs.headerBar.collectReward();
      await this.displayDancer();
    },

    // Display Smart Contract Dancer Character
    async displayDancer() {
      this.totalDancePower = 0;
      this.currentDancers = 0;
      this.dancerCardData = [];
      var renderList = [];
      
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
        // console.log(this.walletAddress);
      });

      var dancerData = await this.Display().displayDancer(this.walletAddress);
      for (let i = 0; i < dancerData['0'].length; i++ ) {
        renderList.push(
          { 
            tokenID: dancerData['0'][i],
            name: dancerData['1'][i],
            rate: parseInt(dancerData['2'][i]),
            dp: parseInt(dancerData['3'][i]),
            check: false
          },
        );
        this.totalDancePower += parseInt(renderList[i].dp);
      }
      this.dancerCardData = renderList;
      this.currentDancers = this.dancerCardData.length;
      this.dancerCardData.reverse();
    },

    async filterByLevel(level) {
      this.levelChoose = level;
    },

    checkDancer(index) {
      if( this.dancerCardData.length > 0) {
        this.dancerCardData[index].check = !this.dancerCardData[index].check;
        const groupCardDataDismiss = this.dancerCardData.filter(v =>  v.check === true)
        this.groupCardDataDismiss = groupCardDataDismiss.map(v => v.tokenID);
      }
      // this.totalDancePower = 0;
      // for (var i = 0; i < this.dancerCardData.length ; i++) {
      //   if ( this.dancerCardData[i].check === true ) {
      //     this.totalDancePower += parseInt(this.dancerCardData[i].power);
      //   }
      // }
    },


    selectAll() {
      this.selectAllCheck = !this.selectAllCheck;
      this.groupCardDataDismiss = [];
      for (let i = 0; i < this.dancerCardData.length ; i++) {
        this.dancerCardData[i].check = this.selectAllCheck;

        if (this.dancerCardData[i].check) {
          this.groupCardDataDismiss.push(this.dancerCardData[i].tokenID);
        } else {
          this.groupCardDataDismiss = [];
        }
      }
      // console.log(this.groupCardDataDismiss);
    },

    async dismissItem(tokenID) {
      this.$refs.modalDismissConfirm.showModal('dancer', tokenID);
    },

    async dismissItemGroup() {
      if ( this.groupCardDataDismiss.length > 0) {
        this.$refs.modalDismissConfirm.showModal('dancerGroup', this.groupCardDataDismiss);
      }
    },

    goTo() {
      this.$refs['levelChoose'].scrollIntoView({behavior: "smooth"});
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dancer-invi-box {
    min-height: 50px;
  }

  .dancer-container {
    width: 100%;
    padding: 0px 15px 0 15px;
    display: block;
    margin: 0 auto;
  }

  h1 {
    text-align: left;
    color: #ffffff;
    margin-bottom: 20px;
    padding-left: 35px;
  }

  .dancer-wrapper {
    display: flex;
  }

  .dancer-data-box {
    margin: 0px 10px;
    padding: 10px 5px;
    background: rgba(50,47,208, .4);
    width: 33%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .dancer-card-box.active-check {
    border: 2px solid #ffffff;
  }

  .dancer-data-box h5 {
    margin: 10px 0;
    color: #59D8FD;
  }

  .dancer-data-box .titleDancer {
    height: 1.5vw;
    max-height: 40px;
    min-height: 15px;
  }

  .dancer-data-box .btnDancer {
    height: 3vw;
    max-height: 60px;
    min-height: 30px;
  }

  .choose-level-wrapper {
    display: flex;
    margin: 0 auto 0 0;
    align-items: end;
    flex-wrap: wrap;
  }

  .filter-level-container {
    margin: 35px 10px;
    display: inline-block;
  }

  .filter-level-container h5 {
    text-align: left;
    color: #ffffff;
    margin-bottom: 25px;
  }

  .pagintaion-level-custom {
    display: flex;
  }

  .pagintaion-level-custom div{
    margin: 0 1.5px;
  }

  .range-slider-container {
    width: 100%;
    max-width: 300px;
    margin: 35px 10px 35px 100px;
  }

  .rangeValueConvert {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    color: #ffffff;
  }

  .dancer-card-wrapper {
    display: flex;
  }

  .dancer-card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(280px, 1fr));
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .dancer-card-box {
    position: relative;
    margin: 10px;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    padding: 0px 10px;
    background-color: rgba(14,8,38, .5);
    max-height: 350px;
  }

  .dancer-card-inner-box {
    position: relative;
    width: 100%;
    margin: 0 auto 15px auto;
    padding-top: 100%;
    border-radius: 15px;
    display: flex;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .card-character {
    height: 80%;
    margin: auto;
  }

  .corner-left-top {
    position: absolute;
    left: 5%;
    top: 5%;
  }

  .corner-right-top {
    position: absolute;
    right: 5%;
    top: 5%;
    display: flex;
  }

  .star-rate {
    margin: 0 1.5px;
  }

  .corner-right-top img{
    width: 1.5vw;
    min-width: 10px;
    max-width: 25px;
  }

  .dancer-card-box h4 {
    color: #ffffff;
    font-size: 1.2em;
    text-align: center;
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 8.5%;
  }

  .corner-left-top h5 {
    color: #ffffff;
    font-size: 1.2em;
    text-align: left;
  }

  .corner-left-top h6 {
    color: #ffffff;
    font-size: .6em;
    text-align: left;
  }

  .corner-left-bottom {
    position: absolute;
    left: 5%;
    bottom: 8.5%;
    display: flex;
    flex-direction: column;
  }

  .corner-left-bottom img{
    margin: 5px 0;
  }

  @media (max-width: 960px) {
    .card-character {
      height: auto;
      width: 100%;
      margin: 45px 0;
    }

    .dancer-wrapper {
      flex-wrap: wrap;
      justify-content: center;
    }

    .dancer-data-box:nth-child(1),
    .dancer-data-box:nth-child(2) {
      width: 47%;
      margin: 1% 1.5%;
    }

    .dancer-data-box:nth-child(3) {
      width: 100%;
      margin: 1% 1.5%;
    }

    .dancer-card-container {
      grid-template-columns: repeat(auto-fill,minmax(48%, 1fr));
    }


    .dancer-card-box {
      max-height: 250px;
    }

    .range-slider-container {
      width: 90%;
      max-width: unset;
      margin: 5px auto;
    }

    .dancer-card-box h4 {
      font-size: 1em;
    }
  }
  
</style>
