<template>
  <div class="modal modal-scale-transform" id="modalLoadingHireCoach" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true" style="overflow-y: hidden;">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modalBorderCustom modalBackground modal-content">
        <div class="modal-header no-border">
          <div class="modal-header-title">
          </div>
        </div>
        <div class="modal-body">
          <div class="waiting-container">
            <img src="./../../../assets/images/modal/waiting.png" alt="">
            <span class="text-custom-normal">Hiring coach</span>
          </div>
        </div>
        <div class="modal-footer no-border custom-modal-footer">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  name: 'modalLoadingHireCoach',
  data() {
    return {
      modal: null,
    }
  },
  methods: {
    showModal() {
      this.modal = new Modal(document.getElementById('modalLoadingHireCoach'), {
        keyboard: false
      })
      var modalToggle = document.getElementById('modalLoadingHireCoach')
      this.modal.show(modalToggle);
    },
    hideModal() {
      var modalToggle = document.getElementById('modalLoadingHireCoach')
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
    background-image: url('./../../../assets/images/modal/battle-bg-color.jpg')
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
