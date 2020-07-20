<template>
  <div>
    <Navbar />
    <div id="app" class="container mt-3">
      <div class="row">
        <div class="col-md-8">
          <!-- Tampilkan jika data kosong -->
          <div v-if="data_belanja.length == 0" class="card">
            <div class="card-header bg-primary">
              <h4 class="text-white">
                <i class="fa fa-lg fa-shopping-cart"></i> Daftar Belanja
              </h4>
            </div>
            <div class="card-body text-center">
              <h4>Daftar Kosong....</h4>
            </div>
          </div>

          <ListBelanja
            v-else
            v-bind:data_belanja="data_belanja"
            v-on:hapus-belanjaan="hapusBelanjaan"
            v-on:edit-belanjaan="kirimDataEdit"
            v-on:clear-list="clearList"
          />
        </div>
        <div class="col-md justify-content-end">
          <TambahDaftarBelanja
            ref="TambahDaftarBelanja"
            v-bind:data_belanja="data_belanja"
            v-on:tambah-belanjaan="tambahBelanjaan"
            v-bind:dataEdit="dataEdit"
            v-on:edit-belanjaan="updateBelanjaan"
          />

          <Pembayaran v-bind:data_belanja="data_belanja" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import ListBelanja from "./components/ListBelanja";
import TambahDaftarBelanja from "./components/TambahDaftarBelanja.vue";
import Pembayaran from "./components/Pembayaran.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    ListBelanja,
    TambahDaftarBelanja,
    Pembayaran,
    Navbar,
    Footer
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
          nama_belanjaan: "Tomat",
          jumlah: 1,
          satuan: "kg",
          harga_satuan: 12000
        },
        {
          id: 5,
          nama_belanjaan: "Lengkuas",
          jumlah: 3,
          satuan: "kg",
          harga_satuan: 12000
        },
        {
          id: 6,
          nama_belanjaan: "Ikan Asin",
          jumlah: 3,
          satuan: "kg",
          harga_satuan: 12000
        },
        {
          id: 7,
          nama_belanjaan: "Kol",
          jumlah: 3,
          satuan: "kg",
          harga_satuan: 12000
        }
      ],
      dataEdit: [{}]
    };
  },
  methods: {
    tambahBelanjaan(newBelanjaan) {
      this.data_belanja = [...this.data_belanja, newBelanjaan];
    },
    hapusBelanjaan(item_id) {
      // console.log(item_id);
      this.data_belanja = this.data_belanja.filter(item => item.id !== item_id);
    },
    kirimDataEdit(item) {
      // Kirim data dari List ke form TambahData untuk melakukan edit
      if (this.dataEdit.length == 0) {
        this.dataEdit.push(item);
      } else if (this.dataEdit.length > 0) {
        this.dataEdit.splice(0, 1);
        this.dataEdit.push(item);
      }

      this.$refs.TambahDaftarBelanja.dataEditKeForm(item);
      this.$refs.TambahDaftarBelanja.showUpdateButton = true;
      this.$refs.TambahDaftarBelanja.showProcessButton = false;

      // console.log(this.dataEdit)
    },
    updateBelanjaan(editedData) {
      this.data_belanja.splice(editedData.id - 1, 1, editedData);
    },
    clearList() {
      this.$swal
        .fire({
          title: "Bersihkan daftar belanja?",
          text: "Daftar yang terhapus tidak bisa dikembalikan!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya",
          cancelButtonText: "Batal"
        })
        .then(result => {
          if (result.value) {
            this.data_belanja = [];
          }
          this.$swal.fire(
            "Sukses Dihapus!",
            "Daftar belanja telah dibersihkan.",
            "success"
          );
        });
    }
  }
};
</script>

<style scoped>
.card-header {
  background: rgb(52, 183, 232) !important;
}
</style>
