<template>
  <div>
    <div v-if="!isLoggedIn" align="center" id="login_form">
      <b-col col lg="6">
        <b-card border-variant="dark" header="Admin đăng nhập" align="center">
          <b-alert variant="danger" :show="(error!=null)">{{error}}</b-alert>
          <b-form @submit.prevent="login">
            <p><b-form-input v-model="loginName" type="text" required placeholder="Tên đăng nhập"></b-form-input></p>
            <p><b-form-input v-model="loginPassword" type="password" required placeholder="Mật khẩu"></b-form-input></p>
            <b-button type="submit" variant="info">Đăng nhập</b-button>
          </b-form>
        </b-card>
      </b-col>
    </div>
    <b-container v-if="isLoggedIn">
      <AdminPage />
    </b-container>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'
import AdminPage from '@/components/AdminPage.vue'
export default {
  data () {
    return {
      loginName: '',
      loginPassword: '',
      error: null,
      isLoggedIn: 0,
      myUser: null
    }
  },
  components: {
    AdminPage
  },
  methods: {
    async login () {
      try {
        const response = await AuthService.login({
          loginName: this.loginName,
          loginPassword: this.loginPassword
        })
        this.isLoggedIn = response.data.user.ID
        this.myUser = response.data.user.LOGINNAME
        this.error = null
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style>
</style>
