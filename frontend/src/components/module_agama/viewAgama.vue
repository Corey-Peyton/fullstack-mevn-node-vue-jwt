<template>
    <div id="viewAgama">
        <Navbar/>
        <Sidebar/>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
<section class="content-header">
    <div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
        <h1>Agama</h1>
        </div>
        <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><router-link :to="{name: 'dashboard'}">Home</router-link></li>
            <li class="breadcrumb-item active">Agama</li>
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
            <h5 class="card-title"><router-link :to="{ name: 'addAgama' }" class="btn btn-success">Add Agama</router-link></h5>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                <th width="20%">ID Agama</th>
                <th>Agama</th>
                <th width="20%" class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" :key="item.agama">
                <td>{{ item.id_agama }}</td>
                <td>{{ item.agama }}</td>
                <td class="text-center">
                <router-link
                    :to="{ name: 'updateAgama', params: { id: item.id_agama } }"
                    class="btn btn-primary btn-sm mr-3"
                    >Update</router-link
                    >
                    <a
                    class="btn btn-danger btn-sm"
                    @click="deleteAgama(item.id_agama)"
                    >Delete</a
                    >
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
  name: 'viewAgama',
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
    this.viewAgama();
  },
 
  methods: {
    // Get All Products
    async viewAgama() {
      try {
        const response = await axios.get("http://localhost:8800/agama/view");
        this.items = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
 
    // Delete Product
    async deleteAgama(id_agama) {
      try {
        if(confirm("Are you sure ?")){
        await axios.delete(`http://localhost:8800/agama/delete/${id_agama}`);
        // console.log(this.id_agama);
        this.viewAgama();
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