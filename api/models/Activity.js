const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ActivitySchema=new Schema({
  // sport/activity and title
  text:{
    type: String,
    required: false,
  },
  // description text (optional)
  desc:{
    type: String,
    required: false
  },

  // time input (hours and minutes)
  time:{
    type: String,
    required: false,
  },

  // date input (M/D/Y)
  date:{
    type:String,
    required: false,
  }
})

const Activity = mongoose.model("Activity", ActivitySchema)
module.exports = Activity