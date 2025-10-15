const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
}, { timestamps: true });


const UserModel = mongoose.model("Users", UserSchema);


module.exports = UserModel;
