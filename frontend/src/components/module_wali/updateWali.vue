<template>
    <div id="updateWali">
        <Navbar/>
        <Sidebar/>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
<section class="content-header">
    <div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
        <h1>Wali</h1>
        </div>
        <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><router-link :to="{name: 'dashboard'}">Home</router-link></li>
            <li class="breadcrumb-item active">Wali</li>
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
            <div class="card card-primary">
                <div class="card-header">
                <font class="card-title" text-color="white">Update Data Wali</font>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                
                <div class="card-body">
                    <div class="form-group">
                        <label for="id_wali">ID Wali</label>
                        <input type="text" class="form-control col-6" id="id_wali" placeholder="Masukkan ID Wali" v-model="id_wali">
                    </div>
                    <div class="form-group">
                        <label for="nama_wali">Nama Wali</label>
                        <input type="text" class="form-control col-6" id="nama_wali" placeholder="Masukkan Nama Ibu" v-model="nama_wali">
                    </div>
                    <div class="form-group">
                      <label for="jenis_kelamin">Jenis Kelamin</label>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="jenis_kelamin" value="L" v-model="jenis_kelamin" checked>
                        <label class="form-check-label">Laki - Laki</label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="jenis_kelamin" v-model="jenis_kelamin" value="P">
                        <label class="form-check-label">Perempuan</label>
                      </div>
                    </div>
                    <div class="form-group">
                        <label for="nik">NIK (Nomor Induk Kependududkan)</label>
                        <input type="text" class="form-control col-6" id="nik" placeholder="Masukkan NIK" v-model="nik">
                    </div>
                    <div class="form-group">
                        <label for="tgl_lahir">Tanggal Lahir</label>
                        <input type="date" class="form-control col-6" id="tgl_lahir" placeholder="Masukkan Tanggal Lahir" v-model="tgl_lahir">
                    </div>
                    <div class="form-group">
                      <label>Pendidikan</label>
                      <select class="form-control col-6" v-model="id_pendidikan">
                        <option value="">-- Pilih Pendidikan --</option>
                        <option v-for="itemPendidikan in itemsPendidikan" :key="itemPendidikan.id_pendidikan" v-bind:value="itemPendidikan.id_pendidikan">
                          {{ itemPendidikan.pendidikan }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Penghasilan</label>
                      <select class="form-control col-6" v-model="id_penghasilan">
                        <option value="">-- Pilih Penghasilan --</option>
                        <option v-for="itemPenghasilan in itemsPenghasilan" :key="itemPenghasilan.id_penghasilan" v-bind:value="itemPenghasilan.id_penghasilan">
                          {{ itemPenghasilan.penghasilan }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Pekerjaan</label>
                      <select class="form-control col-6" v-model="id_pekerjaan">
                        <option value="">-- Pilih Pekerjaan --</option>
                        <option v-for="itemPekerjaan in itemsPekerjaan" :key="itemPekerjaan.id_pekerjaan" v-bind:value="itemPekerjaan.id_pekerjaan">
                          {{ itemPekerjaan.pekerjaan }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Disabilitas</label>
                      <select class="form-control col-6" v-model="id_disabilitas">
                        <option value="">-- Pilih Disabilitas --</option>
                        <option v-for="itemDisabilitas in itemsDisabilitas" :key="itemDisabilitas.id_disabilitas" v-bind:value="itemDisabilitas.id_disabilitas">
                          {{ itemDisabilitas.status_disabilitas }}
                        </option>
                      </select>
                    </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                    <button class="btn btn-secondary mr-3"><p><router-link tag="p" :to="{name: 'viewWali'}">Back</router-link></p></button>
                    <button class="btn btn-primary" @click="updateWali">Submit</button>
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
  name: 'updateWali',
  components: {
    Navbar,
    Sidebar,
    Footer
  },
  data() {
    return {
        id_wali: "",
        nama_wali: "",
        jenis_kelamin: "",
        nik: "",
        tgl_lahir: "",
        id_pendidikan: "",
        itemsPendidikan: [],
        id_penghasilan: "",
        itemsPenghasilan: [],
        id_pekerjaan: "",
        itemsPekerjaan: [],
        id_disabilitas: "",
        itemsDisabilitas: [],
    };
  },

  created: function () {
    this.viewPendidikan();
    this.viewPenghasilan();
    this.viewPekerjaan();
    this.viewDisabilitas();
    this.viewWaliById();
  },

  methods: {
    async viewPendidikan() {
        try {
        const response = await axios.get("http://localhost:8800/pendidikan/view");
        this.itemsPendidikan = response.data.values;
        } catch (err) {
        console.log(err);
        }
    },
    async viewPenghasilan() {
        try {
        const response = await axios.get("http://localhost:8800/penghasilan/view");
        this.itemsPenghasilan = response.data.values;
        } catch (err) {
        console.log(err);
        }
    },
    async viewPekerjaan() {
        try {
        const response = await axios.get("http://localhost:8800/pekerjaan/view");
        this.itemsPekerjaan = response.data.values;
        } catch (err) {
        console.log(err);
        }
    },
    async viewDisabilitas() {
        try {
        const response = await axios.get("http://localhost:8800/disabilitas/view");
        this.itemsDisabilitas = response.data.values;
        } catch (err) {
        console.log(err);
        }
    },

    async viewWaliById() {
      try {
        const response = await axios.get(
            `http://localhost:8800/wali/view/${this.$route.params.id}`
        );
        this.id_wali = response.data.values.[0].id_wali;
        this.nama_wali = response.data.values.[0].nama_wali;
        this.jenis_kelamin = response.data.values.[0].jenis_kelamin;
        this.nik = response.data.values.[0].nik;
        this.tgl_lahir = response.data.values.[0].tgl_lahir;
        this.id_pendidikan = response.data.values.[0].id_pendidikan;
        this.id_pekerjaan = response.data.values.[0].id_pekerjaan;
        this.id_penghasilan = response.data.values.[0].id_penghasilan;
        this.id_disabilitas = response.data.values.[0].id_disabilitas;
      } catch (err) {
        console.log(err);
      }
    },

    // Create New Wali
    async updateWali() {
      try {
        await axios.put("http://localhost:8800/wali/update", {
            id_wali: this.$route.params.id,
            nama_wali: this.nama_wali,
            jenis_kelamin: this.jenis_kelamin,
            nik: this.nik,
            tgl_lahir: this.tgl_lahir,
            id_pendidikan: this.id_pendidikan,
            id_pekerjaan: this.id_pekerjaan,
            id_penghasilan: this.id_penghasilan,
            id_disabilitas: this.id_disabilitas,
        });
        this.id_wali = "";
        this.nama_wali = "";
        this.jenis_kelamin = "";
        this.nik = "";
        this.tgl_lahir = "";
        this.id_pendidikan = "";
        this.id_pekerjaan = "";
        this.id_penghasilan = "";
        this.id_disabilitas = "";
        this.$router.push("/wali/view");
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>

<style lang="stylus" scoped>

</style>