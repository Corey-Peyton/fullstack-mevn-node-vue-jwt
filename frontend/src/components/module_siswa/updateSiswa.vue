<template>
    <div id="updateSiswa">
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
            <div class="card card-primary">
                <div class="card-header">
                <font class="card-title" text-color="white">Update Data Siswa</font>
                </div>
                <!-- /.card-header -->
                <!-- form start -->                
                <div class="card-body">
                    <H5>A. DATA PRIBADI</H5>
                    <div class="form-group">
                      <label for="id_siswa">ID Siswa</label>
                      <input type="text" class="form-control col-6" id="id_siswa" placeholder="Masukkan ID Siswa" v-model="id_siswa">
                    </div>
                    <div class="form-group">
                      <label for="nama_lengkap">Nama Lengkap Siswa</label>
                      <input type="text" class="form-control col-6" id="nama_lengkap" placeholder="Masukkan Nama Lengkap Siswa" v-model="nama_lengkap">
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
                      <label for="nisn">NISN (Nomor Induk Siswa Nasional)</label>
                      <input type="text" class="form-control col-6" id="nisn" placeholder="Masukkan NISN" v-model="nisn">
                    </div>
                    <div class="form-group">
                      <label for="nik">NIK / No. KITAS (Untuk WNA)</label>
                      <input type="text" class="form-control col-6" id="nik" placeholder="Masukkan NIK" v-model="nik">
                    </div>
                    <div class="form-group">
                      <label for="tmp_lahir">Tempat Lahir</label>
                      <input type="text" class="form-control col-6" id="tmp_lahir" placeholder="Masukkan Tempat Lahir" v-model="tmp_lahir">
                    </div>
                    <div class="form-group">
                      <label for="tgl_lahir">Tanggal Lahir</label>
                      <input type="date" class="form-control col-6" id="tgl_lahir" v-model="tgl_lahir">
                    </div>
                    <div class="form-group">
                      <label>Agama</label>
                      <select class="form-control col-6" v-model="id_agama">
                        <option value="">-- Pilih Agama --</option>
                        <option v-for="itemAgama in itemsAgama" :key="itemAgama.id_agama" v-bind:value="itemAgama.id_agama">
                          {{ itemAgama.agama }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="kewarganegaraan">kewarganegaraan</label>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="kewarganegaraan" value="WNI" v-model="kewarganegaraan">
                        <label class="form-check-label">WNI (Warga Negara Indonesia)</label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="kewarganegaraan" v-model="kewarganegaraan" value="WNA">
                        <label class="form-check-label">WNA (Warga Negara Asing)</label>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Berkebutuhan Khusus</label>
                      <select class="form-control col-6" v-model="id_disabilitas">
                        <option value="">-- Pilih Status Berkebutuhan Khusus --</option>
                        <option v-for="itemDisabilitas in itemsDisabilitas" :key="itemDisabilitas.id_disabilitas" v-bind:value="itemDisabilitas.id_disabilitas">
                          {{ itemDisabilitas.status_disabilitas }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="alamat_lengkap">Alamat Lengkap</label>
                      <textarea id="alamat_lengkap" class="form-control col-6" cols="30" rows="3" v-model="alamat_lengkap" placeholder="Masukkan Alamat Lengkap"></textarea>
                    </div>
                    <div class="form-group">
                      <label>Kelurahan</label>
                      <select class="form-control col-6" v-model="id_kelurahan">
                        <option value="">-- Pilih Kelurahan --</option>
                        <option v-for="itemKelurahan in itemsKelurahan" :key="itemKelurahan.id_kelurahan" v-bind:value="itemKelurahan.id_kelurahan">
                          {{ itemKelurahan.kelurahan }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="nama_dusun">Nama Dusun</label>
                      <input type="text" class="form-control col-6" id="nama_dusun" placeholder="Masukkan Nama Dusun Siswa" v-model="nama_dusun">
                    </div>
                    <div class="form-group">
                      <label for="no_rt">Nomor RT</label>
                      <input type="text" class="form-control col-6" id="no_rt" placeholder="Masukkan Nomor RT" v-model="no_rt">
                    </div>
                    <div class="form-group">
                      <label for="no_rw">Nomor RW</label>
                      <input type="text" class="form-control col-6" id="no_rw" placeholder="Masukkan Nomor RW" v-model="no_rw">
                    </div>
                    <div class="form-group">
                      <label>Status Tinggal</label>
                      <select class="form-control col-6" v-model="id_statustinggal">
                        <option value="">-- Pilih Status Tinggal --</option>
                        <option v-for="itemStatusTinggal in itemsStatusTinggal" :key="itemStatusTinggal.id_statustinggal" v-bind:value="itemStatusTinggal.id_statustinggal">
                          {{ itemStatusTinggal.status_tinggal }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Transportasi</label>
                      <select class="form-control col-6" v-model="id_transportasi">
                        <option value="">-- Pilih Transportasi --</option>
                        <option v-for="itemTransportasi in itemsTransportasi" :key="itemTransportasi.id_transportasi" v-bind:value="itemTransportasi.id_transportasi">
                          {{ itemTransportasi.status_transportasi }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="no_kps">Nomor KPS (Apabila Menerima)</label>
                      <input type="text" class="form-control col-6" id="no_kps" placeholder="Masukkan Nomor KPS" v-model="no_kps">
                    </div>
                    <div class="form-group">
                      <label>Nomor PIP (Program Indonesia Pintar)</label>
                      <select class="form-control col-6" v-model="id_pip">
                        <option value="">-- Pilih Nomor PIP --</option>
                        <option v-for="itemPIP in itemsPIP" :key="itemPIP.id_pip" v-bind:value="itemPIP.id_pip">
                          {{ itemPIP.no_kip }} - {{ itemPIP.nama_kip }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="no_kks">Nomor KKS (Kartu Keluarga Sejahtera)</label>
                      <input type="text" class="form-control col-6" id="no_kks" placeholder="Masukkan Nomor KKS" v-model="no_kks">
                    </div>
                    <div class="form-group">
                      <label for="no_akta">Nomor Registrasi Kartu Lahir</label>
                      <input type="text" class="form-control col-6" id="no_akta" placeholder="Masukkan Nomor Akta" v-model="no_akta">
                    </div>
                    <div class="form-group">
                      <label>Nomor Rekening Bank</label>
                      <select class="form-control col-6" v-model="id_bank">
                        <option value="">-- Pilih Rekening Bank --</option>
                        <option v-for="itemBank in itemsBank" :key="itemBank.id_bank" v-bind:value="itemBank.id_bank">
                          {{ itemBank.nama_bank }} - {{ itemBank.norek }} - {{ itemBank.atas_nama }}
                        </option>
                      </select>
                    </div>
                    <H5>B. DATA AYAH KANDUNG</H5>
                    <div class="form-group">
                      <label>Data Ayah</label>
                      <select class="form-control col-6" v-model="id_ayah">
                        <option value="">-- Pilih Data Ayah --</option>
                        <option v-for="itemAyah in itemsAyah" :key="itemAyah.id_ayah" v-bind:value="itemAyah.id_ayah">
                          {{ itemAyah.nik }} - {{ itemAyah.nama_ayah }}
                        </option>
                      </select>
                    </div>
                    <H5>C. DATA IBU KANDUNG</H5>
                    <div class="form-group">
                      <label>Data Ibu</label>
                      <select class="form-control col-6" v-model="id_ibu">
                        <option value="">-- Pilih Data Ibu --</option>
                        <option v-for="itemIbu in itemsIbu" :key="itemIbu.id_ibu" v-bind:value="itemIbu.id_ibu">
                          {{ itemIbu.nik }} - {{ itemIbu.nama_ibu }}
                        </option>
                      </select>
                    </div>
                    <H5>D. DATA WALI</H5>
                    <div class="form-group">
                      <label>Data Wali</label>
                      <select class="form-control col-6" v-model="id_wali">
                        <option value="">-- Pilih Data Wali --</option>
                        <option v-for="itemWali in itemsWali" :key="itemWali.id_wali" v-bind:value="itemWali.id_wali">
                          {{ itemWali.nik }} - {{ itemWali.nama_wali }}
                        </option>
                      </select>
                    </div>
                    <h5>E. KONTAK</h5>
                    <div class="form-group">
                      <label for="no_telp">Nomor Telepon</label>
                      <input type="text" class="form-control col-6" id="no_telp" placeholder="Masukkan Nomor Telepon" v-model="no_telp">
                    </div>
                    <div class="form-group">
                      <label for="no_hp">Nomor HP</label>
                      <input type="text" class="form-control col-6" id="no_hp" placeholder="Masukkan Nomor HP" v-model="no_hp">
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" class="form-control col-6" id="email" placeholder="Masukkan Email" v-model="email">
                    </div>
                    <h5>F. DATA RINCIAN PESERTA DIDIK</h5>
                    <div class="form-group">
                      <label for="id_priodik_siswa">ID Priodik Siswa</label>
                      <input type="text" class="form-control col-6" id="id_priodik_siswa" placeholder="Masukkan ID Priodik Siswa" v-model="id_priodik_siswa">
                    </div>
                    <div class="form-group">
                      <label for="tinggi_badan">Tinggi Badan (cm)</label>
                      <input type="text" class="form-control col-6" id="tinggi_badan" placeholder="Masukkan Tinggi Badan" v-model="tinggi_badan">
                    </div>
                    <div class="form-group">
                      <label for="berat_badan">Berat Badan (kg)</label>
                      <input type="text" class="form-control col-6" id="berat_badan" placeholder="Masukkan Berat Badan" v-model="berat_badan">
                    </div>
                    <div class="form-group">
                      <label for="jarak_kesekolah">Jarak ke Sekolah</label>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="jarak_kesekolah" value="1" v-model="jarak_kesekolah">
                        <label class="form-check-label">Kurang dari 1 km</label>
                      </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="jarak_kesekolah" v-model="jarak_kesekolah" value="2">
                        <label class="form-check-label">Lebih dari 1 km</label>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="detail_jarak">Detail Jarak ke Sekolah (km)</label>
                      <input type="text" class="form-control col-6" id="detail_jarak" placeholder="Masukkan Detail Jarak ke Sekolah" v-model="detail_jarak">
                    </div>
                    <div class="form-group">
                      <label for="jml_saudarakandung">Jumlah Saudara Kandung</label>
                      <input type="text" class="form-control col-6" id="jml_saudarakandung" placeholder="Masukkan Jumlah Saudara Kandung" v-model="jml_saudarakandung">
                    </div>
                    <h5>G. REGISTRASI PESERTA DIDIK</h5>
                    <div class="form-group">
                      <label for="id_siswamasuk">ID Siswa Masuk</label>
                      <input type="text" class="form-control col-6" id="id_siswamasuk" placeholder="Masukkan Siswa Masuk" v-model="id_siswamasuk">
                    </div>
                    <div class="form-group">
                      <label for="jenis_daftar">Jenis Daftar</label>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="jenis_daftar" value="1" v-model="jenis_daftar" checked>
                        <label class="form-check-label">Siswa Baru</label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="jenis_daftar" v-model="jenis_daftar" value="1">
                        <label class="form-check-label">Pindahan</label>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="tgl_masuk">Tanggal Daftar Siswa</label>
                      <input type="date" class="form-control col-6" id="tgl_masuk" v-model="tgl_masuk">
                    </div>
                    <div class="form-group">
                      <label for="nis">NIS (Nomor Induk Siswa)</label>
                      <input type="text" class="form-control col-6" id="nis" placeholder="Masukkan Nomor Induk Siswa" v-model="nis">
                    </div>
                    <div class="form-group">
                      <label for="no_ujian">Nomor Ujian</label>
                      <input type="text" class="form-control col-6" id="no_ujian" placeholder="Masukkan Nomor Ujian" v-model="no_ujian">
                    </div>
                    <div class="form-group">
                      <label for="no_ijasah">Nomor Ijasah</label>
                      <input type="text" class="form-control col-6" id="no_ijasah" placeholder="Masukkan Nomor Ujian" v-model="no_ijasah">
                    </div>
                    <div class="form-group">
                      <label for="no_skhus">Nomor SKHUS (Surat Keterangan Hasil Ujian Sekolah)</label>
                      <input type="text" class="form-control col-6" id="no_skhus" placeholder="Masukkan Nomor no_skhus" v-model="no_skhus">
                    </div>

                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                    <button class="btn btn-secondary mr-3"><p><router-link tag="p" :to="{name: 'viewSiswa'}">Back</router-link></p></button>
                    <button class="btn btn-primary" @click="updateSiswa">Submit</button>
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
  name: 'updateSiswa',
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
        id_agama: "",
        itemsAgama: [],
        kewarganegaraan: "",
        id_disabilitas: "",
        itemsDisabilitas: [],
        alamat_lengkap: "",
        id_kelurahan: "",
        itemsKelurahan: [],
        nama_dusun: "",
        no_rt: "",
        no_rw: "",
        id_statustinggal: "",
        itemsStatusTinggal: [],
        id_transportasi: "",
        itemsTransportasi: [],
        no_kps: "",
        id_pip: "",
        itemsPIP: [],
        no_kks: "",
        no_akta: "",
        id_bank: "",
        itemsBank: [],
        id_ayah: "",
        itemsAyah: [],
        id_ibu: "",
        itemsIbu: [],
        id_wali: "",
        itemsWali: [],
        no_telp: "",
        no_hp: "",
        email: "",
        id_priodik_siswa: "",
        tinggi_badan: "",
        berat_badan: "",
        jarak_kesekolah: "",
        detail_jarak: "",
        waktu_tempuh: "",
        jml_saudarakandung: "",
        id_siswamasuk: "",
        jenis_daftar: "",
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
    // Get Priodik Siswa By Id
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
        this.id_agama = response.data.values.[0].id_agama;
        this.kewarganegaraan = response.data.values.[0].kewarganegaraan;
        this.id_disabilitas = response.data.values.[0].id_disabilitas;
        this.alamat_lengkap = response.data.values.[0].alamat_lengkap;
        this.id_kelurahan = response.data.values.[0].id_kelurahan;
        this.nama_dusun = response.data.values.[0].nama_lengkap;
        this.no_rt = response.data.values.[0].no_rt;
        this.no_rw = response.data.values.[0].no_rw;
        this.id_statustinggal = response.data.values.[0].id_statustinggal;
        this.id_transportasi = response.data.values.[0].id_transportasi;
        this.no_kps = response.data.values.[0].no_kps;
        this.id_pip = response.data.values.[0].id_pip;
        this.no_kks = response.data.values.[0].no_kks;
        this.no_akta = response.data.values.[0].no_akta;
        this.id_bank = response.data.values.[0].id_bank;
        this.id_ayah = response.data.values.[0].id_ayah;
        this.id_ibu = response.data.values.[0].id_ibu;
        this.id_wali = response.data.values.[0].id_wali;
        this.no_telp = response.data.values.[0].no_telp;
        this.no_hp = response.data.values.[0].no_hp;
        this.email = response.data.values.[0].email;
      } catch (err) {
        console.log(err);
      }
    },
 
    // Update siswa
    async updateSiswa() {
      try {
        await axios.put("http://localhost:8800/priodiksiswa/update", {
          id_siswa: this.$route.params.id,
          id_priodik_siswa: this.id_priodik_siswa,
          tinggi_badan: this.tinggi_badan,
          berat_badan: this.berat_badan,
          jarak_kesekolah: this.jarak_kesekolah,
          detail_jarak: this.detail_jarak,
          jml_saudarakandung: this.jml_saudarakandung,
        });
        this.id_priodik_siswa = "";
        this.tinggi_badan = "";
        this.berat_badan = "";
        this.jarak_kesekolah = "";
        this.detail_jarak = "";
        this.jml_saudarakandung = "";

        await axios.put("http://localhost:8800/siswamasuk/update", {
          id_siswa: this.$route.params.id,
          jenis_daftar: this.jenis_daftar,
          tgl_masuk: this.tgl_masuk,
          nis: this.nis,
          no_ujian: this.no_ujian,
          no_ijasah: this.no_ijasah,
          no_skhus: this.no_skhus,
        });
        this.jenis_daftar = "";
        this.tgl_masuk = "";
        this.nis = "";
        this.no_ujian = "";
        this.no_ijasah = "";
        this.no_skhus = "";

        await axios.put(
          `http://localhost:8800/siswa/update/`,
          {
            id_siswa: this.$route.params.id,
            nama_lengkap: this.nama_lengkap,
            jenis_kelamin: this.jenis_kelamin,
            nisn: this.nisn,
            nik: this.nik,
            tmp_lahir: this.tmp_lahir,
            tgl_lahir: this.tgl_lahir,
            id_agama: this.id_agama,
            kewarganegaraan: this.kewarganegaraan,
            id_disabilitas: this.id_disabilitas,
            alamat_lengkap: this.alamat_lengkap,
            id_kelurahan: this.id_kelurahan,
            nama_dusun: this.nama_dusun,
            no_rt: this.no_rt,
            no_rw: this.no_rw,
            id_statustinggal: this.id_statustinggal,
            id_transportasi: this.id_transportasi,
            no_kps: this.no_kps,
            id_pip: this.id_pip,
            no_kks: this.no_kks,
            no_akta: this.no_akta,
            id_bank: this.id_bank,
            id_ayah: this.id_ayah,
            id_ibu: this.id_ibu,
            id_wali: this.id_wali,
            no_telp: this.no_telp,
            no_hp: this.no_hp,
            email: this.email,
          }
        );
        this.id_siswa = "";
        this.nama_lengkap = "";
        this.jenis_kelamin = "",
        this.nisn = "",
        this.nik = "",
        this.tmp_lahir = "";
        this.tgl_lahir = "",
        this.id_agama = "",
        this.kewarganegaraan = "",
        this.id_disabilitas = "",
        this.alamat_lengkap = "";
        this.id_kelurahan = "";
        this.nama_dusun = "",
        this.no_rt = "",
        this.no_rw = "",
        this.id_statustinggal = "",
        this.id_transportasi = "",
        this.no_kps = "",
        this.id_pip = "",
        this.no_kks = "",
        this.no_akta = "",
        this.id_bank = "",
        this.id_ayah = "",
        this.id_ibu = "",
        this.id_wali = "",
        this.no_telp = "",
        this.no_hp = "",
        this.email = "",
        this.$router.push("/siswa/view");
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>

<style lang="stylus" scoped>

</style>