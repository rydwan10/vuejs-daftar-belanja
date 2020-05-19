<template>
  <div class="">
    <div class="card">
      <div v-if="showUpdateButton" class="card-header bg-success text-white text-center">
        <h4 class="card-title">Edit Daftar Belanja</h4>
      </div>
      <div v-if="showProcessButton" class="card-header bg-primary text-white text-center">
        <h4 class="card-title">Tambah Daftar Belanja</h4>
      </div>
      <div class="card-body" v-if="toggleForm">
        <form>
          <div class="form-group">
            <label for="namaBelanjaan">Nama Belanjaan</label>
            <input type="text" class="form-control" v-bind:class="{'is-invalid': validasiNama}" name="namaBelanjaan" v-model="namaBelanjaan" />
            <small v-if="validasiNama" class="form-text text-danger">Nama Belanjaan tidak boleh kosong!</small>
          </div>
          <div class="form-group">
            <label for="jumlah">Jumlah</label>
            <input type="number" class="form-control" v-bind:class="{'is-invalid': validasiJumlah}" name="jumlah" v-model="jumlah" />
            <small v-if="validasiJumlah" class="form-text text-danger">Jumlah tidak boleh kosong atau kurang dari nol!</small>
          </div>
          <div class="form-group">
            <label for="satuan">Satuan</label>
            <select name="satuan" class="form-control" v-bind:class="{'is-invalid': validasiSatuan}" v-model="satuan">
              <option value='' selected disabled>Pilih Satuan</option>
              <option value="pcs">Pcs</option>
              <option value="kg">Kg</option>
              <option value="liter">Liter</option>
              <option value="renteng">Renteng</option>
              <option value="karton">Karton</option>
            </select>
            <small v-if="validasiSatuan" class="form-text text-danger">Satuan harus dipilih!</small>
          </div>
          <label for="hargaSatuan">Harga Satuan</label>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text">Rp.</div>
            </div>
            <input type="number" class="form-control" v-bind:class="{'is-invalid': validasiHarga}" name="hargaSatuan" v-model="hargaSatuan" />
            <small v-if="validasiHarga" class="form-text text-danger">Harga satuan harus diisi dan tidak boleh negatif!</small>
          </div>

          <button v-if="showProcessButton" @click="tambahBelanjaan" class="btn btn-success btn-block mt-4" type="button">Proses</button>
          <div v-if="showUpdateButton">
              <button @click="updateBelanjaan" class="btn btn-primary btn-block mt-4" type="button">Update</button>
              <button @click="batalEdit" class="float-right btn btn-danger btn-block">Batal</button>
          </div>
          <!-- <ul>
            
            <li v-for="data in dataEdit" v-bind:key="data.id">{{data.nama_belanjaan}}</li>
          </ul> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TambahDaftarBelanja",
  props: ["data_belanja", "dataEdit"],
  data() {
    return {
      idEdit: 0,
      namaBelanjaan: "",
      jumlah: "",
      satuan: "",
      hargaSatuan: "",

      // properti untuk melakukan validasi form
      validasi: false,

      //Validasi per form
      validasiNama: false,
      validasiJumlah: false,
      validasiSatuan: false,
      validasiHarga: false,

      // Toggle Form
      toggleForm: true,

      // Show Update button 
      showUpdateButton: false,

      // Show Process button
      showProcessButton: true
    };
  },
  methods: {
    tambahBelanjaan(e) {
      e.preventDefault();
      // Validasi form ketika kosong atau bukan angka
      this.jumlah != '' ? this.validasiJumlah = false : this.validasiJumlah = true;
      this.namaBelanjaan != '' ? this.validasiNama = false : this.validasiNama = true;
      this.satuan != '' ? this.validasiSatuan = false : this.validasiSatuan = true;
      this.hargaSatuan != '' ? this.validasiHarga = false : this.validasiHarga = true;

      if(this.namaBelanjaan != '' && this.jumlah != '' && this.jumlah > 0 && this.satuan != '' && this.hargaSatuan != ''){
        const newBelanjaan = {
          id: this.data_belanja.length + 1,
          nama_belanjaan: this.namaBelanjaan,
          jumlah: this.jumlah,
          satuan: this.satuan,
          harga_satuan: this.hargaSatuan
        }

        // Kirim ke App.vue
        this.$emit("tambah-belanjaan", newBelanjaan);
        this.namaBelanjaan = "";
        this.jumlah = "";
        this.satuan = "";
        this.hargaSatuan = "";
        
      }
    },
    dataEditKeForm: function(item){
        this.namaBelanjaan = item.nama_belanjaan;
        this.jumlah = item.jumlah;
        this.satuan = item.satuan;
        this.hargaSatuan = item.harga_satuan;
        this.idEdit = item.id;
    },
    updateBelanjaan: function(){
        const editedData = {
          id: this.idEdit,
          nama_belanjaan: this.namaBelanjaan,
          jumlah: this.jumlah,
          satuan: this.satuan,
          harga_satuan: this.hargaSatuan
        }

        // Send edited data to App.vue
        this.$emit("edit-belanjaan", editedData);
        this.namaBelanjaan = "";
        this.jumlah = "";
        this.satuan = "";
        this.hargaSatuan = "";

        this.showUpdateButton = false;
        this.showProcessButton = true;
    },
    batalEdit: function(){
        this.showUpdateButton = false;
        this.showProcessButton = true;

        // Clear Forms
        this.namaBelanjaan = "";
        this.jumlah = "";
        this.satuan = "";
        this.hargaSatuan = "";
    }
  },
  computed: {
    
  },
  watch: {
      namaBelanjaan: function(){
          if(this.namaBelanjaan != ''){
            this.validasiNama = false;
          }
      },
      jumlah: function(){
        if(this.jumlah <= 0){
          this.validasiJumlah = true;
        }else if(this.jumlah != ''){
            this.validasiJumlah = false;
        }
        // console.log('helo')
      },
      satuan: function(){
        if(this.satuan != ''){
          this.validasiSatuan = false;
        }
      },
      hargaSatuan: function(){
        if(this.hargaSatuan <= 0){
          this.validasiHarga = true;
        }else if(this.hargaSatuan != ''){
            this.validasiHarga = false;
        }
      }
  }
}
</script>

<style scoped>
  .card-header {
      background: rgb(52, 183, 232)!important;

  }
</style>