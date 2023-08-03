<template>
  <div>
    <div class="modal modal-scale-transform" id="modaldissmiss" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true" style="overflow-y: hidden;">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modalBorderCustom modalBackground modal-content">
          <div class="modal-header no-border">
            <div class="modal-header-title">
              <h3 class="h3-text-style">Dismiss complete</h3>
            </div>
            <button type="button" class="clear-style float-item" data-bs-dismiss="modal">
              <img src="./../../assets/images/icon/x.png" alt="">
            </button>
          </div>
          <div class="modal-body">
            <div class="waiting-container">
              <img src="./../../assets/images/dissmiss-coin.png" alt="">
              <!-- <span class="text-custom-normal">Get <span>+{{ dissmissRefund }}</span> $MDC</span> -->
            </div>
          </div>
          <div class="modal-footer no-border custom-modal-footer">
            <h5>
              Get <span style="color: #00C1F9">{{ (parseFloat(dissmissRefund) * ( perMDC / 10000 )).toFixed(2) }}</span> $USD<br>
              <span style="font-size: .7em;">≈ <span style="color: #00C1F9"> {{ (parseFloat(dissmissRefund).toFixed(2)) }}</span> $MDC</span>
            </h5>
            <div @click="ok()" class="btn-style-custom cursor-pointer custom-btn-box">
              <div class="btnCustom-blue">OK</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'bootstrap'
import { defineComponent } from "vue";

export default defineComponent({
  name: 'ModalDismiss',
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
  data() {
    return {
      modal: '',
      itemType: '',
      dissmissRefund: null,
      perMDC: null
    }
  },
  emits: ['collect-reward'],
  mounted() {
    this.showModal
    this.mdcToUsd();
  },
  methods: {
    showModal(value) {
      // this.dissmissRefund = amount
      this.dissmissRefund = value;
      // console.log(this.dissmissRefund)
      this.modal = new Modal(document.getElementById('modaldissmiss'), {
        keyboard: false
      })
      var modalToggle = document.getElementById('modaldissmiss')
      this.modal.show(modalToggle);

    },
    hideModal() {
      var modalToggle = document.getElementById('modaldissmiss')
      this.modal.hide(modalToggle);
    },

    ok() {
      this.$emit("collect-reward");
      this.hideModal();
    },

    async mdcToUsd() {
      this.perMDC = await this.Display().getUSDAmountFromMDC(10000);
      // console.log(this.perMDC);
    },

  }
})
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
    justify-content: center;
  }

  .custom-modal-footer button{
    width: 45%;
  }

  .custom-modal-footer img{
    width: 100%;
  }

  .custom-btn-box {
    width: 100%;
    margin-bottom: 25px;
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
    width: 200px;
  }

  .waiting-text {
    margin-top: 25px;
  }

  .waiting-container span {
    margin-top: 25px;
    color: #ffffff;
  }

  .modal-footer h5{
    color: #fff
  }
</style>
