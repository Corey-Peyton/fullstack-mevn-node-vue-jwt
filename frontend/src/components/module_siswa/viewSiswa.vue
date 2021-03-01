<template>
    <div id="viewSiswa">
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

        <div class="card">
            <div class="card-header">
            <h5 class="card-title"><router-link :to="{ name: 'addSiswa' }" class="btn btn-success">Add Siswa</router-link></h5>
            </div>
            <form class="col-12">
            <div class="row mt-3 justify-content-center">
            <div class="col-md-9">
              <div class="input-group mb-3 mt-3">
                  <input type="text" class="form-control" id="input" v-model="nama_lengkap" placeholder="Nama Siswa">
                  <select class="form-control col-6" v-model="jenis_kelamin">
                    <option  value="">-- Pilih Jenis Kelamin --</option>
                    <option value="L">Laki - Laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                  <select class="form-control col-6" v-model="id_kelurahan">
                    <option value="">-- Pilih Kelurahan --</option>
                    <option v-for="itemKelurahan in itemsKelurahan" :key="itemKelurahan.id_kelurahan" v-bind:value="itemKelurahan.id_kelurahan">
                      {{ itemKelurahan.kelurahan }}
                    </option>
                  </select>
                  <v-btn @click="viewSiswa()"
                    class="btn btn-primary"
                    >Search Siswa</v-btn
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
                <th>Nama Siswa</th>
                <th>L/P</th>
                <th>Tempat, Tanggal Lahir</th>
                <th>Nama Ayah</th>
                <th>Nama Ibu</th>
                <th>Nama Wali</th>
                <th>Alamat Lengkap</th>
                <th width="25%" class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" :key="item.id_siswa">
                <td>{{ item.nama_lengkap }}</td>
                <td>{{ item.jenis_kelamin }}</td>
                <td>{{ item.tempat_tgl_lahir }}</td>
                <td>{{ item.nama_ayah }}</td>
                <td>{{ item.nama_ibu }}</td>
                <td>{{ item.nama_wali }}</td>
                <td>{{ item.alamat_lengkap_banget }}</td>
                <td class="text-center">
                <router-link :to="{ name: 'infoSiswa', params: { id: item.id_siswa } }" class="btn btn-info btn-sm mr-3">
                    Info
                </router-link>
                <router-link :to="{ name: 'updateSiswa', params: { id: item.id_siswa } }" class="btn btn-primary btn-sm mr-3">
                    Update
                </router-link>
                <a class="btn btn-danger btn-sm" @click="deleteSiswa(item.id_siswa)" >
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
  name: 'viewSiswa',
  components: {
    Navbar,
    Sidebar,
    Footer
  },
  data() {
    return {
      items: [],
      jenis_kelamin: "",
      id_kelurahan: "",
      itemsKelurahan: [],
    };
  },
 
  created() {
    this.viewSiswa();
    this.viewKelurahan();
  },
 
  methods: {
    async viewKelurahan() {
        try {
        const response = await axios.get("http://localhost:8800/kelurahan/view");
        this.itemsKelurahan = response.data.values;
        } catch (err) {
        console.log(err);
        }
    },
    // Get All Siswa
    async viewSiswa() {
      try {
        let url = "http://localhost:8800/siswa/view";
        if(this.nama_lengkap && this.nama_lengkap !='') {
          url = url + "?nama_lengkap="+ this.nama_lengkap;
          if(this.jenis_kelamin && this.jenis_kelamin !='') {
            url = url + "&jenis_kelamin="+ this.jenis_kelamin;
          }
          if(this.id_kelurahan && this.id_kelurahan !='') {
            url = url + "&id_kelurahan="+ this.id_kelurahan;
          }
        } else if(this.nama_lengkap =='' && this.id_kelurahan =='') {
          if(this.jenis_kelamin && this.jenis_kelamin !='') {
            url = url + "?jenis_kelamin="+ this.jenis_kelamin;
          }
        } else if(this.nama_lengkap =='' && this.jenis_kelamin =='') {
          if(this.id_kelurahan && this.id_kelurahan !='') {
            url = url + "?id_kelurahan="+ this.id_kelurahan;
          }
        } else {
          if(this.id_kelurahan && this.id_kelurahan !='') {
            url = url + "?id_kelurahan="+ this.id_kelurahan;
          }
          if(this.jenis_kelamin && this.jenis_kelamin !='') {
            url = url + "&jenis_kelamin="+ this.jenis_kelamin;
          }
        }
        const response = await axios.get(url);
        this.items = response.data.values;
      } catch (err) {
        console.log(err);
      }
    },
 
    // Delete Siswa
    async deleteSiswa(id_siswa) {
      try {
        if(confirm("Are you sure ?")){
        await axios.delete(`http://localhost:8800/siswa/delete/${id_siswa}`);
        await axios.delete(`http://localhost:8800/priodiksiswa/delete/${id_siswa}`);
        await axios.delete(`http://localhost:8800/siswamasuk/delete/${id_siswa}`);
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