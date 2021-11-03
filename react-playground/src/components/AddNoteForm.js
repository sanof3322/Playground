import React, {useState, useContext} from "react"
import notesContext from "../context/notes-context"

const AddNoteForm = () => {
    const {notesDispatch} = useContext(notesContext)
    const  [title, setTitle] = useState("")
    const  [body, setBody] = useState("")

    const addNote = (e) => {
        e.preventDefault()
        notesDispatch({
          type: "ADD_NOTE",
          title,
          body
        })
        setTitle("")
        setBody("")
      }

    return (
        <>
            <p>Add note</p>
            <form onSubmit={addNote}>
            <div>
                <label>Title</label><br />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor="body">Note</label><br />
                <textarea name="" id="body" cols="30" rows="10" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            </div>
            <button>Add notes</button>
            </form>
        </>
    )
}

export {AddNoteForm as default}