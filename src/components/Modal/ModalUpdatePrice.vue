<template>
  <div>
    <div class="modal" id="modalListOnMarketPlace" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modalBorderCustom modalBackground modal-content">
          <div class="modal-header no-border">
            <div class="modal-header-title">
              <h3 class="h3-text-style" style="font-size: 22px;">Update Price</h3>
              <!-- <img src="./../../assets/images/title/list-marketplace.png" alt=""> -->
            </div>
            <button type="button" class="clear-style float-item" data-bs-dismiss="modal">
              <img src="./../../assets/images/icon/x.png" alt="">
            </button>
          </div>
          <div class="modal-body">
            <div class="body-list">
              <div class="list-text-box">Price in $MDC</div>
              <input type="text" @keyup="handler(price)" v-model="price">
              <div class="list-text-box">= (<span>{{ (price * ( perMDC / 10000 )).toFixed(4) }}</span> BUSD)</div>
            </div>
          </div>
          <div class="modal-footer no-border custom-modal-footer">
            <div class="sell-box-style cursor-pointer" @click="updateItemToMarket()">
              <span class="custom-sell-btn">
                Update
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalLoadingUpdatePrice ref="ModalLoadingUpdatePrice"/>
</template>
<script>
import Web3 from 'web3';
import { Modal } from 'bootstrap'
import ModalLoadingUpdatePrice from './../../components/Modal/Loading/ModalLoadingUpdatePrice.vue'

export default {
  name: 'ModalUpdatePrice',
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
    ModalLoadingUpdatePrice
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
  beforeMount() {
    clearInterval(this.timer);
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

    handler(val){
      if(val==="0"){
        this.price=null;
      }
    },

    hideModal() {
      var modalToggle = document.getElementById('modalListOnMarketPlace')
      this.modal.hide(modalToggle);
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

    // Sell Item to Market
    async updateItemToMarket() {
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });
      // console.log(tokenID);
      // console.log(price);
      this.hideModal();
      this.$refs.ModalLoadingUpdatePrice.showModal(this.itemType);

      if(this.price > 0) {
        if (this.itemType === 'dancer') {
          const result = await this.MarketPlace().updatePrice(this.walletAddress, 2, this.tokenID, this.price);
          if(result === true) {
            this.$emit('refresh');
          }
          this.dismiss();
          this.$refs.ModalLoadingUpdatePrice.hideModal();
        }
        if (this.itemType === 'coach') {
          const result = await this.MarketPlace().updatePrice(this.walletAddress, 1, this.tokenID, this.price);
          if(result === true) {
            this.$emit('refresh');
          }
          this.dismiss();
          this.$refs.ModalLoadingUpdatePrice.hideModal();
        }   
        if (this.itemType === 'crew') {
          const result = await this.MarketPlace().updatePrice(this.walletAddress, 3, this.tokenID, this.price);
          if(result === true) {
            this.$emit('refresh');
          }
          this.dismiss();
          this.$refs.ModalLoadingUpdatePrice.hideModal();
        }  
      }else {
        alert("Please insert number of price.");
        this.$refs.ModalLoadingUpdatePrice.hideModal();
      }
    },
  }
}
</script>
<style scoped>

  
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
