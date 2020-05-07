f(this.namaBelanjaan == '' || this.jumlah == '' || this.jumlah <= 0 || this.satuan == '' || this.hargaSatuan == ''){
          this.validasiNama = true;
          this.validasiJumlah = true;
          this.validasiSatuan = true;
          this.validasiHarga = true;
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
    },
    hargaSatuan: function(){
      if(this.hargaSatuan <= 0){
        return this.validasi = true;
      }else if(this.hargaSatuan != ''){
        return this.validasi = false;
      }
    }
