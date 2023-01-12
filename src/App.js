import "./index.css"
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toDo,setToDO] = useState(null);
  const [progres,setProgres] = useState(null);
  const [completed,setCompleted] = useState(null); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/tasks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
      }
    
      return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if(!data) return;

  var jsonData1 = {

    "title": "fAadsasd",
    "description": "This one is a simple description of a todo task",



  }
  function handleClick() {
    
    var formData = new FormData();
    formData.append('json1', JSON.stringify(jsonData1));
    console.log(formData.jsonData1);

    // Send data to the backend via POST
    fetch('http://localhost:3001/tasks', {

      method: 'POST', 
      mode: 'cors', 
      body: formData // body data type must match "Content-Type" header

    })
  }
 

  const handleChange = event => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };

  return (
    <div>
      <div >
        <h1 >TUES to do list</h1>
        </div>
        <div className="div">
        <div  >
          <div>
        <label> To do list </label>
        <form className="form1">

              <input className="Title" placeholder="Title"    id='message'     onChange={handleChange}
        value={message}/>

        </form>
        <form className="form2">
            
            <input className="Description" placeholder="Description" />
           
        </form>
        <button className="Create"  placeholder="Create" onClick={handleClick}>
          Create
        </button></div>
      </div>
      <div className="Bigboard">
        <lable>TO DO</lable>
        <div className="Board">
        { data.filter(task => task.isInProgress === false && task.completed === false).map((task)=>{
            return(
              <div>
            <p className="ParTitle">{task.title}</p>
            <p className="ParDescription">{task.description}</p>
            </div>
            );
          })} 

        </div>
        </div>
        <div>
          <button className=" next"> next </button>
        </div>
        <div className="Bigboard" >
        <lable>In progres</lable>

        <div className="Board">
        { data.filter(task => task.isInProgress === true).map((task)=>{
            return(
              <div>
            <p className="ParTitle">{task.title}</p>
            <p className="ParDescription">{task.description}</p>
            </div>
            );
          })} 
        </div>
        </div>
        <div>
          <button className=" next"> next </button>
        </div>
        <div className="Bigboard">
        <lable>Done</lable>
        <div className="Board">
        { data.filter(task => task.completed === true ).map((task)=>{
            return(
              <div>
            <p className="ParTitle">{task.title}</p>
            <p className="ParDescription">{task.description}</p>
            </div>
            );
          })} 
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
