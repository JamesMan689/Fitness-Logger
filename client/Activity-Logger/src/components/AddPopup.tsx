import "../components-css/AddPopup.css"

const AddPopup = (props:any) => {
  return(
    <div className="popUpActive">
        <form className="addActivityForm" onSubmit={(props.handleSubmit)}>
            <input type="text" placeholder="Title of Activity" onChange={e=>props.setNewTitle(e.target.value)}></input>
            <input type="text" placeholder="Description" onChange={e=>props.setNewDesc(e.target.value)}></input>
            <input type="time" placeholder="Time" onChange={e=>props.setNewTime(e.target.value)}></input>
            <input type="date" placeholder="Date" onChange={e=>props.setNewDate(e.target.value)}></input>
            <button>Submit</button>
        </form>
      <div className="exitPopup" onClick={()=>props.setAddPopup(false)}>X</div>
    </div>
  )
}

export default AddPopup