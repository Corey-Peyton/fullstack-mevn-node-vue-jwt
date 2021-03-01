<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link :to="{name: 'dashboard'}" class="brand-link ">         
      <h5 class="brand-text font-weight-light text-center">FS Node - Vue</h5>
    </router-link>    

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="info">
          <font color="white" class="d-block">Welcome,<br>Permadi Eka Permana</font>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
            <li class="nav-item">
              <a :href="$router.resolve({name: 'dashboard'}).href" class="nav-link"><i class="nav-icon fas fa-home"></i> Data Home</a>
            </li>
            <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-database"></i>
              <p>
                Data Master
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a :href="$router.resolve({name: 'viewAgama'}).href" class="nav-link"><i class="far fa-circle nav-icon"></i> Data Agama</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-database"></i>
              <p>
                Data Orang Tua / Wali
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a :href="$router.resolve({name: 'viewAyah'}).href" class="nav-link"><i class="far fa-circle nav-icon"></i> Data Ayah</a>
              </li>
              <li class="nav-item">
                <a :href="$router.resolve({name: 'viewIbu'}).href" class="nav-link"><i class="far fa-circle nav-icon"></i> Data Ibu</a>
              </li>
              <li class="nav-item">
                <a :href="$router.resolve({name: 'viewWali'}).href" class="nav-link"><i class="far fa-circle nav-icon"></i> Data Wali</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a :href="$router.resolve({name: 'viewSiswa'}).href" class="nav-link"><i class="nav-icon fas fa-users"></i> Data Siswa</a>
          </li>
          <li class="nav-item">
            <a :href="$router.resolve({name: 'viewSiswaKeluar'}).href" class="nav-link"><i class="nav-icon fas fa-users"></i> Data Siswa Keluar</a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {}
</script>