import React, {useEffect, useContext} from 'react';
import notesContext from '../context/notes-context';
import useMousePosition from '../hooks/useMousePosition';


const Note = ({note}) => {
    const {notesDispatch} = useContext(notesContext)
    const position = useMousePosition()

    useEffect(() => {
      console.log("setting up effect");
  
      return () => {
        //component didUnmount
        console.log("cleaning up effect");
      }
    }, [])
    return (
      <div>
        <h3>{note.title}</h3>
        <p>{note.body}</p>
        <p>{position.x}, {position.y}</p>
        <button onClick={() => notesDispatch({type: "REMOVE_NOTE", title: note.title})}>x</button>
      </div>
    )
  };
  

  export {Note as default}