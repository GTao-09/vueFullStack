const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: { /* 姓名 */
    type: String,
    required: true
  },
  email: { /* 邮箱 */
    type: String,
    required: true
  },
  password: { /* 密码 */
    type: String,
    required: true
  },
  avatar: { /* 头像 */
    type: String
  },
  date: { /* 时间 */
    type: Date,
    default: Date.now
  },
  identity: { /* 身份 */
    type: String,
    required: true
  }
})

module.exports = User = mongoose.model("Users", UserSchema);