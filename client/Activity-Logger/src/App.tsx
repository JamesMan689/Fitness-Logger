import "./App.css"
import {useState, useEffect} from 'react'
import AddPopup from "./components/AddPopup"
import Expand from "./components/Expand"

const LOCALHOST="http://localhost:3001"

function App() {
  const [activities, setActivities] = useState<any[]>([])
  const [reversedActivities, setReversedActivities] = useState<any[]>([]);
  const [addPopup, setAddPopup] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDesc, setNewDesc] = useState("")
  const [newTime, setNewTime] = useState("")
  const [newDate, setNewDate] = useState("")

  useEffect(()=>{
    GetActivities()
  },[])

  useEffect(() => {
    setReversedActivities([...activities].reverse());
  }, [activities]);

  const GetActivities = () =>{
    fetch(LOCALHOST+"/activities")
      .then(res=>res.json())
      .then(data=>setActivities(data))
      .catch(err=>console.error("Error: ", err))
  }

  const remove = async (_id:any) =>{
    const data = await fetch(`${LOCALHOST}/activities/delete/${_id}`,{
      method:"DELETE"
    }).then(res=>res.json())

    setActivities(prevArray=>
      prevArray.filter((activity)=>activity._id!==data._id)
    )
  }

  const add = async () => {
    const data = await fetch(LOCALHOST + "/activities/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTitle,
        desc: newDesc,
        time: newTime,
        date: newDate,
      })
    }).then(res => res.json());
  
    setActivities(prevActivities => [...prevActivities, data]);
  
    setNewTime("");
    setNewDesc("");
    setNewDate("");
    setNewTitle("");
  }  

  function handleSubmit(e:any){
    e.preventDefault();
    add()
    setAddPopup(false)
  }

  const [currentTitle, setCurrentTitle] = useState("")
  const [currentDesc, setCurrentDesc] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [expand, setExpand] = useState(false)

  function activityClick(text: string, desc: string, time: string, date:string){
    setExpand(true)
    setCurrentTitle(text)
    setCurrentDesc(desc)
    setCurrentTime(time)
    setCurrentDate(date)
  }

  return (
    <div>
      <h1 className="pageTitle">Welcome To Your Activity Fitness Logger</h1>
      <div className="activity">
        <h3 className="yourActivity">Your Activities</h3>
        {activities.length===0?(
          <AddPopup handleSubmit={handleSubmit} setAddPopup={setAddPopup} setNewDate={setNewDate} setNewDesc={setNewDesc} setNewTime={setNewTime} setNewTitle={setNewTitle}/>
        ):<div className="add" onClick={()=>setAddPopup(true)}>+</div>}
        <div className="content">
            <div>
                {reversedActivities.map((item) => (
                  <div className="activitySummary" 
                    key={item._id}
                    onClick={()=>activityClick(item.text, item.desc, item.time, item.date)}
                  >
                      Activity title: {item.text} Description: {item.desc} Time: {item.time} Date: {item.date}
                      <div className="closeButton"
                      onClick={
                        (e)=>{
                          e.stopPropagation();
                          remove(item._id)}
                      }
                      >x</div>
                  </div>
                ))}
            </div>
            <div>
            {
              addPopup?(
                <AddPopup handleSubmit={handleSubmit} setAddPopup={setAddPopup} setNewDate={setNewDate} setNewDesc={setNewDesc} setNewTime={setNewTime} setNewTitle={setNewTitle}/>
              ): ''
            }
            {expand&&(
              <Expand setExpand={setExpand} currentTitle={currentTitle} currentDesc={currentDesc} currentTime={currentTime} currentDate={currentDate} />
            )}
            </div>
          </div>
        </div>
    </div>
    
  )
}

export default App
