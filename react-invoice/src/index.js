import React, { useState} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
// import app from './App'

const NoteApp = (props) => {
  const [notes, setNotes] = useState([])
  const  [title, setTitle] = useState("")

  const addNote = (e) => {
    e.preventDefault()
    setNotes([
      ...notes,
      {title}
    ])
    setTitle("")
  }

  const removeNote = (title) => {
    setNotes(notes.filter((note) => note.title !== title))
  }

  return (
    <div>
      <h1>Notes!!!</h1>
      {notes.map((note, index) => {
        return(
          <div key={index}>
            <h3>{note.Title}</h3>
            <button onClick={() => {return removeNote(note.title)}}>x</button>
          </div>
        )
      })}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>Add notes!!!</button>
      </form>
    </div>
  )
}

ReactDOM.render(
  <NoteApp />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();