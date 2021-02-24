<template>
    <div id="dashboard">
        <Navbar/>
        <Sidebar/>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
<section class="content-header">
    <div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
        <h1>Home</h1>
        </div>
        <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><router-link :to="{name: 'dashboard'}">Home</router-link></li>
            <li class="breadcrumb-item active">Home</li>
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

        <div class="card">
            <div class="card-header">
            <h3 class="card-title">Selamat Datang di Sistem Pengolahan Data Siswa</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
            <h3>Rekapitulasi Data Siswa Terdaftar</h3>
            <table id="example1" class="table table-bordered table-striped text-center">
                <thead>
                <tr>
                    <th colspan="12">Siswa Terdaftar</th>
                </tr>
                </thead>
                <thead>
                    <tr>
                        <th v-for="item in items" :key="item.range_usia">{{ item.range_usia }}</th>
                        <th>Total Laki - Laki</th>  
                        <th>Total Perempuan</th>
                        <th>Total Semua</th>     
                    </tr>
                </thead>
                <tbody>
                <tr>
                <td v-for="item in items" :key="item.range_usia">{{ item.jumlah }}</td>
                <td v-for="itemL in itemsL" :key="itemL.total_laki">{{ itemL.total_laki }}</td>
                <td v-for="itemP in itemsP" :key="itemP.total_perempuan">{{ itemP.total_perempuan }}</td>
                <td v-for="itemS in itemsS" :key="itemS.total_siswa">{{ itemS.total_siswa }}</td>
                </tr>                
                </tbody>
            </table>
            </div>
            <!-- /.card-body -->
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
import Navbar from './_layouts/Navbar.vue'
import Sidebar from './_layouts/Sidebar.vue'
import Footer from './_layouts/Footer.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    Footer
  },
  data() {
    return {
      items: [],
      itemsL: [],
      itemsP: [],
      itemsS: [],
    };
  },
 
  created() {
    this.viewRekapSiswa();
    this.viewTotalSiswaL();
    this.viewTotalSiswaP();
    this.viewTotalSiswaS();
  },

  methods: {
    // Get All Siswa
    async viewRekapSiswa() {
      try {
        const response = await axios.get("http://localhost:8800/siswa/viewrekap");
        this.items = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    async viewTotalSiswaL() {
      try {
        const response = await axios.get("http://localhost:8800/siswa/viewtotall");
        this.itemsL = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    async viewTotalSiswaP() {
      try {
        const response = await axios.get("http://localhost:8800/siswa/viewtotalp");
        this.itemsP = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
    async viewTotalSiswaS() {
      try {
        const response = await axios.get("http://localhost:8800/siswa/viewtotal");
        this.itemsS = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
  },

}
</script>