<template>
  <div>
    <b-container>
      <b-img src='/static/jobimg.png' alt="logo" fluid />
      <br /><br />
      <center><b-badge class="vitridt">Những công việc đang chờ bạn:</b-badge></center>
      <br />
      <job-menu-home />
    </b-container>
  </div>
</template>

<script>
import JobMenuHome from '@/components/JobMenuHome.vue'
export default {
  components: {
    JobMenuHome
  }
}
</script>

<style scoped>
.vitridt {
    background-color: #9de9dc; color: #0a1b52;
    font-size: 21px;
    font-weight: 500;
}
</style>
