<template>
  <div class="col-md-4 pb-3">
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h4 class="card-title">Tambah Daftar Belanja</h4>
      </div>

      <div class="card-body">
        <form @submit="tambahBelanjaan">
          <div class="form-group">
            <label for="namaBelanjaan">Nama Belanjaan</label>
            <input type="text" class="form-control" v-bind:class="{'is-invalid': validasi}" name="namaBelanjaan" v-model="namaBelanjaan" />
            <small v-if="validasi" class="form-text text-danger">Nama Belanjaan tidak boleh kosong!</small>
          </div>
          <div class="form-group">
            <label for="jumlah">Jumlah</label>
            <input type="number" class="form-control" v-bind:class="{'is-invalid': validasi}" name="jumlah" v-model="jumlah" />
            <small v-if="validasi" class="form-text text-danger">Jumlah tidak boleh kosong atau kurang dari nol!</small>
          </div>
          <div class="form-group">
            <label for="satuan">Satuan</label>
            <select name="satuan" class="form-control" v-bind:class="{'is-invalid': validasi}" v-model="satuan">
              <option value='' selected disabled>Pilih Satuan</option>
              <option value="pcs">Pcs</option>
              <option value="kg">Kg</option>
              <option value="liter">Liter</option>
              <option value="renteng">Renteng</option>
              <option value="karton">Karton</option>
            </select>
            <small v-if="validasi" class="form-text text-danger">Satuan harus dipilih!</small>
          </div>
          <label for="hargaSatuan">Harga Satuan</label>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text">Rp.</div>
            </div>
            <input type="number" class="form-control" v-bind:class="{'is-invalid': validasi}" name="hargaSatuan" v-model="hargaSatuan" />
            <small v-if="validasi" class="form-text text-danger">Harga satuan harus diisi dan tidak boleh negatif!</small>
          </div>

          <button class="btn btn-success btn-block mt-4" type="submit">Proses</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TambahDaftarBelanja",
  props: ["data_belanja"],
  data() {
    return {
      namaBelanjaan: "",
      jumlah: "",
      satuan: "",
      hargaSatuan: "",

      // properti untuk melakukan validasi form
      validasi: false
    };
  },
  methods: {
    tambahBelanjaan(e) {
      e.preventDefault();
      if(this.namaBelanjaan == '' || this.jumlah == '' || this.jumlah <= 0 || this.satuan == '' || this.hargaSatuan == ''){
        return this.validasi = true;
      }else{
        const newBelanjaan = {
          id: this.data_belanja.length + 1,
          nama_belanjaan: this.namaBelanjaan,
          jumlah: this.jumlah,
          satuan: this.satuan,
          harga_satuan: this.hargaSatuan
        };
        // Kirim ke App.vue
        this.$emit("tambah-belanjaan", newBelanjaan);
        this.namaBelanjaan = "";
        this.jumlah = "";
        this.satuan = "";
        this.hargaSatuan = "";
        
        this.validasi = false;

      }
    }
  },
  computed: {
    // Validasi Form
    
  },
  watch: {
    namaBelanjaan: function(){
      if(this.namaBelanjaan != ''){
        return this.validasi = false;
      }
    },
    jumlah: function(){
      if(this.jumlah <= 0){
        return this.validasi = true;
      }else if(this.jumlah != ''){
        return this.validasi = false;
      }
    },
    hargaSatuan: function(){
      if(this.hargaSatuan <= 0){
        return this.validasi = true;
      }else if(this.hargaSatuan != ''){
        return this.validasi = false;
      }
    }
  }
}
</script>

<style>
</style>