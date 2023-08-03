<template>
  <div>
    <div class="modal modal-scale-transform" id="modalSpecial" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true" style="overflow-y: hidden;">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modalBorderCustom modalBackground modal-content">
          <div class="modal-header no-border">
            <div class="modal-header-title">
            </div>
          </div>
          <div class="modal-body">
            <div class="waiting-container">
              <img src="./../../assets/images/modal/waiting.png" alt="">
              <span class="text-custom-normal" v-if="statusApprove === 'approving'">Approving...</span>

              <span class="text-custom-normal" v-if="statusApprove === 'hire-dancer'">Hiring dancer…</span>
              <span class="text-custom-normal" v-if="statusApprove === 'hire-coach'">Hiring coaches…</span>

              <span class="text-custom-normal" v-if="statusApprove === 'buy-drink'">Buying energy drinks</span>

              <span class="text-custom-normal" v-if="statusApprove === 'create-dancer'">Creating crew...</span>
              <span class="text-custom-normal" v-if="statusApprove === 'update-coach'">Updating crew...</span>

              <span class="text-custom-normal" v-if="statusApprove === 'dismiss-dancer'">Mass dismissing dancer…</span>
              <span class="text-custom-normal" v-if="statusApprove === 'dismiss-coach'">Mass dismissing coach</span>

              <span class="text-custom-normal" v-if="statusApprove === 'dismiss-group-dancer'">Mass dismissing dancer…</span>
              <span class="text-custom-normal" v-if="statusApprove === 'dismiss-group-coach'">Mass dismissing coach</span>
              
              <span class="text-custom-normal" v-if="statusApprove === 'battle'">Starting battle…</span>
              <span class="text-custom-normal" v-if="statusApprove === 'mass-battle'">Starting mass battle…</span>

              <span class="text-custom-normal" v-if="statusApprove === 'sell-dancer'">Setting  dancer price...</span>
              <span class="text-custom-normal" v-if="statusApprove === 'sell-coach'">Setting  coach price...</span>
              <span class="text-custom-normal" v-if="statusApprove === 'sell-crew'">Setting  crew price...</span>

              <span class="text-custom-normal" v-if="statusApprove === 'buy-dancer'">Buying dancer...</span>
              <span class="text-custom-normal" v-if="statusApprove === 'buy-coach'">Buying coach...</span>
              <span class="text-custom-normal" v-if="statusApprove === 'buy-crew'">Buying crew...</span>

              <span class="text-custom-normal" v-if="statusApprove === 'cancel-dancer-price'">Canceling dancer price…</span>
              <span class="text-custom-normal" v-if="statusApprove === 'cancel-coach-price'">Canceling coach price…</span>
              <span class="text-custom-normal" v-if="statusApprove === 'cancel-crew-price'">Canceling crew price…</span>

              <span class="text-custom-normal" v-if="statusApprove === 'update-dancer-price'">Updating dancer price...</span>
              <span class="text-custom-normal" v-if="statusApprove === 'update-coach-price'">Updating coach price...</span>
              <span class="text-custom-normal" v-if="statusApprove === 'update-crew-price'">Updating crew price...</span>

              <span class="text-custom-normal" v-if="statusApprove === 'claim-reward'">Claiming rewards...</span>
              <span class="text-custom-normal" v-if="statusApprove === 'claim-referral'">Claiming referral rewards...</span>

              <span class="text-custom-error" v-if="statusApprove == 'failed'">Transaction fail</span>
              <!-- <span>Loading</span> -->
            </div>
          </div>
          <div class="modal-footer no-border custom-modal-footer">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'bootstrap'

export default {
  name: 'ModalSpecial',

  data: function() {
    return {
      showLoading: false,
      statusApprove: 'approve',
      modal: null,
    }
  },
  methods: {
    showModal(getStatus) {
      this.showLoading = true;
      
      this.statusApprove = getStatus;
      this.modal = new Modal(document.getElementById('modalSpecial'), {
        keyboard: false
      })
      var modalToggle = document.getElementById('modalSpecial')
      this.modal.show(modalToggle);
      console.log(this.statusApprove);
    },
    hideModal() {
      var modalToggle = document.getElementById('modalSpecial')
      this.modal.hide(modalToggle);
    },
  }
}
</script>
<style lang="scss" scoped>
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
    justify-content: space-between;
  }

  .custom-modal-footer button{
    width: 45%;
  }

  .custom-modal-footer img{
    width: 100%;
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

  .waiting-text {
    margin-top: 25px;
  }

  .waiting-container span {
    margin-top: 25px;
    color: #ffffff;
  }
</style>
