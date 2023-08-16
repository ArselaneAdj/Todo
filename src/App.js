import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';




function App() {

  const[newitem, setNewitem] = useState("")

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
      return [...currentTodo,{id: crypto.randomUUID(),title:newitem, completed: false},]
    })
    
    
    setNewitem("")
  }

  


  function toggleTodo(id, completed){
    setTodo(currentTodo =>{
      return currentTodo.map( todo =>{
        if( todo.id === id) {
          return  {...todo, completed} 
          
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


/* // NO DUPLICATES FUNCTION
  function ra(){
      var ul = document.getElementById("foo");
      var items = ul.getElementsByTagName("li");
        for (var i = 0; i < items.length; ++i) {
          console.log(items[i].innerHTML.split(""))
          if(newitem == items[i].innerHTML.split("")[148]){  
              items[i].remove();
          }
          
        
      }
    }*/


  

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <div class="input-group input-group-lg">
            <input autofocus required placeholder='Add Item...' className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={newitem} onChange={e => setNewitem(e.target.value)} type='text' id='item'></input><n/>
            <button class="btn btn-light">add</button>
          </div>
        </div>
      </form>
      <h1 class="display-1" style={{fontSize:"10rem"}}>to do list</h1>
      <ul id='foo' class="list-group list-group-flush">
        {todo.length === 0 && "No Todos"}
        {todo.map(todo =>{
          return (
            <li class="list-group-item" key={todo.title}>
              <label  id='cv' class="display-3">
                <input name='checkbox'  id='cb' className="form-check-input float-left position-absolute top-0 start-0"  type='checkbox' checked={todo.completed} onChange={e =>toggleTodo(todo.id, e.target.checked) }></input>{todo.title}
              </label>
              <button style={{display:"flex", alignItems:"center"}} class="btn btn-danger btn-lg  text-center float-left position-absolute top-0 end-0" onClick={() =>del(todo.id)}>delete</button>
            </li>
        )})}
      </ul>
    </div>
  );
}

export default App;
