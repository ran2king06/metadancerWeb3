<template>
  <Header @toggle-menu="toggleBurgerMenu()"/>
  <Sidebar ref="sideBarMobileToggle"/>
  <div>
    <div class="dancer-invi-box pc-only"></div>
    <div class="dancer-container">
      <h1>Update Crew</h1>
      <div class="create-wrapper">
        <div class="container-box-left">
          <div class="choose-level-wrapper">
            <!-- FilterByLevel -->
            <div class="filter-level-container">
              <div class="back-button pc-only">
                <div @click="$router.go(-1)" class="cursor-pointer">
                  <img src="./../../assets/images/back.png">
                </div>
                <img class="back-title"  src="./../../assets/images/back-title.png">
              </div>
              <!-- Choose Dancer or Coach -->
              <div class="choose-character-custom">
                <div @click="createDancerOrCoach('coach')" class="pag-box cursor-pointer" :class="{ 'active': chooseDancerCoach === 'coach' }">
                  <span>Coach</span>
                </div>
                <div @click="createDancerOrCoach('dancer')" class="pag-box cursor-pointer" :class="{ 'active': chooseDancerCoach === 'dancer' }">
                  <span>Dancer</span>
                </div>
              </div>

              <!-- Filter By DP - Dancer-->
              <div v-if="chooseDancerCoach === 'dancer'" class="pagination-level-custom">
                <div @click="filterByLevelDancer('all');" class="pag-box cursor-pointer" :class="{ 'active': dancerLevel === 'all' }">
                  <span>All</span>
                </div>
                <div @click="filterByLevelDancer(1);" class="pag-box cursor-pointer" :class="{ 'active': dancerLevel === 1 }">
                  <span>1</span>
                </div>
                <div @click="filterByLevelDancer(2);" class="pag-box cursor-pointer" :class="{ 'active': dancerLevel === 2 }">
                  <span>2</span>
                </div>
                <div @click="filterByLevelDancer(3);" class="pag-box cursor-pointer" :class="{ 'active': dancerLevel === 3 }">
                  <span>3</span>
                </div>
                <div @click="filterByLevelDancer(4);" class="pag-box cursor-pointer" :class="{ 'active': dancerLevel === 4 }">
                  <span>4</span>
                </div>
                <div @click="filterByLevelDancer(5);" class="pag-box cursor-pointer" :class="{ 'active': dancerLevel === 5 }">
                  <span>5</span>
                </div>
              </div>

              <!-- Filter By Capacity - Coach-->
              <div v-if="chooseDancerCoach === 'coach'" class="pagination-level-custom">
                <div @click="filterByLevelCoach('all');" class="pag-box cursor-pointer" :class="{ 'active': coachLevel === 'all' }">
                  <span>All</span>
                </div>
                <div @click="filterByLevelCoach(1);" class="pag-box cursor-pointer" :class="{ 'active': coachLevel === 1 }">
                  <span>1</span>
                </div>
                <div @click="filterByLevelCoach(2);" class="pag-box cursor-pointer" :class="{ 'active': coachLevel === 2 }">
                  <span>2</span>
                </div>
                <div @click="filterByLevelCoach(3);" class="pag-box cursor-pointer" :class="{ 'active': coachLevel === 3 }">
                  <span>3</span>
                </div>
                <div @click="filterByLevelCoach(4);" class="pag-box cursor-pointer" :class="{ 'active': coachLevel === 4 }">
                  <span>4</span>
                </div>
                <div @click="filterByLevelCoach(5);" class="pag-box cursor-pointer" :class="{ 'active': coachLevel === 5 }">
                  <span>5</span>
                </div>
              </div>
            </div>
            <!-- Range Slider -->
            <div v-if="chooseDancerCoach === 'dancer'" class="range-slider-container">
              <h5>Filter By DP-</h5>
              <div class="slider-container">
                <vue-slider 
                ref="slider"
                  v-model="rangeValue" 
                  v-bind="rangeOptions"
                  :enable-cross="false"></vue-slider>
                  <div class="rangeValueConvert">
                    <span>1</span>
                    <span>200+</span>
                  </div>
                </div>
            </div>
          </div>
          <!-- Dancer Card -->
          <div v-if="chooseDancerCoach === 'dancer'" class="dancer-card-wrapper create-crew-wrapper pc-only">
            <div class="dancer-card-container">
              <div v-for="(dancer, index) in dancerCardData" :key="index" v-show="
              dancer.dp >= rangeValue[0] && (dancer.dp <= rangeValue[1] || rangeValue[1] === 200) &&
              (( dancerLevel === 'all' ) ||
              ( dancerLevel === 1 && dancer.rate === 1 ) ||
              ( dancerLevel === 2 && dancer.rate === 2 ) ||
              ( dancerLevel === 3 && dancer.rate === 3 ) ||
              ( dancerLevel === 4 && dancer.rate === 4 ) ||
              ( dancerLevel === 5 && dancer.rate === 5 )) 
              " class="dancer-card-box">
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
                  <h6>{{ dancer.name }}</h6>
                  <h6>#{{ dancer.tokenID }}</h6>
                </div>
                <div class="corner-right-top">
                  <img v-for="(key, index) in dancer.rate" :key="index" class="star-rate" src="./../../assets/images/icon/star-rate.png">
                </div>
                <div class="corner-right-bottom">
                  <div class="cursor-pointer checked" @click="addDancerCreateList(index)">
                    <img src="./../../assets/images/icon/check-o.png">
                  </div>
                </div>
                <h4>{{ dancer.dp }} DP</h4>
              </div>
            </div>
          </div>

          <!-- Coach Card -->
          <div v-if="chooseDancerCoach === 'coach'" class="dancer-card-wrapper  pc-only">
            <div class="dancer-card-container">
              <div v-for="(coach, index) in coachCardData" :key="index" v-show="
              ( coachLevel === 'all' ) ||
              ( coachLevel === coach.power )
              " class="dancer-card-box">
                <img class="card-character" v-if="coach.name === 'Mia'" :src="require(`./../../assets/images/card/Coach/LV1-Mia.png`)">
                <img class="card-character" v-if="coach.name === 'Nalan'" :src="require(`./../../assets/images/card/Coach/LV2-Nalan.png`)">
                <img class="card-character" v-if="coach.name === 'Torrian'" :src="require(`./../../assets/images/card/Coach/LV3-Torrian.png`)">
                <img class="card-character" v-if="coach.name === 'Samuel'" :src="require(`./../../assets/images/card/Coach/LV4-Samuel.png`)">
                <img class="card-character" v-if="coach.name === 'Jarvis'" :src="require(`./../../assets/images/card/Coach/LV5-Jarvis.png`)">
                <div class="corner-left-top">
                  <h6>{{ coach.name }}</h6>
                  <h6>#{{ coach.tokenID }}</h6>
                </div>
                <div class="corner-right-top">
                  <img class="capacity-rate" src="./../../assets/images/icon/coach-capacity.png">
                  <span style="color: #ffffff;">{{ coach.power }}</span>
                </div>
                <div class="corner-right-bottom">
                  <div class="cursor-pointer checked" @click="addCoachCreateList(index)">
                    <img src="./../../assets/images/icon/check-o.png">
                  </div>
                </div>
                <!-- <h4>{{ coach.dp }} DP</h4> -->
              </div>
            </div>
          </div>
        </div>

        <!-- Dancer Choose To Create -->
        <div class="container-box-right">
          <div class="input-box">
            <input type="text" v-model="crewName" maxlength="50" placeholder="Place Crew Name Here" disabled>
          </div>
          <div class="detail-box">
            <div class="details-text fee-details">Fee to update your Crew: <span><span style="color: #59D8FD;">{{ parseFloat(parseFloat(totalCreateFee) + parseFloat(totalCreateFeeDancer)).toFixed(2) }}</span> $MDC</span></div>
            <div class="details-text other-details">Dancers: 
              <span :style="[ dancerChoose.length > 0 && dancerChoose.length > dancersLimit ? { 'color' : '#d33d3d' } : {  }]" class="pc-only">
                {{ dancerChoose.length }}/ {{ this.dancersLimit }}
              </span>
              <span :style="[ dancerNumberMobile > 0 && dancerNumberMobile > dancersLimit ? { 'color' : '#d33d3d' } : {  }]" class="mobile-only">
                {{ dancerNumberMobile }}/ {{ dancersLimit }}
              </span>
            </div>
            <div class="details-text other-details">Coaches 
              <span class="pc-only">{{ coachChoose.length }}/ {{ coachesLimit }}</span>
              <span class="mobile-only">{{ coachNumberMobile }}/ {{ coachesLimit }}</span>
              <button class="create-crew-btn cursor-pointer" @click="updateCrew()">
                Update Crew ({{ dpValueTotal }} DP)
              </button>
            </div>
          </div>
          <!-- Dancer Card -->
          <div v-if="chooseDancerCoach === 'dancer' && dancerChoose.length && dancerChoose.length > 0" class="dancer-card-wrapper pc-only">
            <div class="create-dancer-card-container">
              <div v-for="(dancer, index) in dancerChoose" :key="index" v-show="dancer.youShallNotPassThis !== true" class="create-dancer-card-box">
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
                  <h6>{{ dancer.name }}</h6>
                  <h6>{{ dancer.tokenID }}</h6>
                </div>
                <div class="corner-right-top">
                  <img v-for="(key, index) in dancer.rate" :key="index" class="star-rate" src="./../../assets/images/icon/star-rate.png">
                </div>
                <div class="corner-right-bottom">
                  <div class="cursor-pointer checked" @click="removeDancerCreateList(index)" v-if="dancer.youShallNotPassThis !== true">
                    <img src="./../../assets/images/icon/check-v.png">
                  </div>
                </div>
                <h4>{{ dancer.dp }} DP</h4>
              </div>
            </div>
          </div>

          <!-- Coach Card -->
          <div v-if="chooseDancerCoach === 'coach' && coachChoose.length && coachChoose.length > 0" class="dancer-card-wrapper pc-only">
            <div class="create-dancer-card-container">
              <div v-for="(coach, index) in coachChoose" :key="index" v-show="coach.youShallNotPassThis !== true" class="create-dancer-card-box">
                <img class="card-character" v-if="coach.name === 'Mia'" :src="require(`./../../assets/images/card/Coach/LV1-Mia.png`)">
                <img class="card-character" v-if="coach.name === 'Nalan'" :src="require(`./../../assets/images/card/Coach/LV2-Nalan.png`)">
                <img class="card-character" v-if="coach.name === 'Torrian'" :src="require(`./../../assets/images/card/Coach/LV3-Torrian.png`)">
                <img class="card-character" v-if="coach.name === 'Samuel'" :src="require(`./../../assets/images/card/Coach/LV4-Samuel.png`)">
                <img class="card-character" v-if="coach.name === 'Jarvis'" :src="require(`./../../assets/images/card/Coach/LV5-Jarvis.png`)">
                <div class="corner-left-top">
                  <h6>{{ coach.name }}</h6>
                  <h6>{{ coach.tokenID }}</h6>
                </div>
                <div class="corner-right-top">
                  <img class="capacity-rate" src="./../../assets/images/icon/coach-capacity.png">
                  <span style="color: #ffffff;">{{ coach.power }}</span>
                </div>
                <div class="corner-right-bottom">
                  <div class="cursor-pointer checked" @click="removeCoachCreateList(index)" v-if="coach.youShallNotPassThis !== true">
                    <img src="./../../assets/images/icon/check-v.png">
                  </div>
                </div>
                <!-- <h4>{{ coach.dp }} DP</h4> -->
              </div>
            </div>
          </div>

          <!-- Dancer Card Mobile -->
          <div v-if="chooseDancerCoach === 'dancer' && dancerCardData.length && dancerCardData.length > 0" class="dancer-card-wrapper mobile-only">
            <div class="create-dancer-card-container">
              <div v-for="(dancer, index) in dancerCardData" :key="index" v-show="
              dancer.dp >= rangeValue[0] && (dancer.dp <= rangeValue[1] || rangeValue[1] === 200) &&
              (( dancerLevel === 'all' ) ||
              ( dancerLevel === 1 && dancer.rate === 1 ) ||
              ( dancerLevel === 2 && dancer.rate === 2 ) ||
              ( dancerLevel === 3 && dancer.rate === 3 ) ||
              ( dancerLevel === 4 && dancer.rate === 4 ) ||
              ( dancerLevel === 5 && dancer.rate === 5 )) 
              " class="create-dancer-card-box">
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
                  <h6>{{ dancer.name }}</h6>
                  <h6>#{{ dancer.tokenID }}</h6>
                </div>
                <div class="corner-right-top">
                  <img v-for="(key, index) in dancer.rate" :key="index" class="star-rate" src="./../../assets/images/icon/star.png">
                </div>
                <div class="corner-right-bottom">
                  <div class="cursor-pointer checked" @click="dancerToggleCheck(index)">
                    <img v-if="dancer.check === false" src="./../../assets/images/icon/check-o.png">
                    <img v-if="dancer.check === true" src="./../../assets/images/icon/check-v.png">
                  </div>
                </div>
                <h4>{{ dancer.dp }} DP</h4>
              </div>
            </div>
          </div>
          <!-- Coach Card Mobile -->
          <div v-if="chooseDancerCoach === 'coach' && coachCardData.length && coachCardData.length > 0" class="dancer-card-wrapper mobile-only">
            <div class="create-dancer-card-container">
              <div v-for="(coach, index) in coachCardData" :key="index" v-show="
              ( coachLevel === 'all' ) ||
              ( coachLevel === coach.power )
              " class="create-dancer-card-box">
                <img class="card-character" v-if="coach.name === 'Mia'" :src="require(`./../../assets/images/card/Coach/LV1-Mia.png`)">
                <img class="card-character" v-if="coach.name === 'Nalan'" :src="require(`./../../assets/images/card/Coach/LV2-Nalan.png`)">
                <img class="card-character" v-if="coach.name === 'Torrian'" :src="require(`./../../assets/images/card/Coach/LV3-Torrian.png`)">
                <img class="card-character" v-if="coach.name === 'Samuel'" :src="require(`./../../assets/images/card/Coach/LV4-Samuel.png`)">
                <img class="card-character" v-if="coach.name === 'Jarvis'" :src="require(`./../../assets/images/card/Coach/LV5-Jarvis.png`)">
                <div class="corner-left-top">
                  <h6>{{ coach.name }}</h6>
                  <h6>#{{ coach.tokenID }}</h6>
                </div>
                <div class="corner-right-top">
                  <img class="capacity-rate" src="./../../assets/images/icon/coach-capacity.png">
                  <span style="color: #ffffff;">{{ coach.power }}</span>
                </div>
                <div class="corner-right-bottom">
                  <div class="cursor-pointer checked" @click="coachToggleCheck(index)">
                    <img v-if="coach.check === false" src="./../../assets/images/icon/check-o.png">
                    <img v-if="coach.check === true" src="./../../assets/images/icon/check-v.png">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalLoadingUpdateCrew ref="ModalLoadingUpdateCrew"/>
  <ModalReveal ref="modalReveal" @reveal-crew="revealCrew"/>
