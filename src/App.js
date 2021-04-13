// import logo from './logo.svg';
import React,{ useState , useEffect} from 'react'; 
import './App.css';
import Todo from './Todo';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import db from './firebase';
import firebase from 'firebase';

function App() {  
  // useState is a hook that sets up state inside of our app
  const [todos,setTodos] = useState([]);
  const [input,setInput] = useState('');
  // console.log(input);
  //When the app loads, we need to listen to the database and fetch todos as they get added/removed.
  //useEffect is a hook which runs once when the application loads
  useEffect(() => {
    //This code fires when the app.js loads. onSnapshot function will take snapshot of the database and will take those entries available in the database 
    //and add it to the todos list which will be rendered once the app loads or fires or it changes.
    //Here orderBy will actually help the message sorting by timestamp so latest messages will be displayed first.
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => doc.data().todo))
      })
    },[]);
    

  const addTodo = (event) => {
    //This function will fire off when the button will be clicked.
    event.preventDefault();
    // console.log("I am working!!!");
    // setTodos([...todos, input]);
    //todo will be added in the database. 
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');                    //Clearing up the input after hitting submit button.
  }

  return (
    <div className="App">
      <h1>
        Hello World
      </h1>
      {/* We are using form here because after entering the values we generally press enter to submit the information and to get that functionality we wrap it around form and not just a simple button. */}
      <form>
        {/* We are using FormControl here to beautify the form that we are using to enter the values. */}
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        
        {/* disabled={!input} will allow only non null values to be added in the list. */}
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">   
          Add Todo
        </Button>
        {/* <button type="submit" onClick={addTodo} >Add Todo </button> */}
      </form>
      <ul>
        {todos.map(todo => (
          <Todo text={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
