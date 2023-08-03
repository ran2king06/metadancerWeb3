<template>
  <Header ref="headerBar" @toggle-menu="toggleBurgerMenu()"/>
  <Sidebar ref="sideBarMobileToggle"/>
  <div>
    <div class="dancer-invi-box pc-only"></div>
    <div class="dancer-container">
      <h1>Coach Market</h1>
      <div class="container-box">
        <div class="choose-level-wrapper">
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
          <!-- <div  class="range-slider-container">
            <h5>Filter By DP-</h5>
            <div class="slider-container">
              <vue-slider 
              ref="slider"
                v-model="rangeValue" 
                v-bind="rangeOptions"
                :enable-cross="false"></vue-slider>
                <div class="rangeValueConvert">
                  <span>0</span>
                  <span>500+</span>
                </div>
              </div>
          </div> -->
          <!-- Sort By DP- -->
          <div class="filter-level-container">
            <h5>Sort By DP-</h5>
            <div class="pagintaion-level-custom sort-slot">
              <div @click="sortByDP(1);" class="pag-box cursor-pointer" :class="{ 'active': dpSort === 1 }">
                <span>Lowest lvl.</span>
              </div>
              <div @click="sortByDP(2);" class="pag-box cursor-pointer" :class="{ 'active': dpSort === 2 }">
                <span>Highest lvl.</span>
              </div>
              <div @click="sortByDP(3);" class="pag-box cursor-pointer" :class="{ 'active': dpSort === 3 }">
                <span>Lowest$</span>
              </div>
              <div @click="sortByDP(4);" class="pag-box cursor-pointer" :class="{ 'active': dpSort === 4 }">
                <span>Highest$</span>
              </div>
            </div>
          </div>
          <!-- Show Only My Dancer -->
          <div class="checkbox-container">
            <span class="custom-checkbox">Show only my coach</span>
            <input type="checkbox" id="checkbox3" name="energyDrink" v-model="showOnlyMyCard" class="cursor-pointer">
            <label for="checkbox3" class="cursor-pointer"></label>
          </div>
        </div>
        <!-- Dancer Card -->
        <div class="dancer-card-wrapper">
          <div class="dancer-card-container">
            <div v-for="(coach, index) in coachDataCard" :key="index" v-show="
            ((showOnlyMyCard === true && coach.own === walletAddress) || (showOnlyMyCard === false)) &&
            ((levelChoose == 'all') ||
            (levelChoose === 1 && coach.capacity === 1) ||
            (levelChoose === 2 && coach.capacity === 2) ||
            (levelChoose === 3 && coach.capacity === 3) ||
            (levelChoose === 4 && coach.capacity === 4) ||
            (levelChoose === 5 && coach.capacity === 5) )
            " class="dancer-card-box">
              <div class="dancer-card-box-inner">
                <img class="card-character" v-if="coach.name === 'Mia'" :src="require(`./../../assets/images/card/Coach/LV1-Mia.png`)">
                <img class="card-character" v-if="coach.name === 'Nalan'" :src="require(`./../../assets/images/card/Coach/LV2-Nalan.png`)">
                <img class="card-character" v-if="coach.name === 'Torrian'" :src="require(`./../../assets/images/card/Coach/LV3-Torrian.png`)">
                <img class="card-character" v-if="coach.name === 'Samuel'" :src="require(`./../../assets/images/card/Coach/LV4-Samuel.png`)">
                <img class="card-character" v-if="coach.name === 'Jarvis'" :src="require(`./../../assets/images/card/Coach/LV5-Jarvis.png`)">
                <div class="corner-left-top">
                  <h5 class="cardName-style">{{ coach.name }}</h5>
                  <h6></h6>
                </div>
                <div class="corner-right-top">
                  <img class="star-rate" src="./../../assets/images/icon/coach-capacity.png">
                  <span>{{ coach.capacity }}</span>
                </div>
                <div class="corner-left-bottom">
                  <h6>#{{ coach.tokenID }}</h6>
                </div>
                <div class="corner-right-bottom cursor-pointer tooltip-custom" v-if="coach.own === walletAddress" @click="cancelSelling(coach.tokenID)">
                  <img src="./../../assets/images/icon/delete.png">
                  <span class="tooltiptext-custom">Cancel Sell</span>
                </div>
                <!-- <h4>{{ coach.dp }} DP</h4> -->
              </div>
              <div class="outter-box">
                <div v-if="coach.own !== walletAddress" class="market-button cursor-pointer" @click="buyItem(coach.tokenID, coach.price)">
                  {{ coach.price / 1000000000000000000  }} $MDC
                </div>
                <div v-if="coach.own === walletAddress" class="market-button-own cardName-style">
                  {{ coach.price / 1000000000000000000 }} $MDC
                  <span class="cursor-pointer tooltip-custom" @click="updatePrice(coach.tokenID)">
                    <img src="./../../assets/images/icon/exchange.png">
                    <span class="tooltiptext-custom">Update Price</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalLoadingBuyCoach ref="ModalLoadingBuyCoach"/>
    <ModalLoadingCancelCoach ref="ModalLoadingCancelCoach"/>

    <ModalHireDancer ref="modalHireDancer"/>
    <ModalUpdatePrice ref="modalUpdatePrice" @refresh="refresh"/>
  </div>