</template>

<script>
import Web3 from 'web3';
import Header from './../../components/Header.vue'
import Sidebar from './../../components/Sidebar.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import ModalLoadingUpdateCrew from './../../components/Modal/Loading/ModalLoadingUpdateCrew.vue'
import ModalReveal from './../../components/Modal/ModalReveal.vue';

export default {
  name: 'UpdateCrew',
  props: {
  },
  components: {
    Header,
    Sidebar,
    VueSlider,
    ModalLoadingUpdateCrew,
    ModalReveal
  },

  inject: {
    Display: { from: 'Display' },
    Mint: {from: 'Mint'},
  },

  data() {
    return {
      walletAddress: '',
      crewName: '',
      totalCreateFee: 0,
      dpValueTotal: 0,
      dancerCardDataLength: 0,
      coachCardDataLength: 0,

      dancerLevel: 'all',
      coachLevel: 'all',

      dancersLimit: 0,
      coachesLimit: 10,

      levelChoose: 'all',
      chooseDancerCoach: 'coach',

      currentDancers: 0,
      totalDancePower: 1293,
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

        dancerLengthNotUpdate: 0,
        coachLengthNoUpdate: 0,
      },

      dancerCardData: [],
      coachCardData: [],

      dancerChoose: [],
      coachChoose: [],

      coachListID: [],
      dancerListID: [],

      crewInfo: null,
      crewIDUpdate: 0,

      dancerNumberMobile: 0,
      coachNumberMobile: 0,
      supplyRemaining: 0,
      totalCreateFeeDancer: 0
    }
  },

  mounted() {
    this.rangeValue = [1, 200];
    this.displayDancer();
    this.displayCoach();
    this.getCrew();
  },
  methods: {
    toggleBurgerMenu() {
      this.$refs.sideBarMobileToggle.toggleBurgerMenu();
    },

    previousPage() {
      // $router.go(-1);
    },

    filterByLevelDancer(lvl) {
      this.dancerLevel = lvl;
    },

    filterByLevelCoach(lvl) {
      this.coachLevel = lvl;
    },

    // Dancer
    addDancerCreateList(index) {
      // this.totalCreateFee += this.dancerCardData[index].fee;
      if( this.dancersLimit > this.dancerChoose.length) {
        this.dpValueTotal += this.dancerCardData[index].dp;

        this.dancerChoose.push(this.dancerCardData[index]);
        this.dancerListID.push(this.dancerCardData[index].tokenID);
        this.dancerCardData.splice(index, 1);
        this.getTrainingCost();
        this.getCostForAddingDancer();
        // console.log(this.dancerListID);
      } else {
        alert("Dancers exceed the upper limit.");
      }
    },

    removeDancerCreateList(index) {
      // this.totalCreateFee -= this.dancerChoose[index].fee;
      this.dpValueTotal -= this.dancerChoose[index].dp;
      this.dancerCardData.push(this.dancerChoose[index]); 
      this.dancerChoose.splice(index, 1);
      this.dancerListID.splice([index - this.dancerLengthNotUpdate], 1);
      this.getCostForAddingDancer();
      // console.log(this.dancerChoose);
    },

    // Coach
    addCoachCreateList(index) {
      if( this.coachesLimit > this.coachChoose.length ) {
        // this.totalCreateFee += this.coachCardData[index].fee;
        this.coachChoose.push(this.coachCardData[index]); 
        this.coachListID.push(this.coachCardData[index].tokenID);
        this.coachCardData.splice(index, 1);
        this.getTrainingCost();
        var limit = 0;
        // this.dancersLimit = this.coachListID.length * 5;
        // console.log(this.coachChoose);
        for ( let i = 0; i < this.coachChoose.length; i++){
          // console.log(this.coachChoose[i]);
          limit = limit + parseInt(this.coachChoose[i].power);
        }
        this.dancersLimit = limit;
      } else {
        alert("Coaches exceed the upper limit.");
      }
      // console.log(this.coachListID);
    },

    removeCoachCreateList(index) {
      this.coachCardData.push(this.coachChoose[index]); 
      this.coachChoose.splice(index, 1);
      this.coachListID.splice([index - this.coachLengthNoUpdate ], 1);
      this.getTrainingCost();
      var limit = 0;
      for ( let i = 0; i < this.coachChoose.length; i++){
        limit = limit + parseInt(this.coachChoose[i].power);
      }
      this.dancersLimit = limit;
      // console.log(this.coachListID);
    },

    createDancerOrCoach(c) {
      this.chooseDancerCoach = c;
      this.dancerLevel = 'all';
      this.coachLevel = 'all';
    },

    dancerToggleCheck(index) {
      if( this.dancersLimit > this.dancerNumberMobile) {
        this.dancerCardData[index].check = !this.dancerCardData[index].check;
        if( this.dancerCardData[index].check === true) {
          this.dancerListID.push(this.dancerCardData[index].tokenID);
          this.dancerNumberMobile = this.dancerNumberMobile + 1;
          this.dpValueTotal += this.dancerCardData[index].dp;
          this.getCostForAddingDancer();

        } else {
          this.dancerListID.splice(index, 1);
          this.dancerNumberMobile = this.dancerNumberMobile - 1;
          this.dpValueTotal -= this.dancerCardData[index].dp;
          this.getCostForAddingDancer();
        }
      } else if (this.dancerCardData[index].check === true) {
        this.dancerCardData[index].check = !this.dancerCardData[index].check;
        this.dancerListID.splice(index, 1);
        this.dpValueTotal -= this.dancerCardData[index].dp;
        this.dancerNumberMobile = this.dancerNumberMobile - 1;
        this.getCostForAddingDancer();

      } else {
        alert("Dancers exceed the upper limit.");
      }
      // console.log(this.dancerListID);
    },

    coachToggleCheck(index) {
      if( this.coachesLimit > this.coachNumberMobile ) {
        this.coachCardData[index].check = !this.coachCardData[index].check;
        if( this.coachCardData[index].check === true) {
          this.coachListID.push(this.coachCardData[index].tokenID);
          this.dancersLimit = this.dancersLimit + this.coachCardData[index].power;
          this.coachNumberMobile = this.coachNumberMobile + 1;
        } else {
          this.coachListID.splice(this.coachCardData[index ], 1);
          this.dancersLimit = this.dancersLimit - this.coachCardData[index].power;
          this.coachNumberMobile = this.coachNumberMobile - 1;
        }
        this.getTrainingCost();
        // this.dancersLimit = limit;
      } else if(this.coachCardData[index].check === true) {
        this.coachCardData[index].check = !this.coachCardData[index].check;
          this.coachListID.splice(this.coachCardData[index ], 1);
          this.dancersLimit = this.dancersLimit - this.coachCardData[index].power;
          this.coachNumberMobile = this.coachNumberMobile - 1;
          this.getTrainingCost();
      } else {
        alert("Coaches exceed the upper limit.");
      }
      // console.log(this.coachListID);
    },

    // Display Smart Contract Dancer Character
    async displayDancer() {
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });

      var dancerData = await this.Display().displayDancer(this.walletAddress);
      for (let i = 0; i < dancerData['0'].length; i++ ) {
        this.dancerCardData.push(
          { 
            tokenID: dancerData['0'][i],
            name: dancerData['1'][i],
            rate: parseInt(dancerData['2'][i]),
            dp: parseInt(dancerData['3'][i]),
            fee: 0,
            check: false
          },
        );
        this.dancerCardDataLength = this.dancerCardData.length;
        this.totalDancePower += parseInt(this.dancerCardData[i].dp);
      }
      this.currentDancers = this.dancerCardData.length;
    },

    // Display Smart Contract Coach Character
    async displayCoach() {
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
            fee: 0,
            check: false
          },
        );
      }
      this.coachCardDataLength = this.coachCardData.length;
    },

    // Update Crew
    async updateCrew() {
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });
      if(this.dancerChoose.length <= this.dancersLimit && this.dancerNumberMobile <= this.dancersLimit) {
        this.$refs.ModalLoadingUpdateCrew.showModal();
        const result = await this.Mint().updateCrew(this.walletAddress, this.crewIDUpdate , this.coachListID, this.dancerListID);
        // console.log(result);
        if (result === true) {
          this.$refs.modalReveal.showModal('crew');
        }
        // this.Mint().mintCrew(this.walletAddress, this.coachListID, this.dancerListID);
        this.$refs.ModalLoadingUpdateCrew.hideModal();
      } else {
        alert("Dancers too much.");
      }
    },

    async getTrainingCost(){
      const web3 = new Web3(window.ethereum);
      // console.log(this.coachListID);
      const res = await this.Display().getTrainingCost(this.walletAddress, this.coachListID.length);

      this.totalCreateFee = parseFloat(web3.utils.fromWei(res, 'ether')).toFixed(2);
      // console.log(this.totalCreateFee);
    },

    async getCostForAddingDancer(){
      const web3 = new Web3(window.ethereum);
      const res = await this.Display().getCostForAddingDancer(this.dancerListID.length, this.supplyRemaining);
      // console.log(parseFloat(web3.utils.fromWei(res, 'ether')).toFixed(2));

      this.totalCreateFeeDancer = parseFloat(web3.utils.fromWei(res, 'ether')).toFixed(2);
      // console.log(this.totalCreateFeeDancer);
    },


    // Reveal Click
    revealCrew() {
      this.$router.push('/PlayCrew');
    },

    async getCrew() {
      this.crewInfo = await this.Display().getCrew(this.$route.query.crewid);
      this.crewIDUpdate = this.$route.query.crewid;
      var object = {
        name: this.crewInfo['0'],
        tokenID: this.$route.query.crewid,
        coachID: this.crewInfo['1'],
        dancerID: this.crewInfo['2'],
        supply: this.crewInfo['3'],
        power: this.crewInfo['4'],
      }
      // console.log(object);
      this.crewName = this.crewInfo['0'];
      this.supplyRemaining = this.crewInfo['3'];
      this.dpValueTotal = parseInt(this.crewInfo['4'].slice(0, this.crewInfo['4'].length - 2));
      // console.log(this.dpValueTotal);

      this.coachLengthNoUpdate = object.coachID.length;
      this.dancerLengthNotUpdate = object.dancerID.length;

      for ( let d = 0 ; d < object.dancerID.length; d++) {
        this.dancerChoose.push(await this.getDancerByTokenID(object.dancerID[d]));
        // this.dpValueTotal += parseInt(this.dancerChoose[d].dp);
      }
      for ( let c = 0 ; c < object.coachID.length; c++) {
        this.coachChoose.push(await this.getCoachByTokenID(object.coachID[c]));
        this.dancersLimit = this.dancersLimit + parseInt(this.coachChoose[c].power);
      }
      this.dancerNumberMobile = this.dancerChoose.length;
      this.coachNumberMobile = this.coachChoose.length;
    },

    async dancerTotal() {
      var dancer = await this.Display().displayDancer(this.walletAddress);
      this.availableDancers = dancer[0].length;
    },

    // Available Coaches:
    async coachTotal() {
      var coach = await this.Display().displayCoach(this.walletAddress);
      this.availableCoaches = coach[0].length;
    },

    // Get Dancers
    async getDancerByTokenID(id) {
      var item = await this.Display().getDancers(id);
      var dancers = {
        name: item[0],
        tokenID: id,
        dp: item[2],
        youShallNotPassThis: true
      } 
      return dancers;
    },

    // Get Coach
    async getCoachByTokenID(id) {
      var item = await this.Display().getCoaches(id);
      var coaches = {
        name: item[0],
        tokenID: id,
        power: item[2],
        fee: 0,
        check: true,
        youShallNotPassThis: true
      } 
      // console.log(coaches);
      return coaches;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .create-wrapper {
    display: flex;
    width: 100%;
  }

  .container-box-left {
    width: 55%;
    display: inline-block;
  }

  .container-box-right {
    width: 45%;
    display: inline-block;
    background: rgba(50, 47, 208, .5);
    min-height: 400px;
    border-radius: 15px;
  }

  .input-box {
    margin-top: 30px;
  }

  .detail-box {
    margin: 15px;
  }

  .details-text {
    color: #ffffff;
    text-align: left;
    margin: 10px 0;
    display: flex;
    position: relative;
  }

  .create-crew-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0 0 0 auto;
    border-radius: 35px;
    background: #59D8FD;
    padding: 10px 20px;
    color: #ffffff;
    font-size: 0.5em;
    text-shadow: 2px 2px 0px #2c0f3b, 0 0 0em #040404, 0 0 0.2em black;
  }

  .other-details span{
    margin-left: 15px;
    color: #59D8FD;
  }

  .fee-details {
    display: flex;
    justify-content: space-between;
  }

  input[type="text"] {
    background: none;
    border: none;
    border-bottom: 2px solid #ffffff;
    outline: none;
    box-shadow: none;
    text-align: center;
    color: #ffffff;
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

  .pagination-level-custom {
    display: flex;
    margin-top: 35px;
  }

  .pagination-level-custom div{
    margin: 0 1.5px;
  }

  .choose-character-custom {
    display: flex;
    margin-top: 50px;
  }

  .slider-container {
    padding: 0 5px;
  }

  .range-slider-container {
    width: 100%;
    max-width: 250px;
    margin: 35px 10px 35px 15px;
  }

  .range-slider-container h5{
    color: #ffffff;
    text-align: left;
    font-size: .6em;
    margin-top: 15px;
  }

  .rangeValueConvert {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    color: #ffffff;
  }

  .dancer-card-wrapper {
    display: flex;
    justify-content: center;
  }

  .dancer-card-container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px 0px;
    width: 100%;
    max-width: 1200px;
  }

  .create-dancer-card-container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    width: 100%;
    margin: 35px 0 15px 0;
    max-width: 1200px;
  }

  .dancer-card-box {
    position: relative;
    width: 22.5%;
    margin: 0px 5px;
    max-width: 230px;
    height: 12.5vw;
    max-height: 450px;
    border-radius: 15px;
    display: flex;
    overflow: hidden;
    background-color: rgba(14,8,38, .5);
  }

  .create-dancer-card-box {
    position: relative;
    flex-basis: calc(100%/3 - 5px);
    margin: 2.5px;
    height: 12.5vw;
    max-height: 450px;
    border-radius: 15px;
    display: flex;
    overflow: hidden;
    background-color: rgba(14,8,38, .5);
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
  }

  .corner-right-top .capacity-rate {
    margin-right: 10px;
  }

  .star-rate {
    margin: 0 1.5px;
  }

  .corner-right-top img{
    min-width: 5px;
    max-width: 15px;
  }

  .dancer-card-box h4 {
    color: #ffffff;
    font-size: 10px;
    text-align: center;
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 2.5%;
  }

  .create-dancer-card-box h4 {
    color: #ffffff;
    font-size: 10px;
    text-align: center;
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 2.5%;

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
    width: 15px;
  }

  .corner-right-bottom {
    position: absolute;
    right: 5%;
    bottom: 5.5%;
  }

  .back-button {
    display: flex;
    align-items: center;
  }

  .back-title {
    margin-left: 35px;
  }

  @media (max-width: 960px) {
    .choose-level-wrapper {
      display: block;
    }

    .filter-level-container img {
      width: 100%;
    }
    
    .choose-character-custom {
      margin: 0;
    }

    .card-character {
      height: auto;
      width: 80%;
      margin: 25px auto;
    }

    .range-slider-container {
      width: 95%;
      max-width: unset;
      margin: 0 auto;
    }

    .filter-level-container {
      display: block;
      margin: 0;
    }

    .pagination-level-custom {
    }

    .create-wrapper {
      display: block;
    }

    .container-box-left {
      width: 100%;
      display: block;
    }

    .container-box-right {
      width: 100%;
      display: block;
    }

    .create-dancer-card-box {
      position: relative;
      flex-basis: calc(100%/2 - 5px);
      margin: 2.5px;
      height: auto;
      max-height: 260px;
      border-radius: 15px;
      display: flex;
      overflow: hidden;
      background-color: rgba(14,8,38, .5);
    }

    input {
      margin-top: 15px;
    }
  }
</style>
