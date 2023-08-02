import "../components-css/Expand.css"

const Expand = (props:any) =>{
  return(
    <div className="expand">
      <p><strong>Activity Title:</strong> {props.currentTitle}</p>
      <p><strong>Description:</strong> {props.currentDesc}</p>
      <p><strong>Time:</strong> {props.currentTime}</p>
      <p><strong>Date:</strong> {props.currentDate}</p>
      <div className="closeButton" onClick={()=>props.setExpand(false)}>x</div>
    </div>
  )
}

export default Expand