<template>
  <div>
    <div class="modal" id="modalDismissConfirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modalBorderCustom modalBackground modal-content">
          <div class="modal-header no-border">
            <div class="modal-header-title">
              <h3 class="h3-text-style" style="font-size: 22px;" v-if="dismissType === 'dancer'">Dismiss Dancer</h3>
              <h3 class="h3-text-style" style="font-size: 22px;" v-if="dismissType === 'coach'">Dimiss Coach</h3>
              <h3 class="h3-text-style" style="font-size: 22px;" v-if="dismissType === 'dancerGroup'">Mass Dismiss Dancers</h3>
              <h3 class="h3-text-style" style="font-size: 22px;" v-if="dismissType === 'coachGroup'">Mass Dismiss Coaches</h3>
              <!-- <img src="./../../assets/images/title/list-marketplace.png" alt=""> -->
            </div>
            <button type="button" class="clear-style float-item" data-bs-dismiss="modal">
              <img src="./../../assets/images/icon/x.png" alt="">
            </button>
          </div>
          <div class="modal-body">
            <div class="body-list">
              <div class="list-text-box" v-if="dismissType === 'dancer'">
                Are you sure you want to dismiss the dancer?
                Finish dismissing one dancer it will disappear in your wallet, and get back <span>4 USD</span> (pay in MDC).
              </div>

              <div class="list-text-box" v-if="dismissType === 'coach'">
                Are you sure you want to dismiss the coach?
                Finish dismissing one coach it will disappear in your wallet, and get back <span>4 USD</span> (pay in MDC).
              </div>

              <div class="list-text-box" v-if="dismissType === 'dancerGroup'">
                Are you sure you want to dismiss the <span>{{ this.tokenID.length }}</span> dancers that you selected?
                After confirming, the coaches will disappear from your wallet, and you will get back <span>{{ 4 * this.tokenID.length }} USD</span> (pay in MDC).
              </div>

              <div class="list-text-box" v-if="dismissType === 'coachGroup'">
                Are you sure you want to dismiss the <span>{{ this.tokenID.length }}</span> coaches that you selected?
                After confirming, the coaches will disappear from your wallet, and you will get back <span>{{ 4 * this.tokenID.length }} USD</span> (pay in MDC).
              </div>
            </div>
          </div>
          <div class="modal-footer no-border custom-modal-footer">
            <div class="sell-box-style cursor-pointer" data-bs-dismiss="modal">
              <span class="custom-sell-btn cancel-btn">
                Cancel
              </span>
            </div>
            <div class="sell-box-style cursor-pointer" @click="dismissItem()">
              <span class="custom-sell-btn dismiss-btn">
                Confirm
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalLoadingDismiss ref="ModalLoadingDismiss"/>
</template>
<script>
import Web3 from 'web3';
import { Modal } from 'bootstrap'
import ModalLoadingDismiss from './../../components/Modal/Loading/ModalLoadingDismiss.vue'

export default {
  name: 'ModalDismissConfirm',
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
    ModalLoadingDismiss
  },
  emits: ['refresh'],
  data() {
    return {
      dismissType: '',
      modal: '',
      tokenID: null,
      walletAddress: null,
      price: null,
      itemType: '',
      loadingType: ''
      // perMDC: 0,
      // refreshConverterTime: 30000,
      // timer: null
    }
  },

  methods: {
    showModal(itemType, tokenID) {
      this.price = null;
      this.tokenID = tokenID;
      this.dismissType = itemType;
      // console.log(this.tokenID);
      this.modal = new Modal(document.getElementById('modalDismissConfirm'), {
        keyboard: false
      })
      var modalToggle = document.getElementById('modalDismissConfirm')
      this.modal.show(modalToggle);

      // this.getUSD();
      // this.timerGetUSD();
    },

    hideModal() {
      var modalToggle = document.getElementById('modalDismissConfirm')
      this.modal.hide(modalToggle);
      // clearInterval(this.refreshCtimeronverterTime);
    },

    // timerGetUSD() {
    //     this.timer = setInterval(() => {
    //     this.getUSD();
    //   }, this.refreshConverterTime);
    // },

    // async getUSD() {
    //   this.perMDC = await this.Display().getUSDAmountFromMDC(10000);
    //   // console.log(this.perMDC);
    // },
    // dismiss() {
    //   clearInterval(this.timer);
    // },
    // handler(val){
    //   if(val==="0"){
    //     this.price=null;
    //   }
    // },

    async dismissItem() {
      this.hideModal();
      // this.$refs.modalLoading.showModal('approve');
      // Get Wallet Address
      this.$refs.ModalLoadingDismiss.showModal(this.dismissType);

      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
        // console.log(this.walletAddress);
      });

      if(this.dismissType === 'dancer') {
        var dancerRes = await this.Display().dismiss(this.walletAddress, [this.tokenID], false);
        // console.log(dancerRes);
        if ( dancerRes !== false) {
          this.$emit('refresh');
        }
        this.$refs.ModalLoadingDismiss.hideModal();
      }

      if(this.dismissType === 'coach') {
        var resCoach = await this.Display().dismiss(this.walletAddress, [this.tokenID], true);
        // console.log(resCoach);
        if ( resCoach !== false) {
          this.$emit('refresh');
        }
        this.$refs.ModalLoadingDismiss.hideModal();
      }

      if(this.dismissType === 'dancerGroup') {
        var massDancer = await this.Display().dismiss(this.walletAddress, this.tokenID, false);
        if ( massDancer !== false) {
          this.$emit('refresh');
        }
        this.$refs.ModalLoadingDismiss.hideModal();
      }

      if(this.dismissType === 'coachGroup') {
        var massCoach = await this.Display().dismiss(this.walletAddress, this.tokenID, true);
        if ( massCoach !== false) {
          this.$emit('refresh');
        }
        this.$refs.ModalLoadingDismiss.hideModal();
      }

    },
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
