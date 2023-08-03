<template>
  <div>
    <div class="modal" id="modalListOnMarketPlace" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modalBorderCustom modalBackground modal-content">
          <div class="modal-header no-border">
            <div class="modal-header-title">
              <h3 class="h3-text-style" style="font-size: 22px;">List On Marketplace</h3>
              <!-- <img src="./../../assets/images/title/list-marketplace.png" alt=""> -->
            </div>
            <button type="button" class="clear-style float-item" data-bs-dismiss="modal" @click="dismiss()">
              <img src="./../../assets/images/icon/x.png" alt="">
            </button>
          </div>
          <div class="modal-body">
            <div class="body-list">
              <div class="list-text-box">Price in $MDC</div>
              <input type="text" @keyup="handler(price)" v-model="price">
              <div class="list-text-box">= (<span>{{ (price * ( perMDC / 10000 )).toFixed(4) }}</span> BUSD)</div>
              <div class="list-text-box">You will be charged <span style="color: #FF8078">10%</span> marketplace tax when the item is sold.</div>
            </div>
          </div>
          <div class="modal-footer no-border custom-modal-footer">
            <div class="sell-box-style cursor-pointer" @click="sellItemToMarket()">
              <span class="custom-sell-btn">
                Sell
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalLoadingSell ref="ModalLoadingSell"/>
</template>
<script>
import Web3 from 'web3';
import { Modal } from 'bootstrap'
import ModalLoadingSell from './../../components/Modal/Loading/ModalLoadingSell.vue'

export default {
  name: 'ModalListOnMarketPlace',
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
    ModalLoadingSell,
  },
  emits: ['refresh'],
  data() {
    return {
      modal: '',
      tokenID: 0,
      walletAddress: null,
      price: null,
      itemType: '',
      perMDC: 0,
      refreshConverterTime: 30000,
      timer: null
    }
  },

  methods: {
    showModal(itemType, tokenID) {
      this.price = null;
      this.tokenID = tokenID;
      this.itemType = itemType;
      // console.log(this.tokenID);
      this.modal = new Modal(document.getElementById('modalListOnMarketPlace'), {
        keyboard: false
      })
      var modalToggle = document.getElementById('modalListOnMarketPlace')
      this.modal.show(modalToggle);

      this.getUSD();
      this.timerGetUSD();
    },

    hideModal() {
      var modalToggle = document.getElementById('modalListOnMarketPlace')
      this.modal.hide(modalToggle);
      clearInterval(this.refreshCtimeronverterTime);
    },

    timerGetUSD() {
        this.timer = setInterval(() => {
        this.getUSD();
      }, this.refreshConverterTime);
    },

    async getUSD() {
      this.perMDC = await this.Display().getUSDAmountFromMDC(10000);
      // console.log(this.perMDC);
    },

    dismiss() {
      clearInterval(this.timer);
    },

    handler(val){
      if(val==="0"){
        this.price=null;
      }
    },

    // Sell Item to Market
    async sellItemToMarket() {
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });
      // console.log(tokenID);
      // console.log(price);
      this.hideModal();
      this.$refs.ModalLoadingSell.showModal(this.itemType);

      if( this.price > 0) {
        if (this.itemType === 'dancer') {
          const result = await this.MarketPlace().sellItem(this.walletAddress, 'dancer', this.tokenID, this.price);
          if(result === true) {
            this.$router.push({ path: "/DancerMarket", query: { show: true, ref: this.$route.query.ref } });
            window.scrollTo(0,0);
          }
          this.dismiss();
          this.$refs.ModalLoadingSell.hideModal();
        }
        if (this.itemType === 'coach') {
          const result = await this.MarketPlace().sellItem(this.walletAddress, 'coach', this.tokenID, this.price);
          if(result === true) {
            this.$router.push({ path: "/CoachMarket", query: { show: true, ref: this.$route.query.ref } });
            window.scrollTo(0,0);
            // this.$emit('refresh');
          }
          this.dismiss();
          this.$refs.ModalLoadingSell.hideModal();
        }   
        if (this.itemType === 'crew') {
          const result = await this.MarketPlace().sellItem(this.walletAddress, 'crew', this.tokenID, this.price);
          if(result === true) {
            this.$router.push({ path: "/CrewMarket", query: { show: true, ref: this.$route.query.ref } });
            window.scrollTo(0,0);
            // this.$emit('refresh');
          }
          this.dismiss();
          this.$refs.ModalLoadingSell.hideModal();
        }  
      } else {
        alert("Please insert number of price.");
        this.$refs.ModalLoadingSell.hideModal();
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
</style>
