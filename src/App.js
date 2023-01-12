import "./index.css"
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toDo,setToDO] = useState(null);
  const [progres,setProgres] = useState(null);
  const [completed,setCompleted] = useState(null); 

  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError(err);
        setLoading(false);
      })
    }, []);

  var jsonData1 = {
    "title": "",
    "description": "",
    "completed": false,
    "isInProgress": true,
  }

  function handleClick() {
    jsonData1.title = message;
    jsonData1.description = description;

    axios.post('http://localhost:3001/tasks', jsonData1)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })

  
  }


  const handleChange = event => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };

  const handleDescChange = event => {
    setDescription(event.target.value);
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
              <input className="Title" placeholder="Title"    id='message'     onChange={handleChange} value={message}/>
        </form>
        <form className="form2">
            <input className="Description" placeholder="Description" onChange={handleDescChange}/>
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
