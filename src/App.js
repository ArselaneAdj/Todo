import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import {HashRouter as Router, Route, Routes} from "react-router-dom"
import { BrowserRouter } from 'react-router-dom'



function App() {

  const[newitem, setNewitem]= useState("")

  const[todo, setTodo]= useState(()=>{
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return []
    return JSON.parse(localValue)
  }, [])


  useEffect(()=>{
    localStorage.setItem("ITEMS", JSON.stringify(todo))
  }, [todo])

  function handleSubmit(e){
    e.preventDefault()

    setTodo(currentTodo =>{
      return [...currentTodo,{id: crypto.randomUUID(), title: newitem, completed: false},]
    })
    setNewitem("")
  }


  function toggleTodo(id, completed){
    setTodo(currentTodo =>{
      return currentTodo.map( todo =>{
        if( todo.id === id) {
          return {...todo, completed}
          
        }
        
        return todo
      })
    })
  }

  function del(id){
    setTodo(currentTodo =>{
      return currentTodo.filter(todo => todo.id !== id)
    })
  }

  
  

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='item'>New item</label>
          <input value={newitem} onChange={e => setNewitem(e.target.value)} type='text' id='item'></input>
          <button>add</button>
        </div>
      </form>
      <h1>todo list</h1>
      <ul>
        {todo.length == 0 && "notodos"}
        {todo.map(todo =>{
          return(
            <li key={todo.title}>
              <label>
                <input type='checkbox' checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}></input>{todo.title}
              </label>
              <button onClick={() =>del(todo.id)}>delete</button>
            </li>
        )})}
      </ul>
    </div>
  );
}

export default App;
