import mongoose from "mongoose";

const Userschema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true,
},

email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
},

password:{
    type: String,
    required: true,
},

isAdmin: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }

});

export default mongoose.model("User",Userschema)