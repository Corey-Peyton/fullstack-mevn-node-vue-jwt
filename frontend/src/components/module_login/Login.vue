<template>
<div id="login">

<div class="hold-transition login-page">
<div class="login-box">
  <!-- /.login-logo -->
  <div class="card card-outline card-primary">
    <div class="card-header text-center">
      <router-link :to="{path: '/login'}" class="h1"><b>BSP</b>School</router-link>
    </div>
    <div class="card-body">
      <div v-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      <p class="login-box-msg">Sign in to start your session</p>

      <form @submit.prevent="handleSubmit">        
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="username" placeholder="Username">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" v-model="password" placeholder="Password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <!-- <input type="checkbox" id="remember"> -->
              <label for="remember">
                <!-- Remember Me -->
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

      <!-- <div class="social-auth-links text-center mt-2 mb-3">
        <a href="#" class="btn btn-block btn-primary">
          <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
        </a>
        <a href="#" class="btn btn-block btn-danger">
          <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
        </a>
      </div> -->
      <!-- /.social-auth-links -->

      <!-- <p class="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p> -->
      <p class="mb-0">
        <router-link :to="{path: '/register'}" class="text-center">Register a new membership</router-link>
      </p>
    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
</div>
<!-- /.login-box -->

</div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  
  methods: {
    async handleSubmit(){

      try{
        const response = await axios.post('login', {
          username: this.username,
          password: this.password
        });
        
        this.username = '',
        this.password = ''
        // console.log(response);
        localStorage.setItem('token', response.data.token);
        this.$router.replace(
          { name: 'dashboard', params: { ...this.$route.params } },
          () => {
            this.$router.go(0);
          }
        );
      } catch(e) {
        this.error = 'Invalid Username/Password!',
        this.username = '',
        this.password = ''
      }

    }
  },
}
</script>

<style lang="stylus" scoped>

</style>