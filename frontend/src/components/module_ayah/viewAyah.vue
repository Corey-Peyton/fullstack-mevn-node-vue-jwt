<template>
    <div id="viewAyah">
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

        <div class="card">
            <div class="card-header">
            <h5 class="card-title"><router-link :to="{ name: 'addAyah' }" class="btn btn-success">Add Ayah</router-link></h5>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                <th>ID Ayah</th>
                <th>Nama Ayah</th>
                <th>NIK</th>
                <th>Tanggal Lahir</th>
                <th>Pendidikan</th>
                <th>Pekerjaan</th>
                <th width="25%" class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" :key="item.id_ayah">
                <td>{{ item.id_ayah }}</td>
                <td>{{ item.nama_ayah }}</td>
                <td>{{ item.nik }}</td>
                <td>{{ item.tgl_lahir }}</td>
                <td>{{ item.pendidikan }}</td>
                <td>{{ item.pekerjaan }}</td>
                <td class="text-center">
                <router-link :to="{ name: 'updateAyah', params: { id: item.id_ayah } }" class="btn btn-primary btn-sm mr-3">
                    Update
                </router-link>
                <a class="btn btn-danger btn-sm" @click="deleteAyah(item.id_ayah)" >
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
  name: 'viewAyah',
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
    this.viewAyah();
  },
 
  methods: {
    // Get All Ayah
    async viewAyah() {
      try {
        const response = await axios.get("http://localhost:8800/ayah/view");
        this.items = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
 
    // Delete Ayah
    async deleteAyah(id_ayah) {
      try {
        if(confirm("Are you sure ?")){
        await axios.delete(`http://localhost:8800/ayah/delete/${id_ayah}`);
        this.viewAyah();
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