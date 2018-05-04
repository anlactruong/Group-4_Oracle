import Api from '@/services/Api'

export default {
  login (info) {
    return Api().post('api/login', info)
  }
}
