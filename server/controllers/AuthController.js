const database = require('../services/database.js')

module.exports = {
  async login (req, res) {
    try {
      const loginName = req.body.loginName;
      const loginPassword = req.body.loginPassword;
      // find user is admin with correct password
      const query1 = `select * from users where isAdmin = 1 and loginName = ` + `'` + loginName + `'` + ` and loginPassword = ` + `'` + loginPassword + `'`;
      const result = (await database.simpleExecute(query1)).rows;
      if (result.length === 0) {
        return res.status(403).send({
          error: 'Lỗi: Tên đăng nhập hoặc mật khẩu sai.'
        })
      }
      res.send({
        user: result[0]
      })
    } catch (err) {
      res.status(500).send({
        error: 'Lỗi: có lỗi xảy ra trong quá trình đăng nhập'
      })
    }
  }
}