</template>

<script>
import Web3 from 'web3';
import Header from './../../components/Header.vue'
import Sidebar from './../../components/Sidebar.vue'
import 'vue-slider-component/theme/default.css'
import ModalLoadingBuyCoach from './../../components/Modal/Loading/ModalLoadingBuyCoach.vue'
import ModalLoadingCancelCoach from './../../components/Modal/Loading/ModalLoadingCancelCoach.vue'
import ModalHireDancer from './../../components/Modal/ModalHireDancer.vue'
import ModalUpdatePrice from './../../components/Modal/ModalUpdatePrice.vue'

  
export default {
  name: 'CoachMarket',
  props: {
  },
  components: {
    Header,
    Sidebar,
    ModalHireDancer,
    ModalUpdatePrice,
    ModalLoadingBuyCoach,
    ModalLoadingCancelCoach
  },
  inject: {
    MarketPlace: {
      from: 'MarketPlace'
    }
  },
  data() {
    return {
      walletAddress: '',

      currentDancers: 0,
      totalDancePower: 1293,
      showOnlyMyCard: false,
      coachDataCard: [],
      levelChoose: 'all',
      dpSort: 1
    }
  },

  mounted() {
    this.marketplaceCoaches();
    this.$refs.sideBarMobileToggle.activeClass('mcoach');

    if (this.$route.query.show == 'true') {
      this.showOnlyMyCard = true;
    }
  },
  methods: {
    toggleBurgerMenu() {
      this.$refs.sideBarMobileToggle.toggleBurgerMenu();
    },

    hireDancerModal() {
      this.$refs.modalHireDancer.showDancerModal();
    },

    async filterByLevel(level) {
      this.levelChoose = level;
    },

    async refresh() {
      this.dpSort= 1;
      this.marketplaceCoaches();
      this.$refs.headerBar.collectReward();
    },

    async sortByDP(sort){
      this.dpSort = sort;
      if(sort === 1) {
        this.coachDataCard.sort(function(a, b) {
          return a.capacity - b.capacity;
        });
      }
      if(sort === 2) {
        this.coachDataCard.sort(function(a, b) {
          return b.capacity - a.capacity;
        });
      }
      if(sort === 3) {
        this.coachDataCard.sort(function(a, b) {
          return a.price - b.price;
        });
      }
      if(sort === 4) {
        this.coachDataCard.sort(function(a, b) {
          return b.price - a.price;
        });
      }
    },

    // Display Smart Contract Dancer Character
    async marketplaceCoaches() {

      this.coachDataCard = [];
      var renderWaitList = [];
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });

      var coachData = await this.MarketPlace().marketplaceCoach();
      for (let i = 0; i < coachData['0'].length; i++ ) {
        renderWaitList.push(
          { 
            tokenID: coachData['0'][i],
            name: coachData['1'][i],
            capacity: parseInt(coachData['2'][i]),
            check: false,
            own: await this.getMarketItemAddress(1, coachData['0'][i]),
            price: await this.getMarketItemPrice(1, coachData['0'][i])
          },
        );

      }
      this.coachDataCard = renderWaitList;
      // console.log(this.coachDataCard);
      // this.currentDancers = this.dancerCardData.length;
    },

    async getMarketItemPrice(itemType, tokenID) {
      var item = await this.MarketPlace().getMarketItemPrice(itemType, tokenID);
      // console.log(item);
      return item;
    },
    

    async getMarketItemAddress(itemType, tokenID) {
      var itemAddress = await this.MarketPlace().getMarketItemAddress(itemType, tokenID);
      return itemAddress;
    },

    async buyItem(tokenID, price) {
      this.$refs.ModalLoadingBuyCoach.showModal();
      var res = await this.MarketPlace().buyToken( this.walletAddress , 'coach' , tokenID, price);
      if ( res === true) {
        this.refresh();
      }
      this.$refs.ModalLoadingBuyCoach.hideModal();
    },


    async updatePrice(tokenID) {
      this.$refs.modalUpdatePrice.showModal( 'coach',tokenID);
    },

    async cancelSelling(tokenID) {
      this.$refs.ModalLoadingCancelCoach.showModal('approving');
      var res = await this.MarketPlace().cancelSelling( this.walletAddress ,1, tokenID);
      if ( res === true) {
        this.refresh();
      }
      this.$refs.ModalLoadingCancelCoach.hideModal();
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input[type=checkbox] + label {
    display: block;
    margin: 15px;
  }

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
    padding: 10px 0;
    background: rgba(50,47,208, .4);
    width: 33%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .dancer-data-box img {
    display: block;
    margin: 10px auto;
  }

  .dancer-data-box h5 {
    margin: 0;
    color: #59D8FD;
  }

  .dancer-data-box .titleDancer {
    height: 1.5vw;
    max-height: 40px;
  }

  .dancer-data-box .btnDancer {
    height: 3vw;
    max-height: 60px;
  }

  .choose-level-wrapper {
    display: flex;
    margin: 0 auto 0 0;
    align-items: flex-start;
  }

  .filter-level-container {
    margin: 35px 10px;
    display: inline-block;
  }

  .filter-level-container h5 {
color: #ffffff;
    text-align: left;
    font-size: .6em;
    margin-top: 15px;
  }

  .pagintaion-level-custom {
    display: flex;
  }

  .pagintaion-level-custom div{
    margin: 0 1.5px;
  }

  .range-slider-container {
    margin: 35px 10px;
    display: inline-block;
    width: 100%;
    max-width: 250px;
  }

  .range-slider-container h5{
    color: #ffffff;
    text-align: left;
    font-size: .6em;
    margin-top: 15px;
  }

  .checkbox-container {
    margin: 35px 10px;
    display: inline-block;
  }


  .rangeValueConvert {
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    font-size: .6em;
  }

  .dancer-card-box-inner {
    height: 80%;
    position: relative;
    background-color: rgba(14,8,38, .5);
    border-radius: 15px;
    display: flex
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
    display: inline-block;
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
    max-height: 250px;
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

  .corner-right-top span{
    margin-right: 10px;
    font-size: 1em;
    color: #fff
  }

  .corner-right-top img{
    margin-right: 10px;
    min-width: 5px;
    max-width: 20px;

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
    left: 6.6%;
    bottom: 9.5%;
    display: flex;
    flex-direction: column;
  }

  .corner-left-bottom h6 {
    font-size: .5em;
    color: #ffffff;
  }

  .corner-left-bottom img{
    margin: 5px 0;
  }

  .corner-right-bottom {
    position: absolute;
    right: 7.5%;
    bottom: 9.5%;
  }

  .corner-right-bottom img{
    width: 25px;
  }

  .pagintaion-level-custom img {
    max-height: 35px;
  }

  .outter-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .market-button {
    border-radius: 25px;
    background-color: #59D8FD;
    padding: 10px 15px;
    color: #ffffff;
    margin-top: 15px;
    text-shadow: 2px 2px #000;
  }

  .market-button-own {
    padding: 10px 15px;
    margin-top: 15px;
  }

  .sort-slot .pag-box{
    font-size: 0.9em;
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
      grid-template-columns: repeat(auto-fill,minmax(50%, 1fr));
    }


    .dancer-card-box {
    }

    .range-slider-container {
      width: 90%;
      max-width: unset;
      margin: 5px auto;
    }

    .dancer-card-box h4 {
      font-size: 1em;
    }

    .choose-level-wrapper {
      display: block;
      text-align: left;
      padding: 10px;
    }

    .filter-level-container {
      margin: auto;
      display: block;
    }

    .checkbox-container {
      margin: 35px 10px;
      display: flex;
      align-items: center;
    }

    .custom-checkbox {
      order: 2;
    }

    .market-button,
    .market-button-own {
      font-size: 0.6em;
    }

    .sort-slot .pag-box {
      font-size: 0.6em;
      padding: 10px;
    }

    .sort-slot img {
      width: 100%;
    }
  }

  @media (min-width: 960px) {
    .dancer-card-box {
      min-height: 400px;
    }
  }
  
</style>
