import React, { useEffect, useReducer} from 'react';
import notesReducer from "../reducers/notes";
import NoteList from "./NoteList"
import AddNoteForm from "./AddNoteForm"
import NotesContext from '../context/notes-context'

const NoteApp = (props) => {
    // const [notes, setNotes] = useState([])
    const [notes, notesDispatch] = useReducer(notesReducer, [])    
  
    useEffect(() => {
      const notesData = JSON.parse(localStorage.getItem("notes"))
  
      if(notesData){
        // setNotes(notesData)
        notesDispatch({type: "POPULATE_NOTES", notes: notesData})
      }
    }, [])
  
    useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])
  
    return (
      <NotesContext.Provider value={{notes, notesDispatch}}>
        <h1>Notes</h1>
        <NoteList />
        <hr />
        <AddNoteForm />
      </NotesContext.Provider>
    )
  }

  export {NoteApp as default}