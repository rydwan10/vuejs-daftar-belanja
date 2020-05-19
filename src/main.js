import Vue from 'vue'
import App from './App.vue'
import VueCurrencyFilter from 'vue-currency-filter';

Vue.use(VueCurrencyFilter, 
{
  symbol: 'Rp.',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
