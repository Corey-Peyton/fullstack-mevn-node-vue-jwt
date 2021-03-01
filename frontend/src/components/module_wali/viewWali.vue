<template>
    <div id="viewWali">
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

        <div class="card">
            <div class="card-header">
            <h5 class="card-title"><router-link :to="{ name: 'addWali' }" class="btn btn-success">Add Wali</router-link></h5>
            </div>
            <form class="col-12">
            <div class="row mt-3 justify-content-center">
            <div class="col-md-9">
              <div class="input-group mb-3 mt-3">
                  <input type="text" class="form-control" id="input" v-model="nama_wali" placeholder="Nama Wali">
                  <select class="form-control col-6" v-model="id_pendidikan">
                    <option value="">-- Pilih Pendidikan --</option>
                    <option v-for="itemPendidikan in itemsPendidikan" :key="itemPendidikan.id_pendidikan" v-bind:value="itemPendidikan.id_pendidikan">
                      {{ itemPendidikan.pendidikan }}
                    </option>
                  </select>
                  <select class="form-control col-6" v-model="id_pekerjaan">
                    <option value="">-- Pilih Pekerjaan --</option>
                    <option v-for="itemPekerjaan in itemsPekerjaan" :key="itemPekerjaan.id_pekerjaan" v-bind:value="itemPekerjaan.id_pekerjaan">
                      {{ itemPekerjaan.pekerjaan }}
                    </option>
                  </select>
                  <v-btn @click="viewWali()"
                    class="btn btn-primary"
                    >Search Wali</v-btn
                    >
              </div>
              </div>
            </div>
            </form>
            <!-- /.card-header -->
            <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                <th>ID Wali</th>
                <th>Nama Wali</th>
                <th>L/P</th>
                <th>NIK</th>
                <th>Tanggal Lahir</th>
                <th>Pendidikan</th>
                <th>Pekerjaan</th>
                <th width="25%" class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" :key="item.id_wali">
                <td>{{ item.id_wali }}</td>
                <td>{{ item.nama_wali }}</td>
                <td>{{ item.jenis_kelamin }}</td>
                <td>{{ item.nik }}</td>
                <td>{{ item.tgl_lahir }}</td>
                <td>{{ item.pendidikan }}</td>
                <td>{{ item.pekerjaan }}</td>
                <td class="text-center">
                <router-link :to="{ name: 'updateWali', params: { id: item.id_wali } }" class="btn btn-primary btn-sm mr-3">
                    Update
                </router-link>
                <a class="btn btn-danger btn-sm" @click="deleteWali(item.id_wali)" >
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
  name: 'viewWali',
  components: {
    Navbar,
    Sidebar,
    Footer
  },
  data() {
    return {
      items: [],
      nama_ibu: "",
      id_pendidikan: "",
      itemsPendidikan: [],
      id_pekerjaan: "",
      itemsPekerjaan: [],
    };
  },
 
  created() {
    this.viewWali();
    this.viewPendidikan();
    this.viewPekerjaan();
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
    async viewPekerjaan() {
        try {
        const response = await axios.get("http://localhost:8800/pekerjaan/view");
        this.itemsPekerjaan = response.data.values;
        } catch (err) {
        console.log(err);
        }
    },
    // Get All Wali
    async viewWali() {
      try {
        let url = "http://localhost:8800/wali/view";
        if(this.nama_wali && this.nama_wali !='') {
          url = url + "?nama_wali="+ this.nama_wali;
          if(this.id_pendidikan && this.id_pendidikan !='') {
            url = url + "&id_pendidikan="+ this.id_pendidikan;
          }
          if(this.id_pekerjaan && this.id_pekerjaan !='') {
            url = url + "&id_pekerjaan="+ this.id_pekerjaan;
          }
        } else if(this.nama_wali =='' && this.id_pekerjaan =='') {
          if(this.id_pendidikan && this.id_pendidikan !='') {
            url = url + "?id_pendidikan="+ this.id_pendidikan;
          }
        } else if(this.nama_wali =='' && this.id_pendidikan =='') {
          if(this.id_pekerjaan && this.id_pekerjaan !='') {
            url = url + "?id_pekerjaan="+ this.id_pekerjaan;
          }
        } else {
          if(this.id_pekerjaan && this.id_pekerjaan !='') {
            url = url + "?id_pekerjaan="+ this.id_pekerjaan;
          }
          if(this.id_pendidikan && this.id_pendidikan !='') {
            url = url + "&id_pendidikan="+ this.id_pendidikan;
          }
        }
        const response = await axios.get(url);
        this.items = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
 
    // Delete Wali
    async deleteWali(id_wali) {
      try {
        if(confirm("Are you sure ?")){
        await axios.delete(`http://localhost:8800/wali/delete/${id_wali}`);
        this.viewWali();
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