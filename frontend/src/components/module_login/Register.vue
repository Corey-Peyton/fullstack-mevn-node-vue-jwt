<template>
<div id="register">

<div class="hold-transition register-page">
<div class="register-box">
  <div class="card card-outline card-primary">
    <div class="card-header text-center">
      <router-link :to="{path: '/register'}" class="h1"><b>BSP</b>School</router-link>
    </div>
    <div class="card-body">
      <p class="login-box-msg">Register a new membership</p>

      <form action="#" method="post">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Username">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Retype password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <!-- <input type="checkbox" id="agreeTerms" name="terms" value="agree"> -->
              <label for="agreeTerms">
               <!-- I agree to the <a href="#">terms</a> -->
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block">Register</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

      <router-link :to="{path: '/login'}" class="text-center">I already have a membership</router-link>
    </div>
    <!-- /.form-box -->
  </div><!-- /.card -->
</div>
<!-- /.register-box -->
</div>
</div>
</template>

<script>

export default {
  name: 'Register',
  components: {
    
  },
  data() {
    return {
      
    };
  },
 
  created() {
    
  },
 
  methods: {
    
  },
}
</script>

<style lang="stylus" scoped>

</style>