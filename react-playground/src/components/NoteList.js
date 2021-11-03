import React, {useContext} from "react"
import Note from "./note"
import NotesContext from "../context/notes-context"

const NoteList = () => {
    const {notes} = useContext(NotesContext)
    console.log(notes);

    return notes.map((note, index) => (
        <Note key={index} note={note}/>
    ))
}

export {NoteList as default}