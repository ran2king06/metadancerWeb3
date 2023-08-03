<template>
  <div>
    <div class="modal modal-scale-transform" id="modalReveal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true" style="overflow-y: hidden;">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modalBorderCustom modalBackground modal-content">
          <div class="modal-header no-border">
            <div class="modal-header-title">
            </div>
          </div>
          <div class="modal-body">
            <div class="waiting-container">
              <img src="./../../assets/images/modal/reveal.png" alt="">
              <span class="text-custom-normal" v-if="itemType === 'dancers' && timer !== 0">Revealing Dancer...</span>
              <span class="text-custom-normal" v-if="itemType === 'coach' && timer !== 0">Revealing Coach...</span>
              <span class="text-custom-normal" v-if="itemType === 'crew' && timer !== 0">Revealing Crew...</span>
            </div>
          </div>
          <div class="modal-footer no-border custom-modal-footer">
            <div @click="reveal()" v-if="timer === 0" class="btn-style-custom cursor-pointer custom-btn-box">
              <div class="btnCustom-blue" v-if="itemType === 'dancers'">Reveal Dancer</div>
              <div class="btnCustom-blue" v-if="itemType === 'coach'">Reveal Coach</div>
              <div class="btnCustom-blue" v-if="itemType === 'crew'">Reveal Crew</div>
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
  name: 'ModalReveal',
  props: {
  },
  data() {
    return {
      modal: '',
      itemType: '',
      interval: 0,
      timer: 1
    }
  },
  emits: ['reveal-dancers', 'reveal-coach', 'reveal-crew'],
  mounted() {
    this.showModal
  },
  methods: {
    showModal(itemType) {
      this.modal = new Modal(document.getElementById('modalReveal'), {
        keyboard: false
      })
      this.itemType = itemType;
      var modalToggle = document.getElementById('modalReveal')
      this.modal.show(modalToggle);

      this.interval = setInterval(() => {
        if (this.timer === 0) {
          clearInterval(this.interval);

        } else {
          this.timer--
        }             
      }, 5000);
    },
    hideModal() {
      var modalToggle = document.getElementById('modalReveal')
      this.modal.hide(modalToggle);
    },

    reveal() {
      if ( this.itemType === 'dancers') {
        this.$emit('reveal-dancers');
      }
      if ( this.itemType === 'coach') {
        this.$emit('reveal-coach');
      }
      if ( this.itemType === 'crew') {
        this.$emit('reveal-crew');
      }



      this.hideModal();
    }
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

  .waiting-text {
    margin-top: 25px;
  }

  .waiting-container span {
    margin-top: 25px;
    color: #ffffff;
  }
</style>
