import '@/assets/css/main.css';
import 'ant-design-vue/dist/antd.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';

import App from './App.vue';
import Battle from './plugins/web3/battle';
import Display from './plugins/web3/display';
import MarketPlace from './plugins/web3/marketplace';
import Mint from './plugins/web3/mint';
import Wallet from './plugins/web3/wallet';
import router from './router';

// import App from './App.vue';
const app = createApp(App)

app.provide('Wallet', Wallet);
app.provide('Mint', Mint);
app.provide('Display', Display);
app.provide('Battle', Battle);
app.provide('MarketPlace', MarketPlace);

app.use(router).mount('#app');
