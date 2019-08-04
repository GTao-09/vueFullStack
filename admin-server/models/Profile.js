const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  type: { /* 类型 */
    type: String
  },
  describe: { /* 描述 */
    type: String
  },
  income: { /* 收入 */
    type: String,
    required: true
  },
  expenditure: { /* 支出 */
    type: String,
    required: true
  },
  cash: { /* 现金 */
    type: String,
    required: true
  },
  remark: { /* 备注 */
    type: String
  },
  data: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model("Profile", ProfileSchema);