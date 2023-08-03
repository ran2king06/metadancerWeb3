<template>
  <div>
    <div class="modal" id="modalMassBattle" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modalBorderCustom modalBackground modal-content">
          <div class="modal-header no-border">
            <div class="modal-header-title">
              <h3 class="h3-text-style">Mass Battle Result</h3>
              <!-- <img src="./../../assets/images/title/mass-battle-result.png" alt=""> -->
            </div>
            <!-- <button type="button" class="clear-style float-item" data-bs-dismiss="modal">
              <img src="./../../assets/images/icon/x.png" alt="">
            </button> -->
          </div>
          <div class="modal-body">
            <!-- battle Card -->
            <div class="battle-card-wrapper">
              <div class="battle-card-container">
                <div v-for="(battle, index) in battleCardData" :key="index" class="battle-card-box">
                  <div class="battle-card-inner-box">
                    <div class="mass-result-box-title">
                      <!-- <h6>Battle {{ battle.battleId }}</h6> -->
                      <h6>#{{ battle.crewId }} {{ battle.name }}</h6>
                      <h6>You 
                        <span v-if="battle.success === true" class="result-win">Won</span> 
                        <span v-if="battle.success === false" class="result-lose">Lost</span> 
                        the Battle</h6>
                    </div>
                    <div class="bg-img" :style="'background-image: url('+ require(`./../../assets/images/card/Enemy/` + battleCrew(battle.battleId))"></div>
                    <img class="box-mask" src="./../../assets/images/box-mask.png" alt="">
                    <div class="corner-center-bottom">
                      <div class="center-box">
                        <h5>#{{ battle.battleId }} (Result: {{ battle.percent }})</h5>
                        <!-- {{ battle.reward }} -->
                        <h6>Earn {{ convertFixed(battle.reward / 10000) }} $USD</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer no-border custom-modal-footer">
            <div class="footer-text">
              <div data-bs-dismiss="modal" class="btn-style-custom cursor-pointer" @click="collectReward()">
                <span class="btnCustom-blue">COLLECT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'bootstrap'

export default {
  name: 'ModalMassBattle',
  props: {
  },
  inject: {
    Battle: {
      from: 'Battle'
    }
  },  
  emits: ['collect-reward'],
  data() {
    return {
      modal: '',
      walletAddress: '',
      battleCardData: [],
    }
  },
  methods: {
    showModal(battleResult) {
      // console.log(battleResult);
      
      this.modal = new Modal(document.getElementById('modalMassBattle'), {
        keyboard: false
      })
      var modalToggle = document.getElementById('modalMassBattle')
      this.modal.show(modalToggle);

      if(Array.isArray(battleResult)){
        this.battleCardData = battleResult;
      } else {
        this.battleCardData.push(battleResult);
      }
      // console.log(this.battleCardData);
    },

    hideModal() {
      var modalToggle = document.getElementById('modalMassBattle')
      this.modal.hide(modalToggle);
    },

    battleCrew(index) {
      if( index !== undefined) {
        return 'lv' + index +'.png';
      }
    },

    convertFixed(reward){
      if(reward !== undefined) {
        return parseInt(reward).toFixed(2);
      }
    },

    collectReward() {
      this.$emit('collect-reward');
      this.hideModal();
    }

  }
}
</script>
<style scoped>
  .modal-dialog {
    justify-content: center;
    max-width: inherit !important;
  }

  .modalBorderCustom {
    border: 1px solid #FF50E8;
    border-radius: 15px;
    max-width: 860px;
  }
  .modalBackground {
    background-image: url('./../../assets/images/modal/battle-bg-color.jpg');
    background-size: cover;
  }

  .clear-style {
    background: none;
    outline: none;
    border: none;
  }

  .float-item {
    position: absolute;
    right: 5%;
  }

  .no-border {
    border: none;
  }
  
  .modal-header-title {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 25px 0 10px 0;
  }

  .modal-body p {
    text-align: left;
    color: #ffffff
  }

  .custom-modal-footer {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .custom-modal-footer button{
    width: 45%;
    max-width: 150px;
  }

  .custom-modal-footer img{
    width: 100%;
  }

  .battle-card-wrapper {
    display: flex;
  }

  .battle-card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(250px, 1fr));
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .battle-card-box {
    position: relative;
    width: 100%;
    max-width: 250px;
    margin: 0 auto 25px auto;
    overflow: hidden;
    display: inline-block;
    padding: 0px 10px;
  }

  .battle-card-inner-box {
    position: relative;
    width: 100%;
    margin: 0 auto 0 auto;
    border-radius: 15px;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(0,0,0,.5);
  }

  .bg-img {
    width: 100%;
    padding-top: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  img.box-mask {
    position: absolute;
    z-index: 0;
    left: 0;
    bottom: 0;
  }

  .card-character {
    height: 80%;
    margin: auto;
  }

  .corner-center-top {
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%, 0);
    text-align: center;
    width: 100%;
  }

  .corner-center-top h5 {
    color: #ffffff;
    font-size: 1em;
    text-align: center;
    text-shadow: 0px 0px 0px #2c0f3b, 0 0 0em #040404, 0 0 0.2em black;
  }

  .corner-right-top {
    position: absolute;
    right: 5%;
    top: 5%;
    display: flex;
    color: #ffffff;
  }

  .star-rate {
    margin: 0 1.5px;
  }

  .corner-right-top img{
    width: 1.5vw;
    min-width: 5px;
    max-width: 25px;
  }

  .battle-card-box .battle-price-detail {
    color: #ffffff;
    font-size: 1.2em;
    text-align: center;
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 5%;
    margin: 0;
    font-size: .9em;
  }

  .battle-card-box .battle-price-detail span{
    color: #FF50E8;
    font-size: .8em;
    margin-top: 5px;
  }

  .corner-left-top h6 {
    color: #ffffff;
    font-size: .6em;
    text-align: left;
  }

  .corner-left-bottom {
    position: absolute;
    left: 5%;
    bottom: 5%;
    display: flex;
    flex-direction: column;
  }

  .corner-left-bottom img{
    margin: 5px 0;
  }

  .corner-right-bottom {
    position: absolute;
    right: 5%;
    bottom: 5%;
  }

  .power-rate {
    margin-right: 10px;
  }

  .battle-btn {
    max-width: 85px;
    min-width: 65px;
    width: 5vw;
  }

  .winRate {
    font-size: .5em;
    color: #ffffff;
    margin: 0;
  }

  .battle-mdc-text {
    margin-bottom: 5px;
  }

  .mass-result-box-title {
    margin: 10px 0;
  }

  .mass-result-box-title h6 {
    color: #ffffff;
    margin: 5px 0;
    font-size: 0.8rem;
  }

  .result-win {
    color: #59D8FD;
  }

  .result-lose {
    color: #CA0303;
  }

  .corner-center-bottom {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
  }

  .center-box h6 {
    font-size: .9em;
    margin: auto;
    color: #fff;
  }

  .center-box h5 {
    font-size: .5em;
    margin: 5px 0;
    color: #fff;
  }

  .footer-text h5 {
    color: #ffffff;
  }


  .battle-card-container {
    grid-template-columns: repeat(auto-fill,minmax(33.33%, 1fr));
  }

  @media (max-width: 960px) {
    .battle-card-container {
      grid-template-columns: repeat(auto-fill,minmax(50%, 1fr));
    }
  }

</style>
