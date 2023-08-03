<template>
  <div>
    <div class="modal" id="modalMassBattleConfirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modalBorderCustom modalBackground modal-content">
          <div class="modal-header no-border">
            <div class="modal-header-title">
              <h3 class="h3-text-style" style="font-size: 22px;">Mass Battle</h3>
              <!-- <img src="./../../assets/images/title/list-marketplace.png" alt=""> -->
            </div>
            <button type="button" class="clear-style float-item" data-bs-dismiss="modal">
              <img src="./../../assets/images/icon/x.png" alt="">
            </button>
          </div>
          <div class="modal-body">
            <div class="body-list">
              <div class="list-text-box">
                After confirming, all your available crews will battle at the same time. Each Crew will be matched against the best opponent according to their dancing power.
              </div>
            </div>
          </div>
          <div class="modal-footer no-border custom-modal-footer">
            <div class="sell-box-style cursor-pointer" data-bs-dismiss="modal">
              <span class="custom-sell-btn cancel-btn">
                Cancel
              </span>
            </div>
            <div class="sell-box-style cursor-pointer" @click="massBattleStart()">
              <span class="custom-sell-btn dismiss-btn">
                Confirm
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalLoading ref="modalLoading"/>
</template>
<script>
// import Web3 from 'web3';
import { Modal } from 'bootstrap'
import ModalLoading from './../../components/Modal/ModalLoading.vue'

export default {
  name: 'ModalMassBattleConfirm',
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
    ModalLoading,
  },
  emits: ['confirm-massbattle'],
  data() {
    return {
      dismissType: '',
      modal: '',
      tokenID: null,
      walletAddress: null,
      price: null,
      itemType: '',
    }
  },

  methods: {
    showModal(itemType, tokenID) {
      this.price = null;
      this.tokenID = tokenID;
      this.dismissType = itemType;
      this.modal = new Modal(document.getElementById('modalMassBattleConfirm'), {
        keyboard: false
      })
      var modalToggle = document.getElementById('modalMassBattleConfirm')
      this.modal.show(modalToggle);

    },

    hideModal() {
      var modalToggle = document.getElementById('modalMassBattleConfirm')
      this.modal.hide(modalToggle);
    },

    massBattleStart() {
      this.hideModal();
      this.$emit('confirm-massbattle')
    }
  }
}
</script>
<style scoped>
  .modal {
    --bs-modal-width: 680px;
  }
  
  .modal-content {
    width: 85%;
    margin: 0 auto;
  }
  .modalBorderCustom {
    border: 1px solid #FF50E8;
    border-radius: 15px;
    padding: 15px;
  }
  .modalBackground {
    background-image: url('./../../assets/images/modal/bg-color.jpg')
  }
  .clear-style {
    background: none;
    outline: none;
    border: none;
  }

  .list-text-box {
    text-align: left;
    color: #ffffff;
    margin-bottom: 10px;
  }

  .body-list input {
    background: none;
    outline: none;
    border: navajowhite;
    border-bottom: 2px solid #ddd;
    width: 100%;
    text-align: left;
    margin-bottom: 15px;
    color: #59D8FD;
  }

  .list-text-box span {
    color: #59D8FD;
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

  .sell-box-style {
    display: flex;
    margin: 10px auto;

  }

  .sell-box-style img {
    max-height: 150px;
  }

  .body-list img {
    margin: 10px 0;
  }

  .cancel-btn {
    background: #FDA859;
  }

  .dismiss-btn {
    background: #59D8FD;
  }
</style>
