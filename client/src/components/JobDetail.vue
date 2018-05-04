<template>
  <b-col col lg="12">
    <b-row style="margin-left: 2px;">
      <div>
        <b-img class="border" :src="jobDetailObj.imgLink" fluid alt="Job Logo" style="max-width: 4rem; max-height: 4rem; width: auto; height: auto" />
      </div>
      <b-col col lg="10">
        <div class="jobTitle" style="font-size: 20px;">
          {{jobDetailObj.title}}
        </div>
        <b-badge>{{jobDetailObj.createdAt}}</b-badge>
      </b-col>
    </b-row>
    <br />
    <p class="jobSubTitle" v-b-toggle.collapseMota>Mô tả</p>
    <b-collapse visible id="collapseMota">
      <p v-html="jobDetailObj.description"></p>
    </b-collapse>
    <p class="jobSubTitle" v-b-toggle.collapseRequi>Yêu cầu</p>
    <b-collapse visible id="collapseRequi">
      <p v-html="jobDetailObj.requirement"></p>
    </b-collapse>
    <p class="jobSubTitle" v-b-toggle.collapseBenefit>Quyền lợi</p>
    <b-collapse visible id="collapseBenefit">
      <p v-html="jobDetailObj.benefit"></p>
    </b-collapse>
    <p class="jobSubTitle" v-b-toggle.collapseApply>Cách ứng tuyển</p>
    <b-collapse visible id="collapseApply">
      <p v-html="jobDetailObj.howToApply"></p>
    </b-collapse>
  </b-col>
</template>

<script>
import JobService from '@/services/JobService'
export default {
  props: ['jobUrl'],
  data () {
    return {
      jobDetailObj: { }
    }
  },
  methods: {
    linebreak () {
      this.jobDetailObj.description = this.jobDetailObj.description.replace(/\r?\n/g, `<br />`)
      this.jobDetailObj.requirement = this.jobDetailObj.requirement.replace(/\r?\n/g, `<br />`)
      this.jobDetailObj.benefit = this.jobDetailObj.benefit.replace(/\r?\n/g, `<br />`)
      this.jobDetailObj.howToApply = this.jobDetailObj.howToApply.replace(/\r?\n/g, `<br />`)
    }
  },
  async mounted () {
    this.jobDetailObj = (await JobService.getJobDetail(this.jobUrl)).data
  }
}
</script>

<style scoped>
    .jobTitle {
    color: #2011aa;
    font-size: 20px;
    font-weight: bold;
    font-style: italic
    }
    .jobSubTitle {
    border-bottom:2px solid #1c1aa3;
    font-size: 19px;
    font-weight: bold;
    }
</style>
