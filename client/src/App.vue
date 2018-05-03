<template>
  <div id="app">
    <b-navbar class="navbar-custom" :sticky="true">
      <div style="margin-left: 30px;">
      <router-link style="text-decoration: none" :to="'/'">
        <b-img src="/static/logo.png" alt="logo" fluid style="width: auto; height: 50px;"/>
      </router-link>
      </div>
    </b-navbar>
    <br />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.navbar-custom {
    background-color: #ffffff;
    border-bottom:3px solid #2c1eac;
}
</style>
