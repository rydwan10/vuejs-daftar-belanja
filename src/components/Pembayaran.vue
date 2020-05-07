<template>
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

          <button class="btn btn-success btn-block mt-2" type="submit">Cetak Struk</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pembayaran",
  props: ["data_belanja"],
  data() {
    return {
      bayar: "",
      kembalian: ""
    };
  },
  computed: {
    totalHarga: function() {
      ``;
      let i = 0;
      this.data_belanja.forEach(item => {
        i += parseFloat(item.jumlah * item.harga_satuan);
      });
      return i;
    }
  },
  watch: {
    bayar: function() {
      if (this.bayar == "" || this.bayar == 0) {
        this.kembalian = 0;
      } else {
        this.kembalian = parseFloat(this.bayar - this.totalHarga);
      }
    }
  }
};
</script>

<style>
</style>