import Api from '@/services/Api'

export default {
  getJobDetail (jobUrl) {
    return Api().get('api/job/' + jobUrl)
  },
  getJobList () {
    return Api().get('api/get_job_list')
  },
  listJobAdmin () {
    return Api().get('api/list_job_admin')
  },
  listJobGroupAdmin () {
    return Api().get('api/list_job_group_admin')
  },
  createJob (jobDetail) {
    return Api().post('api/create_job', jobDetail)
  },
  updateJob (jobDetail) {
    return Api().post('api/update_job', jobDetail)
  },
  createJobGroup (jobGroupDetail) {
    return Api().post('api/create_job_group', jobGroupDetail)
  },
  updateJobGroup (jobGroupDetail) {
    return Api().post('api/update_job_group', jobGroupDetail)
  },
  changeStatus (object) {
    return Api().post('api/change_status', object)
  }
}
