<template>
<b-container>
  <b-row>
    <b-col sm="6" lg="4" v-for="(jobGroup, i) in jobGroupList" :key="i" style="text-align: left; margin-bottom: 35px">
      <b-row>
        <b-col cols = "3">
          <div class="groupTitle">
            <b-img :src="jobGroup.imgLink" alt="logo" fluid style="max-width: 60px; max-height: 60px; width: auto; height: auto"/>
            {{jobGroup.title}}
          </div>
        </b-col>
        <b-col cols="9">
          <div v-if="jobGroup.listJobs.length === 0">
            <p class="jobList">(chưa có tin tuyển dụng)</p>
          </div>
          <router-link style="text-decoration: none" v-for="(aJob, j) in jobGroup.listJobs" :key="j" :to="'/detail/'+aJob.url">
            <p class="jobList">{{aJob.title}}</p>
          </router-link>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import JobService from '@/services/JobService'
export default {
  data () {
    return {
      jobGroupList: {}
    }
  },
  async mounted () {
    this.jobGroupList = (await JobService.getJobList()).data
  }
}
</script>

<style scoped>
.groupTitle {
  text-align: center;
  padding-left: 2px;
  background-color: #ffffff; color: #0c1c79;
  padding-top: 5px;
  font-size: 15px;
  font-style: italic; font-weight: 520;
  /* width: 75px */
}
.jobList {
  color: black; background-color: white;
  border-bottom: 1pt solid #0b097a;
  font-size: 15px; font-weight: 456;
  /* width: 200px; */
}
</style>
