import { List , ListItem , ListItemText , Button , Modal, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import { makeStyles } from '@material-ui/core/styles';

const useStyles= makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  }

  const updateTodo = () => {
    //Update the todo with the new input text
    db.collections('todos').doc(props.todo.id).set({
      todo: input
    }, {merge: true});
    setOpen(false);
  } 
  return (
    <div>
        <Modal>
          open={open}
          onClose={e => setOpen(false)}
          <div className={classes.paper}>
            <h1>I am a modal</h1>
            <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
            <Button onClick={e => setOpen(false)}>Update Todo</Button>
          </div>
        </Modal>
        <List className="todo__list">
          <ListItem>
            <ListItemText primary={props.todo.todo} secondary="Dummy Deadline"/>
          </ListItem>
          <button onClick={e => setOpen(true)}>Edit</button>
          <DeleteForeverIcon onClick={event => db.collections('todos').doc('props.todo.id').delete()}/>
        </List>
    </div>
  )
}

export default Todo
