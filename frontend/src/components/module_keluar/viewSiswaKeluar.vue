<template>
    <div id="viewSiswaKeluar">
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

        <div class="card">
            <div class="card-header">
            <h5 class="card-title"><router-link :to="{ name: 'addSiswaKeluar' }" class="btn btn-success">Add Siswa Keluar</router-link></h5>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                <th>Nama Siswa</th>
                <th>L/P</th>
                <th>Tempat, Tanggal Lahir</th>
                <th>Alamat Lengkap</th>
                <th>Alasan</th>
                <th width="25%" class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" :key="item.id_siswakeluar">
                <td>{{ item.nama_lengkap }}</td>
                <td>{{ item.jenis_kelamin }}</td>
                <td>{{ item.tgl_lahir }}</td>
                <td>{{ item.alamat_lengkap }}</td>
                <td>{{ item.alasan }}</td>
                <td class="text-center">
                <router-link :to="{ name: 'infoSiswaKeluar', params: { id: item.id_siswa } }" class="btn btn-info btn-sm mr-3">
                    Info
                </router-link>
                <router-link :to="{ name: 'updateSiswaKeluar', params: { id: item.id_siswa } }" class="btn btn-primary btn-sm mr-3">
                    Update
                </router-link>
                <a class="btn btn-danger btn-sm" @click="deleteSiswa(item.id_siswakeluar)" >
                    Delete
                </a>
                </td>
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
import Navbar from './../_layouts/Navbar.vue'
import Sidebar from './../_layouts/Sidebar.vue'
import Footer from './../_layouts/Footer.vue'

export default {
  name: 'viewSiswaKeluar',
  components: {
    Navbar,
    Sidebar,
    Footer
  },
  data() {
    return {
      items: [],
    };
  },
 
  created() {
    this.viewSiswa();
  },
 
  methods: {
    // Get All Siswa
    async viewSiswa() {
      try {
        const response = await axios.get("http://localhost:8800/siswakeluar/view");
        this.items = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
 
    // Delete Siswa
    async deleteSiswa(id_siswakeluar) {
      try {
        if(confirm("Are you sure ?")){
        await axios.delete(`http://localhost:8800/siswakeluar/delete/${id_siswakeluar}`);
        this.viewSiswa();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>

<style lang="stylus" scoped>

</style>