<template>
  <Header ref="headerBar" @toggle-menu="toggleBurgerMenu()"/>
  <keep-alive>
    <Sidebar ref="sideBarMobileToggle"/>
  </keep-alive>
  <div>
    <div class="coach-invi-box pc-only"></div>
    <div class="coach-container">
      <h1>Coach</h1>
      <div class="container-box">
        <div class="coach-wrapper">
          <div class="coach-data-box">
            <h3 class="h3-text-style">Hire Coaches</h3>
            <div @click="hireCoachesModal()" class="btn-style-custom cursor-pointer ex-btn">
              <div class="btnCustom-blue">
                <img src="./../../assets/images/icon/frame.png">
                Hire Quantity</div>
            </div>
          </div>
          <div class="coach-data-box">
            <h3 class="h3-text-style">Current Coaches</h3>
            <h5>{{ currentCoach }}</h5>
            <router-link :to="{ path: '/CreateCrew', query: { ref: paramsRef }}">
              <div class="btn-style-custom cursor-pointer ex-btn">
                <div class="btnCustom-blue">Create Crew</div>
              </div>
            </router-link>
          </div>

          <div class="coach-data-box">
            <h3 class="h3-text-style">Total Capacity of Coach</h3>
            <h5>{{ totalCoachCapacity }}</h5>
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
        <div class="choose-level-wrapper">
          <!-- FilterByLevel -->
          <div class="filter-level-container">
            <h5>Filter By Capacity-</h5>
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
        </div>
        <!-- Dancer Card -->
        <div class="coach-card-wrapper">
          <div class="coach-card-container">
            <div v-for="(coach, index) in coachCardData" :key="index" v-show="
            ((levelChoose == 'all') ||
            (levelChoose === 1 && coach.power === 1) ||
            (levelChoose === 2 && coach.power === 2) ||
            (levelChoose === 3 && coach.power === 3) ||
            (levelChoose === 4 && coach.power === 4) ||
            (levelChoose === 5 && coach.power === 5) )
            " class="coach-card-box cursor-pointer card-box-hover" @click="checkDancer(index);" :class="{ 'active-check': coach.check === true }">
              <img class="card-character" v-if="coach.name === 'Mia'" :src="require(`./../../assets/images/card/Coach/LV1-Mia.png`)">
              <img class="card-character" v-if="coach.name === 'Nalan'" :src="require(`./../../assets/images/card/Coach/LV2-Nalan.png`)">
              <img class="card-character" v-if="coach.name === 'Torrian'" :src="require(`./../../assets/images/card/Coach/LV3-Torrian.png`)">
              <img class="card-character" v-if="coach.name === 'Samuel'" :src="require(`./../../assets/images/card/Coach/LV4-Samuel.png`)">
              <img class="card-character" v-if="coach.name === 'Jarvis'" :src="require(`./../../assets/images/card/Coach/LV5-Jarvis.png`)">
              <div class="corner-left-top">
                <h5 class="cardName-style">{{ coach.name }}</h5>
                <h6>#{{ coach.tokenID }}</h6>
              </div>
              <div class="corner-right-top">
                <img class="star-rate" src="./../../assets/images/icon/coach-capacity.png">
                <span>{{ coach.power }}</span>
              </div>
              <div class="corner-left-bottom">
                <div class="cursor-pointer tooltip-custom" @click="dismissItem(coach.tokenID)">
                  <img class="star-rate" src="./../../assets/images/icon/character-delete.png">
                  <span class="tooltiptext-custom">Dismiss</span>
                </div>
                <!-- sellItemToMarket( coach.tokenID, 1) -->
                <div @click="listMarketModal( 'coach', coach.tokenID, index)" class="cursor-pointer tooltip-custom">
                  <img class="star-rate" src="./../../assets/images/icon/character-buy.png">
                  <span class="tooltiptext-custom">Sell</span>
                </div>
              </div>
              <div class="corner-right-bottom " v-if="coach.check === true" :class="{ 'checked': coach.check === true }">
                <img src="./../../assets/images/icon/check-v.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalHireCoaches ref="modalHireCoaches" @reveal-modal="revealStart()"/>
  <ModalListOnMarketPlace ref="modalListOnMarketPlace" @refresh="revealCoach()"/>
  <ModalLoading ref="modalLoading"/>
  <ModalReveal ref="modalReveal" @reveal-coach="revealCoach()"/>
  <ModalDismissConfirm ref="modalDismissConfirm" @refresh="revealCoach()"/>
  <ModalDismissComplete ref="modalDismissComplete" @collect-reward="collectReward()" />
</template>

<script>
import Web3 from 'web3';
import 'vue-slider-component/theme/default.css'
import ModalHireCoaches from './../../components/Modal/ModalHireCoaches.vue'
import ModalLoading from './../../components/Modal/ModalLoading.vue'
import ModalListOnMarketPlace from './../../components/Modal/ModalListOnMarketPlace.vue'
import ModalDismissConfirm from './../../components/Modal/ModalDismissConfirm.vue';
import ModalDismissComplete from './../../components/Modal/ModalDismissComplete.vue'
import ModalReveal from './../../components/Modal/ModalReveal.vue';
import Header from './../../components/Header.vue'
import Sidebar from './../../components/Sidebar.vue'
  
