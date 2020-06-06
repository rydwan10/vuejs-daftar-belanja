import Vue from 'vue'
import App from './App.vue'
import VueCurrencyFilter from 'vue-currency-filter';
import VueHtmlToPaper from 'vue-html-to-paper';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


Vue.use(VueSweetalert2);

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=no',
    'scrollbars=no',
    
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    'bootstrap/css/bootstrap.min.css'
  ]
}

Vue.use(VueHtmlToPaper, options);

Vue.use(VueCurrencyFilter, 
{
  symbol: 'Rp.',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
