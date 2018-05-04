import Api from '@/services/Api'

export default {
  getJobDetail (jobUrl) {
    return Api().get('api/job/' + jobUrl)
  },
  getJobList () {
    return Api().get('api/get_job_list')
  }
}