export default {
  name: 'CoachPage',
  props: {
  },
  components: {
    Header,
    Sidebar,
    ModalHireCoaches,
    ModalLoading,
    ModalListOnMarketPlace,
    ModalDismissComplete,
    ModalDismissConfirm,
    ModalReveal
  },
  
  inject: {
    Display: {
      from: 'Display'
    },
    MarketPlace: {
      from: 'MarketPlace'
    }
  },
  data() {
    return {
      currentCoach: 0,
      totalCoachCapacity: 0,
      levelChoose: 'all',
      coachCardData: [],
      selectAllCheck: false,
      group: [],
      paramsRef: ''
    }
  },
  mounted() {
    this.displayCoach();
    this.$refs.sideBarMobileToggle.activeClass('pcoach');
    this.paramsRef = this.$route.query.ref;
  },

  methods: {
    toggleBurgerMenu() {
      this.$refs.sideBarMobileToggle.toggleBurgerMenu();
    },

    hireCoachesModal() {
      this.$refs.modalHireCoaches.showHireModal();
    },

    listMarketModal(itemType, tokenId, index) {
      this.$refs.modalListOnMarketPlace.showModal( itemType, tokenId);
      this.coachCardData[index].check = !this.coachCardData[index].check;
    },

    revealStart() {
      this.$refs.modalReveal.showModal('coach');
    },

    collectReward() {
      this.$refs.headerBar.collectReward();
    },

    async revealCoach() {
      await this.displayCoach();
      this.levelChoose = 'all'
      this.currentCoach = this.coachCardData.length;
      this.$refs.headerBar.collectReward();
    },

    // Display Smart Contract Coach Character
    async displayCoach() {
      this.currentCoach = 0;
      this.totalCoachCapacity = 0;
      this.coachCardData = [];

      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });
      var coachData = await this.Display().displayCoach(this.walletAddress);
      for (let i = 0; i < coachData['0'].length; i++ ) {
        this.coachCardData.push(
          { 
            tokenID: coachData['0'][i],
            name: coachData['1'][i],
            power: parseInt(coachData['2'][i]),
            check: false
          },
        );
        this.totalCoachCapacity += parseInt(this.coachCardData[i].power);
      }
      this.currentCoach = this.coachCardData.length;
      this.coachCardData.reverse();
    },

    async filterByLevel(level) {
      this.levelChoose = level;
    },

    checkDancer(index) {
      if( this.coachCardData.length > 0) {
        this.coachCardData[index].check = !this.coachCardData[index].check;
        const groupCardDataDismiss = this.coachCardData.filter(v =>  v.check === true)
        this.groupCardDataDismiss = groupCardDataDismiss.map(v => v.tokenID);
      }
    },

    selectAll() {
      this.selectAllCheck = !this.selectAllCheck;
      this.groupCardDataDismiss = [];
      for (let i = 0; i < this.coachCardData.length ; i++) {
        this.coachCardData[i].check = this.selectAllCheck;

        if (this.coachCardData[i].check) {
          this.groupCardDataDismiss.push(this.coachCardData[i].tokenID);
        } else {
          this.groupCardDataDismiss = [];
        }
      }
      // console.log(this.groupCardDataDismiss);
    },

    async dismissItem(tokenID) {
      this.$refs.modalDismissConfirm.showModal('coach', tokenID);
    },

    async dismissItemGroup() {
      if ( this.groupCardDataDismiss.length > 0) {
        this.$refs.modalDismissConfirm.showModal('coachGroup', this.groupCardDataDismiss);
        // this.$refs.modalLoading.showModal();
        // var res = await this.Display().dismiss(this.walletAddress, this.groupCardDataDismiss, true);
        // // console.log(res);
        // if ( res !== false) {
        //   this.$refs.modalDismissComplete.showModal(res);
        // this.revealCoach();
        // this.collectReward();
        // }
        // this.Loading.hideModal();
      }
    },

    // Sell Item to Market
    async sellItemToMarket(tokenID, price) {
      await this.MarketPlace().sellItem(this.walletAddress, 'coach', tokenID, price);
      this.displayCoach();
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .coach-invi-box {
    min-height: 50px;
  }

  .coach-container {
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

  .coach-wrapper {
    display: flex;
  }

  .coach-card-box.active-check {
    border: 2px solid #ffffff;
  }

  .coach-data-box {
    margin: 0px 10px;
    padding: 10px 0;
    background: rgba(50,47,208, .4);
    width: 33%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .coach-data-box h5 {
    margin: 10px 0;
    color: #59D8FD;
  }

  .coach-data-box .titleDancer {
    height: 1.5vw;
    max-height: 40px;
    min-height: 15px;
  }

  .coach-data-box .btnDancer {
    height: 3vw;
    max-height: 60px;
    min-height: 30px;
  }

  .choose-level-wrapper {
    display: flex;
    margin: 0 auto 0 0;
    align-items: end;
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

  .coach-card-wrapper {
    display: flex;
  }

  .coach-card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(280px, 1fr));
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .coach-card-box {
    position: relative;
    margin: 10px;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    padding: 0px 10px;
    background-color: rgba(14,8,38, .5);
    max-height: 350px;
  }

  .crew-card-inner-box {
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
    right: 10%;
    top: 5%;
    display: flex;
  }

  .star-rate {
    margin: 0 1.5px;
  }

  .corner-right-top img{
    min-width: 5px;
    max-width: 25px;
  }

  .corner-right-top span {
    margin-left: 10px;
    color:#ffffff;
  }

  .coach-card-box h4 {
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


    .coach-wrapper {
      flex-wrap: wrap;
      justify-content: center;
    }

    .coach-card-box {
      max-height: 250px;
    }

    .coach-data-box:nth-child(1),
    .coach-data-box:nth-child(2) {
      width: 47%;
      margin: 1% 1.5%;
    }

    .coach-data-box:nth-child(3) {
      width: 100%;
      margin: 1% 1.5%;
    }

    .coach-card-container {
      grid-template-columns: repeat(auto-fill,minmax(48%, 1fr));
    }

    .range-slider-container {
      width: 90%;
      max-width: unset;
      margin: 5px auto;
    }

    .coach-card-box h4 {
      font-size: 1em;
    }
  }

</style>
