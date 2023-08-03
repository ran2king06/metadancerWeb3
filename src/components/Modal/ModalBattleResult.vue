<template>
  <div>
    <div class="modal" id="modalBattleResult" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true" style="overflow-y: hidden;">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modalBorderCustom modalBackground modal-content">
          <div class="modal-header no-border">
            <div class="modal-header-title custom-modal-title">
              <!-- Win -->
              <h3 class="h3-text-style">
                You
                <span v-if="battleResult === true" style="color: #59d8fd; -webkit-text-fill-color: #59d8fd;"> Won </span>
                <span v-if="battleResult === false" style="color: #FF0606; -webkit-text-fill-color: #FF0606;"> Lost </span>
                the Battle</h3>
              <!-- <img v-if="battleResult === 'win'" src="./../../assets/images/modal/result/win-title.png" alt=""> -->
              <!-- Lose -->
              <!-- <h3 class="h3-text-style">Hire Dancer</h3> -->
              <!-- <img v-if="battleResult === 'lose'" src="./../../assets/images/modal/result/lose-title.png" alt=""> -->
            </div>
            <!-- <button type="button" class="clear-style float-item" data-bs-dismiss="modal">
              <img src="./../../assets/images/icon/x.png" alt="">
            </button> -->
          </div>
          <div class="modal-body">
            <div class="waiting-container">
              <!-- Win -->
              <img v-if="battleResult === true" src="./../../assets/images/modal/result/win.png" alt="">
              <!-- Lose -->
              <img v-if="battleResult === false" src="./../../assets/images/modal/result/lose.png" alt="">
            </div>
          </div>
          <div class="modal-footer no-border custom-modal-footer">
            <div class="footer-text">
              <h5 v-if="battleResult === true" >
                Earn <span>{{ (parseInt(crewValue / 10000)) }}</span> $USD<br>
                <span style="font-size: .7em;"><span class="wave-style" style="color: #fff">≈</span>{{ (parseFloat(crewValue / 10000) * perUSD).toFixed(2) }}<span style="color: #fff">$MDC</span></span>
              </h5>
              <!-- Win -->
              <div v-if="battleResult === true"  data-bs-dismiss="modal" class="btn-style-custom cursor-pointer" @click="collectReward()">
                <span class="btnCustom-blue">COLLECT</span>
              </div>
              <!-- Lose -->
              <div v-if="battleResult === false" data-bs-dismiss="modal" class="btn-style-custom cursor-pointer" @click="collectReward()">
                <span class="btnCustom-blue">OK</span>
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
  name: 'ModalBattleResult',
  props: {
  },
  inject: {
    Display: {
      from: 'Display'
    },
    Battle: {
      from: 'Battle'
    }
  },
  emits: ['collect-reward'],
  data() {
    return {
      modal: '',
      battleDetails: null,
      battleResult: null,
      crewValue: 0,
      perUSD: null,
      crewValueUSD: null
    }
  },
  mounted() {
    this.mdcToUsd();
  },
  methods: {
    showModal(battleDetails) {
      console.log(battleDetails);
      this.battleDetails = battleDetails;
      this.battleResult = battleDetails.success;
      this.crewValue = parseFloat(battleDetails.reward).toFixed(3);
      // console.log(this.crewValue);
      // console.log(parseFloat(battleDetails.reward).toFixed(3));

      this.modal = new Modal(document.getElementById('modalBattleResult'), {
        keyboard: false
      })
      var modalToggle = document.getElementById('modalBattleResult')
      this.modal.show(modalToggle);
    },

    hideModal() {
      var modalToggle = document.getElementById('modalBattleResult')
      this.modal.hide(modalToggle)
    },

    async mdcToUsd() {
      this.perUSD = await this.Display().getMDCAmountFromUSD(1);
      // console.log(this.perUSD);
    },

    collectReward() {
      this.$emit('collect-reward');
      this.hideModal();
    }
  }
}
</script>
<style scoped>
  input[type=radio] {
    display:none;
  }
  
  input[type=radio] + label {
      background: none;
      border: 2px solid #000000;
      outline: 2px solid #ffffff;
      border-radius: 5px;
      height: 20px;
      width: 20px;
      padding:0 0 0 0px;
  }
  
  input[type=radio]:checked + label {
      background:#59D8FD;
      height: 20px;
      width: 20px;
      padding:0 0 0 0px;
  }

  .custom-modal-title {
    margin: 25px 0 10px 0;
  }

  .custom-checkbox {
    margin-left: 10px;
    color: #ffffff;
  }

  .modal-dialog {
    justify-content: center;
  }

  .modalBorderCustom {
    border: 1px solid #FF50E8;
    border-radius: 15px;
    max-width: 500px;
  }
  .modalBackground {
    background-image: url('./../../assets/images/modal/battle-bg-color.jpg')
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
  }

  .modal-body p {
    text-align: left;
    color: #ffffff
  }

  .custom-modal-footer {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 15px 0;
  }

  .custom-modal-footer button{
    width: 45%;
  }

  .custom-modal-footer img{
    margin-top: 10px;
    width: 100%;
    max-width: 100px;
  }

  .checkbox-buy-check {
    width: fit-content;
    text-align: left;
    margin: 0 auto;
  }

  .check-box {
    margin: 10px 0;
  }

  .check-box input {
    margin-right: 15px;
  }

  .checkbox-buy-check label{
    color: #ffffff;
  }

  .waiting-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .waiting-container img {
    width: 100%;
    max-width: 250px;
  }

  .waiting-text {
    margin-top: 25px;
  }

  .footer-text h5 {
    color: #ffffff;
  }

  .footer-text h5 span {
    color: #59D8FD;
  }
</style>
