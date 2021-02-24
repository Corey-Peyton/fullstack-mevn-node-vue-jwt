<template>
    <div id="infoSiswa">
        <Navbar/>
        <Sidebar/>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
<section class="content-header">
    <div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
        <h1>Siswa</h1>
        </div>
        <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><router-link :to="{name: 'dashboard'}">Home</router-link></li>
            <li class="breadcrumb-item active">Siswa</li>
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
            <div class="card card-warning">
                <div class="card-header">
                <font class="card-title" text-color="white">Info Detail Data Siswa</font>
                </div>
                <!-- /.card-header -->
                <!-- form start -->                
                <div class="card-body">
                    <H5>A. DATA PRIBADI</H5>
                    <div class="form-group">
                      <label for="id_siswa">ID Siswa :</label>
                      <p>{{ id_siswa }}</p>
                    </div>
                    <div class="form-group">
                      <label for="nama_lengkap">Nama Lengkap Siswa :</label>
                      <p>{{ nama_lengkap }}</p>
                    </div>
                    <div class="form-group">
                      <label for="jenis_kelamin">Jenis Kelamin :</label>
                      <p v-if="jenis_kelamin === 'L'">Laki - Laki</p>
                      <p v-else-if="jenis_kelamin === 'P'">Perempuan</p>
                      <p v-else>Tidak Mengisi</p>
                    </div>
                    <div class="form-group">
                      <label for="nisn">NISN (Nomor Induk Siswa Nasional) :</label>
                      <p>{{ nisn }}</p>
                    </div>
                    <div class="form-group">
                      <label for="nik">NIK / No. KITAS (Untuk WNA) :</label>
                      <p>{{ nik }}</p>
                    </div>
                    <div class="form-group">
                      <label for="tmp_lahir">Tempat Lahir :</label>
                      <p>{{ tmp_lahir }}</p>
                    </div>
                    <div class="form-group">
                      <label for="tgl_lahir">Tanggal Lahir :</label>
                      <p>{{ tgl_lahir }}</p>
                    </div>
                    <div class="form-group">
                      <label>Agama :</label>
                      <p >{{ agama }}</p>
                    </div>
                    <div class="form-group">
                      <label for="kewarganegaraan">kewarganegaraan :</label>
                      <p>{{ kewarganegaraan }}</p>
                    </div>
                    <div class="form-group">
                      <label>Berkebutuhan Khusus :</label>
                      <p>{{ status_disabilitas }}</p>
                    </div>
                    <div class="form-group">
                      <label for="alamat_lengkap">Alamat Lengkap :</label>
                      <p>{{ alamat_lengkap }}</p>
                    </div>
                    <div class="form-group">
                      <label>Kelurahan :</label>
                      <p>{{ kelurahan }}</p>
                    </div>
                    <div class="form-group">
                      <label for="nama_dusun">Nama Dusun :</label>
                      <p>{{ nama_dusun }}</p>
                    </div>
                    <div class="form-group">
                      <label for="no_rt">Nomor RT :</label>
                      <p>{{ no_rt }}</p>
                    </div>
                    <div class="form-group">
                      <label for="no_rw">Nomor RW :</label>
                      <p>{{ no_rw }}</p>
                    </div>
                    <div class="form-group">
                      <label>Status Tinggal :</label>
                      <p>{{ status_tinggal }}</p>
                    </div>
                    <div class="form-group">
                      <label>Transportasi :</label>
                      <p>{{ status_transportasi }}</p>
                    </div>
                    <div class="form-group">
                      <label for="no_kps">Nomor KPS (Apabila Menerima) :</label>
                      <p>{{ no_kps }}</p>
                    </div>
                    <div class="form-group">
                      <label>Alasan Layak Mendapat KIP :</label>
                      <p>{{ alasan_layakpip }}</p>
                    </div>
                    <div class="form-group">
                      <label>Nomor PIP (Program Indonesia Pintar) :</label>
                      <p>{{ no_kip }}</p>
                    </div>
                    <div class="form-group">
                      <label>Nama pada PIP (Program Indonesia Pintar) :</label>
                      <p>{{ nama_kip }}</p>
                    </div>
                    <div class="form-group">
                      <label for="no_kks">Nomor KKS (Kartu Keluarga Sejahtera) :</label>
                      <p>{{ no_kks }}</p>
                    </div>
                    <div class="form-group">
                      <label for="no_akta">Nomor Registrasi Kartu Lahir :</label>
                      <p>{{ no_akta }}</p>
                    </div>
                    <div class="form-group">
                      <label>Nama Bank :</label>
                      <p>{{ nama_bank }}</p>
                    </div>
                    <div class="form-group">
                      <label>Nomor Rekening Bank :</label>
                      <p>{{ norek }}</p>
                    </div>
                    <div class="form-group">
                      <label>Atas Nama :</label>
                      <p>{{ atas_nama }}</p>
                    </div>
                    <H5>B. DATA AYAH KANDUNG</H5>
                    <div class="form-group">
                      <label>Data Ayah</label>
                      <p>{{ nama_ayah }}</p>
                    </div>
                    <H5>C. DATA IBU KANDUNG</H5>
                    <div class="form-group">
                      <label>Data Ibu</label>
                      <p>{{ nama_ibu }}</p>
                    </div>
                    <H5>D. DATA WALI</H5>
                    <div class="form-group">
                      <label>Data Wali</label>
                      <p>{{ nama_wali }}</p>
                    </div>
                    <h5>E. KONTAK</h5>
                    <div class="form-group">
                      <label for="no_telp">Nomor Telepon</label>
                      <p>{{ no_telp }}</p>
                    </div>
                    <div class="form-group">
                      <label for="no_hp">Nomor HP</label>
                      <p>{{ no_hp }}</p>
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <p>{{ email }}</p>
                    </div>
                    <h5>F. DATA RINCIAN PESERTA DIDIK</h5>
                    <div class="form-group">
                      <label for="tinggi_badan">Tinggi Badan (cm)</label>
                      <p>{{ tinggi_badan }}</p>
                    </div>
                    <div class="form-group">
                      <label for="berat_badan">Berat Badan (kg)</label>
                      <p>{{ berat_badan }}</p>
                    </div>
                    <div class="form-group">
                      <label for="detail_jarak">Detail Jarak ke Sekolah (km)</label>
                      <p>{{ detail_jarak }}</p>
                    </div>
                    <div class="form-group">
                      <label for="jml_saudarakandung">Jumlah Saudara Kandung</label>
                      <p>{{ jml_saudarakandung }}</p>
                    </div>
                    <h5>G. REGISTRASI PESERTA DIDIK</h5>
                    <div class="form-group">
                      <label for="tgl_masuk">Tanggal Daftar Siswa</label>
                      <p>{{ tgl_masuk }}</p>
                    </div>
                    <div class="form-group">
                      <label for="nis">NIS (Nomor Induk Siswa)</label>
                      <p>{{ nis }}</p>
                    </div>
                    <div class="form-group">
                      <label for="no_ujian">Nomor Ujian</label>
                      <p>{{ no_ujian }}</p>
                    </div>
                    <div class="form-group">
                      <label for="no_ijasah">Nomor Ijasah</label>
                      <p>{{ no_ijasah }}</p>
                    </div>
                    <div class="form-group">
                      <label for="no_skhus">Nomor SKHUS (Surat Keterangan Hasil Ujian Sekolah)</label>
                      <p>{{ no_skhus }}</p>
                    </div>

                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                    <button class="btn btn-secondary mr-3"><p><router-link tag="p" :to="{name: 'viewSiswa'}">Back</router-link></p></button>
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
  name: 'infoSiswa',
  components: {
    Navbar,
    Sidebar,
    Footer
  },
  data() {
    return {
        id_siswa: "",
        nama_lengkap: "",
        jenis_kelamin: "",
        nisn: "",
        nik: "",
        tmp_lahir: "",
        tgl_lahir: "",
        agama: "",
        itemsAgama: [],
        kewarganegaraan: "",
        status_disabilitas: "",
        itemsDisabilitas: [],
        alamat_lengkap: "",
        kelurahan: "",
        itemsKelurahan: [],
        nama_dusun: "",
        no_rt: "",
        no_rw: "",
        status_tinggal: "",
        itemsStatusTinggal: [],
        status_transportasi: "",
        itemsTransportasi: [],
        no_kps: "",
        alasan_layakpip: "",
        no_kip: "",
        nama_kip: "",
        itemsPIP: [],
        no_kks: "",
        no_akta: "",
        nama_bank: "",
        norek: "",
        atas_nama: "",
        itemsBank: [],
        nama_ayah: "",
        itemsAyah: [],
        nama_ibu: "",
        itemsIbu: [],
        nama_wali: "",
        itemsWali: [],
        no_telp: "",
        no_hp: "",
        email: "",
        tinggi_badan: "",
        berat_badan: "",
        jarak_kesekolah: "",
        detail_jarak: "",
        waktu_tempuh: "",
        jml_saudarakandung: "",
        tgl_masuk: "",
        nis: "",
        no_ujian: "",
        no_ijasah: "",
        no_skhus: "",
    };
  },
  created: function () {
    this.viewAgama();
    this.viewDisabilitas();
    this.viewKelurahan();
    this.viewStatusTinggal();
    this.viewTransportasi();
    this.viewPIP();
    this.viewBank();
    this.viewAyah();
    this.viewIbu();
    this.viewWali();
    this.viewSiswaById();
    this.viewPriodikSiswaById();
    this.viewSiswaMasukById();
  },
  methods: {
    // Get All Agama
    async viewAgama() {
      try {
        const response = await axios.get("http://localhost:8800/agama/view");
        this.itemsAgama = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    // Get All Status Disabilitas
    async viewDisabilitas() {
      try {
        const response = await axios.get("http://localhost:8800/disabilitas/view");
        this.itemsDisabilitas = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    // Get All Data Kelurahan
    async viewKelurahan() {
      try {
        const response = await axios.get("http://localhost:8800/kelurahan/view");
        this.itemsKelurahan = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    // Get All Data Status Tinggal
    async viewStatusTinggal() {
      try {
        const response = await axios.get("http://localhost:8800/statustinggal/view");
        this.itemsStatusTinggal = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    // Get All Data Transportasi
    async viewTransportasi() {
      try {
        const response = await axios.get("http://localhost:8800/transportasi/view");
        this.itemsTransportasi = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    // Get All Data Kartu PIP
    async viewPIP() {
      try {
        const response = await axios.get("http://localhost:8800/pip/view");
        this.itemsPIP = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    // Get All Data Rekening Bank
    async viewBank() {
      try {
        const response = await axios.get("http://localhost:8800/bank/view");
        this.itemsBank = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    // Get All Data Ayah
    async viewAyah() {
      try {
        const response = await axios.get("http://localhost:8800/ayah/view");
        this.itemsAyah = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    // Get All Data Ibu
    async viewIbu() {
      try {
        const response = await axios.get("http://localhost:8800/ibu/view");
        this.itemsIbu = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    // Get All Data Wali
    async viewWali() {
      try {
        const response = await axios.get("http://localhost:8800/wali/view");
        this.itemsWali = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },

    async viewPriodikSiswaById() {
      try {
        const response = await axios.get(
          `http://localhost:8800/priodiksiswa/view/${this.$route.params.id}`
        );
        this.id_priodik_siswa = response.data.values.[0].id_priodik_siswa;
        this.tinggi_badan = response.data.values.[0].tinggi_badan;
        this.berat_badan = response.data.values.[0].berat_badan;
        this.jarak_kesekolah = response.data.values.[0].jarak_kesekolah;
        this.detail_jarak = response.data.values.[0].detail_jarak;
        this.jml_saudarakandung = response.data.values.[0].jml_saudarakandung;
      } catch (err) {
        console.log(err);
      }
    },

    async viewSiswaMasukById() {
      try {
        const response = await axios.get(
          `http://localhost:8800/siswamasuk/view/${this.$route.params.id}`
        );
        this.id_siswamasuk = response.data.values.[0].id_siswamasuk;
        this.jenis_daftar = response.data.values.[0].jenis_daftar;
        this.tgl_masuk = response.data.values.[0].tgl_masuk;
        this.nis = response.data.values.[0].nis;
        this.no_ujian = response.data.values.[0].no_ujian;
        this.no_ijasah = response.data.values.[0].no_ijasah;
        this.no_skhus = response.data.values.[0].no_skhus;
      } catch (err) {
        console.log(err);
      }
    },
    
    // Get Agama By Id
    async viewSiswaById() {
      try {
        const response = await axios.get(
          `http://localhost:8800/siswa/view/${this.$route.params.id}`
        );
        this.id_siswa = response.data.values.[0].id_siswa;
        this.nama_lengkap = response.data.values.[0].nama_lengkap;
        this.jenis_kelamin = response.data.values.[0].jenis_kelamin;
        this.nisn = response.data.values.[0].nisn;
        this.nik = response.data.values.[0].nik;
        this.tmp_lahir = response.data.values.[0].tmp_lahir;
        this.tgl_lahir = response.data.values.[0].tgl_lahir;
        this.agama = response.data.values.[0].agama;
        this.kewarganegaraan = response.data.values.[0].kewarganegaraan;
        this.status_disabilitas = response.data.values.[0].status_disabilitas;
        this.alamat_lengkap = response.data.values.[0].alamat_lengkap;
        this.kelurahan = response.data.values.[0].kelurahan;
        this.nama_dusun = response.data.values.[0].nama_lengkap;
        this.no_rt = response.data.values.[0].no_rt;
        this.no_rw = response.data.values.[0].no_rw;
        this.status_tinggal = response.data.values.[0].status_tinggal;
        this.status_transportasi = response.data.values.[0].status_transportasi;
        this.no_kps = response.data.values.[0].no_kps;
        this.alasan_layakpip = response.data.values.[0].alasan_layakpip;
        this.no_kip = response.data.values.[0].no_kip;
        this.nama_kip = response.data.values.[0].nama_kip;
        this.no_kks = response.data.values.[0].no_kks;
        this.no_akta = response.data.values.[0].no_akta;
        this.nama_bank = response.data.values.[0].nama_bank;
        this.norek = response.data.values.[0].norek;
        this.atas_nama = response.data.values.[0].atas_nama;
        this.nama_ayah = response.data.values.[0].nama_ayah;
        this.nama_ibu = response.data.values.[0].nama_ibu;
        this.nama_wali = response.data.values.[0].nama_wali;
        this.no_telp = response.data.values.[0].no_telp;
        this.no_hp = response.data.values.[0].no_hp;
        this.email = response.data.values.[0].email;
        this.tgl_masuk = response.data.values.[0].tgl_masuk;
        this.nis = response.data.values.[0].nis;
        this.no_ujian = response.data.values.[0].no_ujian;
        this.no_ijasah = response.data.values.[0].no_ijasah;
        this.no_skhus = response.data.values.[0].no_skhus;
      } catch (err) {
        console.log(err);
      }
    },
 
  },
}
</script>

<style lang="stylus" scoped>

</style>