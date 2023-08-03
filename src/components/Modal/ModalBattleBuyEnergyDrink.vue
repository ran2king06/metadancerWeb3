<template>
  <div>
    <div class="modal" id="modalBuyDrink" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modalBorderCustom modalBackground modal-content">
          <div class="modal-header no-border">
            <div class="modal-header-title">
              <h3 class="h3-text-style" style="font-size: 22px;">Buy Energy Drink</h3>
              <!-- <img src="./../../assets/images/title/buy-energy-drink.png" alt=""> -->
            </div>
            <button type="button" class="clear-style float-item" data-bs-dismiss="modal">
              <img src="./../../assets/images/icon/x.png" alt="">
            </button>
          </div>
          <div class="modal-body">
            <div class="checkbox-buy-check">
              <div class="check-box">
                <input type="radio" id="checkbox3" name="energyDrink" v-model="energyDrinkChoose" value="3" class="cursor-pointer">
                <label for="checkbox3" class="cursor-pointer"></label>
                <span class="custom-checkbox"> 3 Battles ({{ usd3 }} $MDC)</span>
              </div>
              <div class="check-box">
                <input type="radio" id="checkbox7" name="energyDrink" v-model="energyDrinkChoose" value="7" class="cursor-pointer">
                <label for="checkbox7" class="cursor-pointer"></label>
                <span class="custom-checkbox"> 7 Battles ({{ usd7 }} $MDC)</span>
              </div>
              <div class="check-box">
                <input type="radio" id="checkbox15" name="energyDrink" v-model="energyDrinkChoose" value="15" class="cursor-pointer">
                <label for="checkbox15" class="cursor-pointer"></label>
                <span class="custom-checkbox"> 15 Battles ({{ usd15 }} $MDC)</span>
              </div>
            </div>
          </div>
          <div class="modal-footer no-border custom-modal-footer" >
            <button type="button" class="clear-style" @click="buyDrink(false)">
              <img src="./../../assets/images/btn/battle-unclaim.png" alt="">
            </button>
            <button type="button" class="clear-style" @click="buyDrink(true)">
              <img src="./../../assets/images/btn/battle-mdc.png" alt="">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalLoadingBuyDrink ref="ModalLoadingBuyDrink"/>
</template>
<script>
import { Modal } from 'bootstrap'
import ModalLoadingBuyDrink from './../../components/Modal/Loading/ModalLoadingBuyDrink.vue'

export default {
  name: 'ModalBuyDrink',
  props: {
  },
  inject: {
    Display: {
      from: 'Display'
    },
  },
  components: {
    ModalLoadingBuyDrink,
  },
  emits: ['buydrink-ok'],

  data() {
    return {
      walletAddress: '',
      modal: '',
      tokenID: null,
      energyDrinkChoose: 3,

      dancerNumber: 0,

      usd3: 0,
      usd7: 0,
      usd15: 0,
    }
  },
  mounted() {
  },
  methods: {
    showModal( address, tokenID, dancerNumber) {
      this.modal = new Modal(document.getElementById('modalBuyDrink'), {
        keyboard: false
      })
      this.tokenID = tokenID;
      this.walletAddress = address;
      this.dancerNumber = dancerNumber;
      var modalToggle = document.getElementById('modalBuyDrink')
      this.modal.show(modalToggle);
      // this.mdcToUsd();
      this.getSupplyCost();
    },

    hideModal() {
      var modalToggle = document.getElementById('modalBuyDrink')
      this.modal.hide(modalToggle);
    },

    // int256 tokenId= Crew token id
    // Bool: —> true (from metamask wallet)
    //      —> false (from unclaimed MDC amount)
    async buyDrink(from) {
      this.$refs.ModalLoadingBuyDrink.showModal();
      this.hideModal();

      var drink = await this.Display().buyDrink(this.walletAddress, this.tokenID, this.energyDrinkChoose, from);
      // console.log(drink);

      if ( drink === true) {
        this.$emit("buydrink-ok");
      }

      this.$refs.ModalLoadingBuyDrink.hideModal();
    },

    async mdcToUsd() {
      // console.log(this.dancerNumber);
      if (this.dancerNumber !== 0) {
        var perUsd = await this.Display().getMDCAmountFromUSD(1);
        this.usd3 = perUsd * 3 * this.dancerNumber;
        this.usd7 = perUsd * 6.3 * this.dancerNumber;
        this.usd15 = perUsd * 12 * this.dancerNumber;
      }
    },

    async getSupplyCost() {
      if (this.dancerNumber !== 0) {
        this.usd3 = await this.Display().getSupplyCost(this.dancerNumber, 3);
        this.usd7 = await this.Display().getSupplyCost(this.dancerNumber, 7);
        this.usd15 = await this.Display().getSupplyCost(this.dancerNumber, 15);
      }
    }

  }
}
</script>
<style scoped>
  .modal-dialog {
    justify-content: center;
  }

  .modalBorderCustom {
    border: 1px solid #FF50E8;
    border-radius: 15px;
    max-width: 400px;
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
</style>
