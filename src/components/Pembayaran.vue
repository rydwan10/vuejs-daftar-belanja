<template>
  <div>
    <div class="mt-3">
      <div class="card">
        <div class="card-body">
          <form>
            <label>Total Harga:</label>
            <h4>{{ totalHarga | currency }}</h4>
            <label for="bayar">Bayar</label>
            <div class="input-group mb-2 mr-sm-2">
              <div class="input-group-prepend">
                <div class="input-group-text">Rp.</div>
              </div>
              <input type="number" class="form-control" name="bayar" v-model="bayar" />
            </div>
            <label>Kembalian:</label>
            <h4 v-if="bayar < 0" style="color: red;">Input tidak boleh negatif!</h4>
            <h4 v-else-if="bayar == 0 || bayar == ''">-</h4>
            <h4 v-else-if="bayar < totalHarga" style="color: red;">Pembayaran kurang: {{kembalian | currency}}</h4>
            <h4 v-else style="color: green;">{{ kembalian | currency}}</h4>

            <button :disabled="btnLanjutkanTransaksi" @click="showModalTransaksi" data-toggle="modal" data-target="#modelId" class="btn btn-disabled btn-success btn-block mt-2" type="button">Lanjutkan Transaksi</button>
          </form>
        </div>
      </div>
    </div>

    
    <!-- Modal -->
    <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Transaksi atas nama: </h5>
            <input v-model="pelanggan" placeholder="Masukkan nama pelanggan..." type="text" autofocus class="form-control col-md-5 ml-3">
            
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">

           <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nama Belanjaan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Satuan</th>
                  <th scope="col">Harga Satuan</th>
                  <th scope="col">Sub Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data_belanja" v-bind:key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.nama_belanjaan }}</td>
                  <td>{{ item.jumlah }}</td>
                  <td>{{ item.satuan }}</td>
                  <td>{{ item.harga_satuan | currency }}</td>
                  <td>{{ subTotal(item.harga_satuan, item.jumlah) | currency}}</td>
                </tr>
              </tbody>
            </table>
  

            <!--  Detail pembayaran pada modal -->
            <div class="row d-flex justify-content-center">
              <!-- Card 1 -->
              <div class="card pull-left" style="width: 20rem;">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title"><b>Total</b></h5>
                      <h5 class="card-title"><b>Dibayar</b></h5>
                    </div>
                    <div class="col">
                      <p>{{ totalHarga | currency }}</p>
                      <p>{{ bayar | currency }}</p>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title"><b>Kembalian</b></h5>
                    </div>
                    <div class="col">
                      <p>{{ kembalian | currency }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End of Card 1 -->

              <!-- Card 2 -->
              <div class="card ml-3" style="width: 40rem; height: 180px;">
                <div class="card-body">
                  <div class="row">
                    <div class="col-3">
                      <h5 class="card-title" style="padding-bottom: 43px;"><b>Atas Nama: </b></h5>
                    </div>
                    <div class="col">
                      <h5>{{ pelanggan }}</h5>
                    </div>
                  </div>
                <hr>
                  <div class="row">
                    <div class="col">
                      <p class="card-title"><b><i>Terimakasih telah berbelanja disini :)</i></b></p>
                    </div>
                    
                  </div>
                </div>
              </div>
              <!-- End of Card 2 -->
              
            </div>
           </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="printInvoice" class="btn btn-primary">Print Invoice</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Akhir modal -->

  </div>
</template>

<script>
export default {
  name: "Pembayaran",
  props: ["data_belanja"],
  data() {
    return {
      bayar: "",
      kembalian: "",
      btnLanjutkanTransaksi: true,
      pelanggan: ""
    };
  },
  computed: {
    totalHarga: function() {
      let i = 0;
      this.data_belanja.forEach(item => {
        i += parseFloat(item.jumlah * item.harga_satuan);
      });
      return i;
    }
    
  },
  watch: {
    bayar: function() {
      if (this.bayar == "" || this.bayar == 0 || this.bayar < 0 ) {
        this.btnLanjutkanTransaksi = true;
        this.kembalian = 0;
        
      } else {
        this.btnLanjutkanTransaksi = false;
        this.kembalian = parseFloat(this.bayar - this.totalHarga);
      }
    },
    pelanggan: function(){
      
    }
  },
  methods: {
    showModalTransaksi: function(){

    },
    showInvoice: function(){
      alert('this is invoice')
    },
    subTotal: function(harga_satuan, jumlah) {
      return harga_satuan * jumlah;
    },
    printInvoice: function(e){
      e.preventDefault();
      window.print();
    }
  }
};
</script>

<style scoped>
  .modal-header {
    background: rgb(52, 183, 232) !important;
  }
 

</style>