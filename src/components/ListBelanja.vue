<template>
  <div class="col-md-8">
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h4 class="card-title">Daftar Belanja</h4>
      </div>

      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered table-responsive">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nama Belanjaan</th>
                <th scope="col">Jumlah</th>
                <th scope="col">Satuan</th>
                <th scope="col">Harga Satuan</th>
                <th scope="col">Sub Total</th>
                <th scope="col">Aksi</th>
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
                <td>
                  <button @click="$emit('hapus-belanjaan', item.id)" class="btn btn-sm btn-danger">
                    <i class="fa fa-trash"></i>
                  </button>
                  <button class="btn btn-sm btn-success" style="margin-left: 1px;">
                    <i class="fa fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <span class="btn btn-outline-primary float-right">
          <span class="font-weight-bold">Total Harga:</span>
          {{ total | currency}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListBelanja",
  props: ["data_belanja"],
  methods: {
    subTotal: function(harga_satuan, jumlah) {
      return harga_satuan * jumlah;
    }
  },
  computed: {
    total: function() {
      let i = 0;
      this.data_belanja.forEach(item => {
        i += parseFloat(item.jumlah * item.harga_satuan);
      });
      return i;
    }
  }
};
</script>

<style>
</style>