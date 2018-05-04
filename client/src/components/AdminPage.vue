<template>
  <div>
    <p>Hello, <span class="text-danger">{{$parent.myUser}}</span>!</p>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Quản lý tin tuyển dụng" active>
          <b-button @click="addJobOnClick()" v-b-modal.addJob variant="outline-primary">Thêm tin mới</b-button>
          <!-- form input for jobs -->
          <b-modal hide-footer id="addJob" ref="addJobModal" size="lg" title="Chi tiết vị trí đang tuyển" lazy>
            <b-form @submit.prevent="createJob">
              <b-form-group label="Tên công việc" label-for="titleInput">
                <b-form-input id="titleInput" v-model="jobDetail.title" required></b-form-input>
              </b-form-group>
              <b-form-group label="Nhóm việc" label-for="groupSelect">
                <b-form-select id="groupSelect" v-model="selectedGroup" :options="jobGroup" required></b-form-select>
              </b-form-group>
              <b-form-group label="Mô tả" label-for="descriptionInput" description="Có thể nhập nhiều dòng bằng cách Enter">
                <b-form-textarea id="descriptionInput" v-model="jobDetail.description" required></b-form-textarea>
              </b-form-group>
              <b-form-group label="Yêu cầu" label-for="requirementInput">
                <b-form-textarea id="requirementInput" v-model="jobDetail.requirement" required></b-form-textarea>
              </b-form-group>
              <b-form-group label="Quyền lợi" label-for="benefitInput">
                <b-form-textarea id="benefitInput" v-model="jobDetail.benefit" required></b-form-textarea>
              </b-form-group>
              <b-form-group label="Cách ứng tuyển" label-for="howToApplyInput">
                <b-form-textarea id="howToApplytInput" v-model="jobDetail.howToApply" required></b-form-textarea>
              </b-form-group>
              <b-form-group label="Logo">
                <b-row>
                  <div style="margin-left: 15px">
                    <b-img class="border" :src = jobDetail.imgLink fluid alt="Job Logo" style="width: 5rem; height: 5rem" />
                  </div>
                  <b-col cols="7">
                    <b-form-input id="imgLinkInput" v-model="jobDetail.imgLink" required></b-form-input>
                  </b-col>
                </b-row>
              </b-form-group>
              <b-button type="submit" variant="danger">Đồng ý</b-button>
            </b-form>
          </b-modal>
          <p>Danh sách các tin tuyển dụng:</p>
          <b-table responsive striped hover :items="listJob" :fields="fields">
            <template slot="Actions" slot-scope="row">
              <b-button @click.stop="editJob(row.item.ShareLink)" v-b-modal.addJob size="sm" variant="info">Sửa</b-button>
              <b-button v-if="!row.item.Status" @click="changeStatus(1,row.item.ID)" size="sm" variant="dark">Phục hồi</b-button>
              <b-button v-if="row.item.Status" @click="changeStatus(1,row.item.ID)" size="sm" variant="danger">Xóa</b-button>
            </template>
          </b-table>
        </b-tab>
        <b-tab title="Quản lý nhóm việc">
          <b-button @click="addJobGroupOnClick()" v-b-modal.addJobGroup variant="outline-primary">Thêm nhóm việc mới</b-button>
          <!-- form input for jobGroups -->
          <b-modal hide-footer id="addJobGroup" ref="addJobGroupModal" size="lg" title="Chi tiết nhóm việc" lazy>
            <b-form @submit.prevent="createJobGroup">
              <b-form-group label="Tên nhóm việc" label-for="titleInput">
                <b-form-input id="titleInput" v-model="jobGroupDetail.title" required></b-form-input>
              </b-form-group>
              <b-form-group label="Logo">
                <b-row>
                  <div style="margin-left: 15px">
                    <b-img class="border" :src = jobGroupDetail.imgLink fluid alt="Job group Logo" style="width: 5rem; height: 5rem" />
                  </div>
                  <b-col cols="7">
                    <b-form-input id="imgLinkInput" v-model="jobGroupDetail.imgLink" required></b-form-input>
                  </b-col>
                </b-row>
              </b-form-group>
              <b-button type="submit" variant="danger">Đồng ý</b-button>
            </b-form>
          </b-modal>
          <p>Danh sách các nhóm việc:</p>
          <b-table responsive striped hover :items="listJobGroup" :fields="fields2">
            <template slot="Actions" slot-scope="row">
              <b-button @click.stop="editJobGroup(row.item.ID)" v-b-modal.addJobGroup size="sm" variant="info">Sửa</b-button>
              <b-button v-if="!row.item.Status" @click="changeStatus(2,row.item.ID)" size="sm" variant="dark">Phục hồi</b-button>
              <b-button v-if="row.item.Status" @click="changeStatus(2,row.item.ID)" size="sm" variant="danger">Xóa</b-button>
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import JobService from '@/services/JobService'
export default {
  data () {
    return {
      addOrEdit: 0,
      jobDetail: { title: null, description: null, requirement: null, benefit: null, howToApply: null, imgLink: `http://bit.ly/hrImage`, groupID: null, url: null, status: 1, createdAdmin: this.$parent.isLoggedIn },
      jobGroupDetail: { title: null, imgLink: `http://bit.ly/hrImage`, status: 1, createdAdmin: this.$parent.isLoggedIn },
      selectedGroup: null,
      jobGroup: [
        { text: 'Vui lòng chọn', value: null }
      ],
      fields: {
        ID: {
          label: 'ID',
          sortable: true
        },
        GroupID: {
          label: 'Nhóm việc',
          sortable: true
        },
        JobName: {
          label: 'Tên',
          sortable: true
        },
        ShareLink: {
          label: 'Link chia sẻ',
          sortable: false
        },
        Status: {
          label: 'Status',
          sortable: true
        },
        Actions: {
          label: '',
          sortable: false
        }
      },
      fields2: {
        ID: {
          label: 'ID',
          sortable: true
        },
        JobGroupName: {
          label: 'Tên nhóm',
          sortable: true
        },
        Status: {
          label: 'Status',
          sortable: true
        },
        Actions: {
          label: '',
          sortable: false
        }
      },
      listJob: [],
      listJobGroup: []
    }
  },
  methods: {
    addJobOnClick () {
      // reset form value
      this.jobDetail.title = null
      this.jobDetail.description = null
      this.jobDetail.url = null
      this.jobDetail.requirement = null
      this.jobDetail.benefit = null
      this.jobDetail.howToApply = null
      this.jobDetail.imgLink = `http://bit.ly/hrImage`
      this.jobDetail.status = 1
      this.addOrEdit = 1
    },
    addJobGroupOnClick () {
      // reset form value
      this.jobGroupDetail.title = null
      this.jobGroupDetail.imgLink = `http://bit.ly/hrImage`
      this.jobGroupDetail.status = 1
      this.addOrEdit = 1
    },
    async createJob () {
      // nhận biết Group ID đang chọn
      let myGroupID = ''
      let i = this.selectedGroup.length
      while (i--) {
        let mychar = this.selectedGroup.charAt(i)
        if (mychar !== ' ') myGroupID = mychar + myGroupID
        else break
      }
      this.jobDetail.groupID = Number(myGroupID)
      // hide modal when processing
      this.$refs.addJobModal.hide()
      if (this.addOrEdit === 1) {
        let myurl = this.changeAlias(this.jobDetail.title)
        this.jobDetail.url = ''
        let i = myurl.length
        while (i--) {
          if (myurl.charAt(i) === ' ') {
            this.jobDetail.url = '-' + this.jobDetail.url
          } else {
            this.jobDetail.url = myurl.charAt(i) + this.jobDetail.url
          }
        }
        await JobService.createJob({ jobDetail: this.jobDetail })
        alert('Tạo tin tuyển dụng thành công!')
      } else {
        await JobService.updateJob({ jobDetail: this.jobDetail })
        alert('Cập nhật thông tin thành công!')
      }
      this.getListJobAdmin()
    },
    async createJobGroup () {
      // hide modal when processing
      this.$refs.addJobGroupModal.hide()
      if (this.addOrEdit === 1) {
        await JobService.createJobGroup({ jobGroupDetail: this.jobGroupDetail })
        alert('Tạo nhóm việc mới thành công!')
      } else {
        await JobService.updateJobGroup({ jobGroupDetail: this.jobGroupDetail })
        alert('Cập nhật thông tin thành công!')
      }
      this.getListJobGroupAdmin()
      this.getJobGroupItems()
    },
    async getJobGroupItems () {
      this.jobGroup = [ { text: 'Vui lòng chọn', value: null } ]
      let jobs = (await JobService.getJobList()).data
      jobs.forEach(element => {
        this.jobGroup.push(element.title + ' #ID: ' + element.id)
      })
    },
    async editJob (url) {
      this.addOrEdit = 0
      let i = url.length
      let myurl = ''
      while (i--) {
        if (url.charAt(i) === '/') break
        myurl = url.charAt(i) + myurl
      }
      // fetch data to modal
      let myDetail = null
      let listJob = (await JobService.listJobAdmin()).data
      listJob.forEach(element => {
        if (element.URL === myurl) {
          myDetail = element
        }
      })
      this.jobDetail.title = myDetail.TITLE
      this.jobDetail.description = myDetail.DESCRIPTION
      this.jobDetail.requirement = myDetail.REQUIREMENT
      this.jobDetail.benefit = myDetail.BENEFIT
      this.jobDetail.howToApply = myDetail.HOWTOAPPLY
      this.jobDetail.imgLink = myDetail.IMGLINK
      this.jobDetail.status = myDetail.STATUS
      this.jobDetail.url = myDetail.URL
      this.jobGroup.forEach(element => {
        let myID = ''
        let i = element.length
        while (i--) {
          if (element.charAt(i) === ' ') break
          myID = element.charAt(i) + myID
        }
        if (myDetail.GROUPID === Number(myID)) this.selectedGroup = element
      })
    },
    async editJobGroup (id) {
      this.addOrEdit = 0
      // fetch data to modal
      let myDetail = null
      let listJobGroup = (await JobService.listJobGroupAdmin()).data
      listJobGroup.forEach(element => {
        if (element.ID === id) {
          myDetail = element
        }
      })
      this.jobGroupDetail.id = myDetail.ID
      this.jobGroupDetail.title = myDetail.TITLE
      this.jobGroupDetail.imgLink = myDetail.IMGLINK
      this.jobGroupDetail.status = myDetail.STATUS
    },
    async getListJobAdmin () {
      this.listJob = []
      let mylistJob = (await JobService.listJobAdmin()).data
      mylistJob.forEach(element => {
        this.listJob.push({
          ID: element.ID,
          GroupID: element.GROUPID,
          JobName: element.TITLE,
          ShareLink: window.location.origin + '/detail/' + element.URL,
          Status: element.STATUS
        })
      })
    },
    async getListJobGroupAdmin () {
      this.listJobGroup = []
      let mylistJobGroup = (await JobService.listJobGroupAdmin()).data
      mylistJobGroup.forEach(element => {
        this.listJobGroup.push({
          ID: element.ID,
          JobGroupName: element.TITLE,
          Status: element.STATUS
        })
      })
    },
    async changeStatus (ObjType, ObjID) {
      let result = (await JobService.changeStatus({
        objectType: ObjType,
        objectID: ObjID
      })).data
      if (result.success === 'true') {
        alert('Cập nhật thành công!')
        if (ObjType === 1) this.getListJobAdmin()
        if (ObjType === 2) {
          this.getJobGroupItems()
          this.getListJobGroupAdmin()
        }
      }
    },
    changeAlias (alias) {
      let str = alias
      str = str.toLowerCase()
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      str = str.replace(/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|, |\.|\|\|\|\|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ')
      str = str.replace(/ + /g, ' ')
      str = str.trim()
      return str
    }
  },
  mounted () {
    this.getJobGroupItems()
    this.getListJobAdmin()
    this.getListJobGroupAdmin()
  }
}
</script>
