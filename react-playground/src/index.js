import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import NoteApp from "./components/NoteApp"


const App = (props) => {
  const [count, setCount] = useState(props.count)
  const [text, setText] = useState("")

  useEffect(() => {
    console.log("useEffect ran");
    document.title = count
  }, [count])

  useEffect(() => {
    //runs only ones once component did mount
    console.log("runs only ones once component did mount");
    document.title = count
  })

  return (
    <div>
      <p>The current {text || 'count'} is {count}</p>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.count)}>Reset</button>
      <button onClick={() => setCount(count + 1)}>1</button>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  )
};

ReactDOM.render(
  <NoteApp />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();