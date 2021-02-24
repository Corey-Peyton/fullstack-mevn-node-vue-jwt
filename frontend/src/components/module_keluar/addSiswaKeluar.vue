<template>
    <div id="addSiswaKeluar">
        <Navbar/>
        <Sidebar/>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
<section class="content-header">
    <div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
        <h1>Pendaftaran Siswa Keluar</h1>
        </div>
        <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><router-link :to="{name: 'dashboard'}">Home</router-link></li>
            <li class="breadcrumb-item active">Pendaftaran Siswa Keluar</li>
        </ol>
        </div>
    </div>
    </div><!-- /.container-fluid -->
</section>

<!-- Main content -->
<section class="content">
    <div class="container-fluid">
    <div class="row">
        <div class="col-12">

            <!-- general form elements -->
            <div class="card card-success">
                <div class="card-header">
                <font class="card-title" text-color="white">Add Pendaftaran Siswa Keluar</font>
                </div>
                <!-- /.card-header -->
                <!-- form start -->                
                <div class="card-body">
                    <div class="form-group">
                      <label for="id_siswakeluar">ID Siswa Keluar</label>
                      <input type="text" class="form-control col-6" id="id_siswakeluar" placeholder="Masukkan ID Siswa" v-model="id_siswakeluar">
                    </div>
                    <div class="form-group">
                      <label>Siswa</label>
                      <select class="form-control col-6" v-model="id_siswa">
                        <option value="">-- Pilih Siswa --</option>
                        <option v-for="itemSiswa in itemsSiswa" :key="itemSiswa.id_siswa" v-bind:value="itemSiswa.id_siswa">
                          {{ itemSiswa.nama_lengkap }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="tgl_keluar">Tanggal Keluar</label>
                      <input type="date" class="form-control col-6" id="tgl_keluar" placeholder="Masukkan ID Siswa" v-model="tgl_keluar">
                    </div>
                    <div class="form-group">
                      <label>Jenis Alasan</label>
                      <select class="form-control col-6" v-model="id_jenisalasan">
                        <option value="">-- Pilih Jenis Alasan --</option>
                        <option v-for="itemJenisAlasan in itemsJenisAlasan" :key="itemJenisAlasan.id_jenisalasan" v-bind:value="itemJenisAlasan.id_jenisalasan">
                          {{ itemJenisAlasan.alasan }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="alamat_lengkap">Keterangan</label>
                      <textarea id="keterangan" class="form-control col-6" cols="30" rows="3" v-model="keterangan" placeholder="Masukkan Keterangan"></textarea>
                    </div>                    

                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                    <button class="btn btn-secondary mr-3"><p><router-link tag="p" :to="{name: 'viewSiswaKeluar'}">Back</router-link></p></button>
                    <button class="btn btn-success" @click="saveSiswaKeluar">Submit</button>
                </div>
                
            </div>
            <!-- /.card -->

        </div>
        <!-- /.col -->
    </div>
    <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</section>
<!-- /.content -->

</div>
<!-- /.content-wrapper -->

        <Footer/>
    </div>
</template>

<script>
// import axios
import axios from "axios";
import Navbar from './../_layouts/Navbar.vue'
import Sidebar from './../_layouts/Sidebar.vue'
import Footer from './../_layouts/Footer.vue'

export default {
  name: 'addSiswaKeluar',
  components: {
    Navbar,
    Sidebar,
    Footer
  },
  data() {
    return {
        id_siswakeluar: "",
        id_siswa: "",
        itemsSiswa: [],
        tgl_keluar: "",
        id_jenisalasan: "",
        itemsJenisAlasan: [],
        keterangan: "",
    };
  },

  created() {
    this.viewSiswa();
    this.viewJenisAlasan();
    this.viewSiswaKeluarLastId();
  },

  methods: {
    // Get All Siswa
    async viewSiswa() {
      try {
        const response = await axios.get("http://localhost:8800/siswa/view");
        this.itemsSiswa = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    // Get All Jenis Alasan
    async viewJenisAlasan() {
      try {
        const response = await axios.get("http://localhost:8800/jenisalasan/view");
        this.itemsJenisAlasan = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },

    async viewSiswaKeluarLastId() {
      try {
        const response = await axios.get(
            `http://localhost:8800/siswakeluar/viewlast`
        );
        let id_last = response.data.values.[0].id_siswakeluar;
        let id_siswakeluarlast = Number(id_last.substring(9,12)) + 1;
        if (id_siswakeluarlast < 100 && id_siswakeluarlast > 9) {
          id_siswakeluarlast = "0" + id_siswakeluarlast;
        }
        else if (id_siswakeluarlast < 10) {
          id_siswakeluarlast = "00" + id_siswakeluarlast;
        }
        id_siswakeluarlast = id_last.substring(0,9) + id_siswakeluarlast;
        this.id_siswakeluar = id_siswakeluarlast;
      } catch (err) {
        console.log(err);
      }
    },

    // Create New Siswa Keluar
    async saveSiswaKeluar() {
      try {
        await axios.post("http://localhost:8800/siswakeluar/add", {
          id_siswakeluar: this.id_siswakeluar,
          id_siswa: this.id_siswa,
          id_jenisalasan: this.id_jenisalasan,
          tgl_keluar: this.tgl_keluar,
          keterangan: this.keterangan,
        });
        this.id_siswa = "";
        this.id_siswakeluar = "";
        this.id_jenisalasan = "";
        this.tgl_keluar = "";
        this.keterangan = "";
        this.$router.push("/siswakeluar/view");
        
      } catch (err) {
        console.log(err);
      }
    },

  },
}
</script>

<style lang="stylus" scoped>

</style>