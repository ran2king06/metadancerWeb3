<template>
  <div>
    <div class="modal" id="hireDancerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modalBorderCustom modalBackground modal-content">
          <div class="modal-header no-border">
            <div class="modal-header-title">
              <h3 class="h3-text-style">Hire Dancers</h3>
              <!-- <img src="./../../assets/images/title/modal-hire-dancers.png" alt=""> -->
            </div>
            <button type="button" class="clear-style float-item" data-bs-dismiss="modal">
              <img src="./../../assets/images/icon/x.png" alt="">
            </button>
          </div>
          <div class="modal-body">
            <div class="moda-body-hire-coach">
              <div @click="hireDancer(1)" class="modal-quantity-btn cursor-pointer">
                1 <span>({{ usd20 }} MDC)</span>
              </div>
              <div @click="hireDancer(5)" class="modal-quantity-btn cursor-pointer">
                5 <span>({{ usd200 }} MDC)</span>
              </div>
              <p class="tips-purple-bottom">
                Please make sure to confirm the "MINT" transaction within 1 minute after validating  "REQUEST RANDOM WORDS" (on Metamask pop up windows that will appear after clicking on the amount)
              </p>
              <!-- <div @click="hireDancer(20)" class="modal-quantity-btn cursor-pointer">
                20 <span>({{ usd400 }} MDC)</span>
              </div> -->
            </div>
            
          </div>
          <div class="modal-footer no-border custom-modal-footer">
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalLoadingHireDancer ref="ModalLoadingHireDancer" />
</template>
<script>
import Web3 from 'web3';
import { Modal } from 'bootstrap'
import ModalLoadingHireDancer from './../../components/Modal/Loading/ModalLoadingHireDancer.vue'

export default {
  name: 'ModalHireDancer',
  components: {
    ModalLoadingHireDancer
  },
  inject: {
    Mint: {
      from: 'Mint'
    },
    Display: {
      from: 'Display'
    }
  },
  emits: ['reveal-modal'],
  data() {
    return {
      modal: '',
      walletAddress: null,
      usd20: 0,
      usd200: 0,
      usd400: 0,
      referralAddress: '',
      loadingT: ''
    }
  },
  mounted() {
    this.mdcToUsd();
    this.getMintPrice();
    this.referralAddress = this.$route.query.ref;
    // console.log("Referral link: " + this.referralAddress);
  },

  methods: {
    showDancerModal() {
      this.modal = new Modal(document.getElementById('hireDancerModal'), {
        keyboard: false
      })
      var modalToggle = document.getElementById('hireDancerModal')
      this.modal.show(modalToggle)
    },
    hideModal() {
      var modalToggle = document.getElementById('hireDancerModal')
      this.modal.hide(modalToggle)
    },

    async hireDancer(amount) {
      this.$refs.ModalLoadingHireDancer.showModal();

      this.hideModal();
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });

      const result = await this.Mint().mintDancer(this.walletAddress, amount, this.referralAddress);

      if( result === true) {
        this.$emit('reveal-modal');
      }

      this.$refs.ModalLoadingHireDancer.hideModal();
    },

    async mdcToUsd() {
      // this.usd20 = await this.Display().getMDCAmountFromUSD(20);
      // this.usd200 = await this.Display().getMDCAmountFromUSD(100);
      // this.usd400 = await this.Display().getMDCAmountFromUSD(400);
    },

    async getMintPrice() {
      this.usd20 = await this.Mint().getMintPrice(1);
      this.usd200 = await this.Mint().getMintPrice(5);
    }
  }
}
</script>
<style scoped>

  .modal-content {
    width: 85%;
    margin: 0 auto;
  }
  .modalBorderCustom {
    border-radius: 0px;
  }
  .modalBackground {
    background: #1B144D;
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

  p.tips-purple-bottom {
    font-size: 0.6rem;
    color: #D884FF;
    margin-top: 10px;
    text-align: center;
    padding: 0 25px;
  }

  .custom-modal-footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .moda-body-hire-coach img {
    margin: 10px 0;
  }

  .modal-quantity-btn {
    -webkit-text-fill-color: auto;
  }

  .modal-quantity-btn span {
    color: #1E7790;
  }
</style>
