<template>
    <div id="addAyah">
        <Navbar/>
        <Sidebar/>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
<section class="content-header">
    <div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
        <h1>Ayah</h1>
        </div>
        <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><router-link :to="{name: 'dashboard'}">Home</router-link></li>
            <li class="breadcrumb-item active">Ayah</li>
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
                <font class="card-title" text-color="white">Add Data Ayah</font>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                
                <div class="card-body">
                    <div class="form-group">
                        <label for="id_ayah">ID Ayah</label>
                        <input type="text" class="form-control col-6" id="id_ayah" placeholder="Masukkan ID Ayah" v-model="id_ayah">
                    </div>
                    <div class="form-group">
                        <label for="nama_ayah">Nama Ayah</label>
                        <input type="text" class="form-control col-6" id="nama_ayah" placeholder="Masukkan Nama Ayah" v-model="nama_ayah">
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
                    <button class="btn btn-secondary mr-3"><p><router-link tag="p" :to="{name: 'viewAyah'}">Back</router-link></p></button>
                    <button class="btn btn-success" @click="saveAyah">Submit</button>
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
  name: 'addAyah',
  components: {
    Navbar,
    Sidebar,
    Footer
  },
  data() {
    return {
        id_ayah: "",
        nama_ayah: "",
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

  created() {
    this.viewPendidikan();
    this.viewPenghasilan();
    this.viewPekerjaan();
    this.viewDisabilitas();
    this.viewAyahLastId();
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

    async viewAyahLastId() {
      try {
        const response = await axios.get(
            `http://localhost:8800/ayah/viewlast`
        );
        let id_last = response.data.values.[0].id_ayah;
        let id_ayahlast = Number(id_last.substring(9,12)) + 1;
        if (id_ayahlast < 100 && id_ayahlast > 9) {
          id_ayahlast = "0" + id_ayahlast;
        }
        else if (id_ayahlast < 10) {
          id_ayahlast = "00" + id_ayahlast;
        }
        id_ayahlast = id_last.substring(0,9) + id_ayahlast;
        this.id_ayah = id_ayahlast;
      } catch (err) {
        console.log(err);
      }
    },

    // Create New ayah
    async saveAyah() {
      try {
        await axios.post("http://localhost:8800/ayah/add", {
            id_ayah: this.id_ayah,
            nama_ayah: this.nama_ayah,
            nik: this.nik,
            tgl_lahir: this.tgl_lahir,
            id_pendidikan: this.id_pendidikan,
            id_pekerjaan: this.id_pekerjaan,
            id_penghasilan: this.id_penghasilan,
            id_disabilitas: this.id_disabilitas,
        });
        this.id_ayah = "";
        this.nama_ayah = "";
        this.nik = "";
        this.tgl_lahir = "";
        this.id_pendidikan = "";
        this.id_pekerjaan = "";
        this.id_penghasilan = "";
        this.id_disabilitas = "";
        this.$router.push("/ayah/view");
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>

<style lang="stylus" scoped>

</style>