<template>
  <div>
    <div class="modal" id="modalClaim" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modalBorderCustom modalBackground modal-content">
          <div class="modal-header no-border">
            <div class="modal-header-title">
              <h3 class="h3-text-style">Tax Notification</h3>
              <!-- <img src="./../../assets/images/title/taxNotification.png" alt=""> -->
            </div>
            <button type="button" class="clear-style float-item" data-bs-dismiss="modal">
              <img src="./../../assets/images/icon/x.png" alt="">
            </button>
          </div>
          <div class="modal-body">
            <p>You can claim <span style="color:#78D6FF;">{{ valueMDC }} $MDC</span> with {{ taxPercentage( valueMDC, afterTax ) }}% tax.</p>
            <p>If you claim now you will <span style="color:#FF8078;">pay {{ parseFloat(valueMDC - afterTax).toFixed(2) }} $MDC </span> and 
              <span style="color:#78D6FF;">receive only {{ parseFloat(afterTax).toFixed(2) }} $MDC in your wallet.</span></p>
            <p>If you can wait <span style="color:#78D6FF;">{{ taxDaysLeft }} days</span> then you will be able to claim with {{ taxMin }}% tax.</p>
            <p>Are you sure you want to claim now?</p>
          </div>
          <div class="modal-footer no-border custom-modal-footer">
            <button type="button" class="clear-style" data-bs-dismiss="modal">
              <img src="./../../assets/images/btn/cancel.png" alt="">
            </button>
            <button type="button" class="clear-style" @click="claimReward()">
              <img src="./../../assets/images/btn/claimPayTax.png" alt="">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalLoadingClaimRewards ref="ModalLoadingClaimRewards"/>
  
</template>
<script>
import Web3 from 'web3';
import { Modal } from 'bootstrap'
import ModalLoadingClaimRewards from './../../components/Modal/Loading/ModalLoadingClaimRewards.vue'

export default {
  name: 'ModalClaimTaxNotifications',
  props: {
  },
  emits: ['refresh-wallet'],
  data() {
    return {
      valueMDC: 0,
      convertValueMDC: 0,
      leftValueMDC: 0,
      walletAddress: '',
      claim: null,
      afterTax: null,
      taxDaysLeft: null,
      taxMin: 0
    }
  },
  inject: {
    Wallet: {
      from: 'Wallet'
    },
    Display: {
      from: 'Display'
    }
  },
  components: {
    ModalLoadingClaimRewards
  },
  mounted() {
  },
  methods: {
    showModal() {
      this.modal = new Modal(document.getElementById('modalClaim'), {
        keyboard: false
      })
      var modalToggle = document.getElementById('modalClaim')
      this.modal.show(modalToggle);

      this.unclaimReward();
      this.getData();
      this.getMinClaimTax();
    },
    hideModal() {
      var modalToggle = document.getElementById('modalClaim')
      this.modal.hide(modalToggle);
    },

    async getData() {
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });

      this.taxDaysLeft = await this.Display().getTaxLeftDays(this.walletAddress);
      this.afterTax = await this.Display().RewardAfterTax(this.walletAddress);
    },

    async unclaimReward() {
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
        // console.log(this.walletAddress);
      });

      this.valueMDC = await this.Wallet().getUnclaimed(this.walletAddress);
      this.valueMDC = parseFloat(this.valueMDC).toFixed(2);
      // console.log(unclaim);
      this.convertValueMDC = (parseFloat(this.valueMDC) * 0.9).toFixed(2);
      this.leftValueMDC = (parseFloat(this.valueMDC) * 0.1).toFixed(2);
    },

    async claimReward() {
      this.hideModal();
      this.$refs.ModalLoadingClaimRewards.showModal();

      if ( this.valueMDC > 0 ) {
        this.claim = await this.Wallet().claimReward(this.walletAddress);
        this.$emit('refresh-wallet');
        this.$refs.ModalLoadingClaimRewards.hideModal();
      }

      // console.log(this.claim);
    },

    async getMinClaimTax() {
      this.taxMin = await this.Display().getMinClaimTax(this.walletAddress);
    },

    taxPercentage( value, pay) {
      // console.log(value);
      // console.log(pay);
      return parseFloat(100 - (pay / value) * 100).toFixed(0);
    }
  }
}
</script>
<style scoped>
  .modalBorderCustom {
    border: 1px solid #FF50E8;
    border-radius: 15px;
  }
  .modalBackground {
    background-image: url('./../../assets/images/modal/bg-color.jpg')
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

  @media (max-width: 960px) {
    .modal-footer button{
      width: 45%;
    }

    .modal-footer button img{
      width: 100%;
    }
  }
</style>
