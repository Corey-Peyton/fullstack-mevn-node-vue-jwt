<template>
    <div id="viewIbu">
        <Navbar/>
        <Sidebar/>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
<section class="content-header">
    <div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
        <h1>Ibu</h1>
        </div>
        <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><router-link :to="{name: 'dashboard'}">Home</router-link></li>
            <li class="breadcrumb-item active">Ibu</li>
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
            <h5 class="card-title"><router-link :to="{ name: 'addIbu' }" class="btn btn-success">Add Ibu</router-link></h5>
            </div>
            <form class="col-12">
            <div class="row mt-3 justify-content-center">
            <div class="col-md-9">
              <div class="input-group mb-3 mt-3">
                  <input type="text" class="form-control" id="input" v-model="nama_ibu" placeholder="Nama Ibu">
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
                  <v-btn @click="viewIbu()"
                    class="btn btn-primary"
                    >Search Ibu</v-btn
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
                <th>ID Ibu</th>
                <th>Nama Ibu</th>
                <th>NIK</th>
                <th>Tanggal Lahir</th>
                <th>Pendidikan</th>
                <th>Pekerjaan</th>
                <th width="25%" class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" :key="item.id_ibu">
                <td>{{ item.id_ibu }}</td>
                <td>{{ item.nama_ibu }}</td>
                <td>{{ item.nik }}</td>
                <td>{{ item.tgl_lahir }}</td>
                <td>{{ item.pendidikan }}</td>
                <td>{{ item.pekerjaan }}</td>
                <td class="text-center">
                <router-link :to="{ name: 'updateIbu', params: { id: item.id_ibu } }" class="btn btn-primary btn-sm mr-3">
                    Update
                </router-link>
                <a class="btn btn-danger btn-sm" @click="deleteIbu(item.id_ibu)" >
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
  name: 'viewIbu',
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
    this.viewIbu();
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
    // Get All Ibu
    async viewIbu() {
      try {
        let url = "http://localhost:8800/ibu/view";
        if(this.nama_ibu && this.nama_ibu !='') {
          url = url + "?nama_ibu="+ this.nama_ibu;
          if(this.id_pendidikan && this.id_pendidikan !='') {
            url = url + "&id_pendidikan="+ this.id_pendidikan;
          }
          if(this.id_pekerjaan && this.id_pekerjaan !='') {
            url = url + "&id_pekerjaan="+ this.id_pekerjaan;
          }
        } else if(this.nama_ibu =='' && this.id_pekerjaan =='') {
          if(this.id_pendidikan && this.id_pendidikan !='') {
            url = url + "?id_pendidikan="+ this.id_pendidikan;
          }
        } else if(this.nama_ibu =='' && this.id_pendidikan =='') {
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
 
    // Delete Ibu
    async deleteIbu(id_ibu) {
      try {
        if(confirm("Are you sure ?")){
        await axios.delete(`http://localhost:8800/ibu/delete/${id_ibu}`);
        this.viewIbu();
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