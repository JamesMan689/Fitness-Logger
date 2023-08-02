const express = require('express')
const mongoose=require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/activity-logger",{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>console.log("Connected to DB")).catch(console.err)

const Activity = require("./models/Activity")

app.get('/activities', async(req,res) => {
  const activities=await Activity.find()

  res.json(activities)
})

app.post('/activities/new', (req,res) =>{
  const activity = new Activity({
    text: req.body.text,
    desc: req.body.desc,
    time: req.body.time,
    date: req.body.date
  })
  activity.save()

  res.json(activity)
})

app.delete('/activities/delete/:id', async(req,res)=>{
  const result = await Activity.findByIdAndDelete(req.params.id)

  res.json(result)
})

app.put('/activities/update/:id', async(req, res)=>{
  const {text,desc,time,date} = req.body

  const updatedActivity = await Activity.findByIdAndUpdate(
    req.params.id,
    { text, desc, time, date },
    { new: true } 
  )

  if(!updatedActivity){
    return res.status(404).json({error: 'Activity not found'})
  }
  res.status(200).json(updatedActivity)
})

app.listen(3001, ()=>console.log("Server started on port 3001"))