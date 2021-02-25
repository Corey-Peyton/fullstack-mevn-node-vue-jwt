<template>
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
        </ul>
        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <li class="nav-item d-none d-sm-inline-block">
                <a href="javascript:void(0)" @click="handleLogout()" class="nav-link">Logout</a>
            </li>
        </ul>
    </nav>
    <!-- /.navbar -->
</template>

<script>
export default {
    methods: {
        handleLogout() {
            if(confirm("Are you sure ?")){
                localStorage.removeItem('token');
                this.$router.replace(
                    { name: 'login', params: { ...this.$route.params } },
                    () => {
                    this.$router.go(0);
                    }
                );
            }
        }
    }
}
</script>