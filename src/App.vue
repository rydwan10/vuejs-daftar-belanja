<template>
  <div id="app" class="container mt-3">
    <div class="row">
      <ListBelanja v-bind:data_belanja="data_belanja" v-on:hapus-belanjaan="hapusBelanjaan" />
      <TambahDaftarBelanja
        v-bind:data_belanja="data_belanja"
        v-on:tambah-belanjaan="tambahBelanjaan"
      />
    </div>
    <div class="row justify-content-end">
      <Pembayaran v-bind:data_belanja="data_belanja" />
    </div>
  </div>
</template>

<script>
import ListBelanja from "./components/ListBelanja";
import TambahDaftarBelanja from "./components/TambahDaftarBelanja.vue";
import Pembayaran from "./components/Pembayaran.vue";

export default {
  name: "App",
  components: {
    ListBelanja,
    TambahDaftarBelanja,
    Pembayaran
  },
  data() {
    return {
      data_belanja: [
        {
          id: 1,
          nama_belanjaan: "Tempe",
          jumlah: 3,
          satuan: "pcs",
          harga_satuan: 5000
        },
        {
          id: 2,
          nama_belanjaan: "Gula Merah",
          jumlah: 2,
          satuan: "kg",
          harga_satuan: 10000
        },
        {
          id: 3,
          nama_belanjaan: "Daging Ayam",
          jumlah: 3,
          satuan: "kg",
          harga_satuan: 12000
        },
        {
          id: 4,
          nama_belanjaan: "Daging Anjing",
          jumlah: 3,
          satuan: "kg",
          harga_satuan: 12000
        }
      ]
    };
  },
  methods: {
    tambahBelanjaan(newBelanjaan) {
      this.data_belanja = [...this.data_belanja, newBelanjaan];
    },
    hapusBelanjaan(item_id) {
      console.log(item_id);
      this.data_belanja = this.data_belanja.filter(item => item.id !== item_id);
      //console.log(this.data_belanja);
    }
  }
};
</script>

<style>
</style>
