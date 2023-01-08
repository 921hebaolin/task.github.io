import './index.css'
import { useStore } from '../store/index.jsx'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import uuid from 'react-uuid'
function Task() {
  const {taskStore} = useStore();

 function onChange(e,id){
    taskStore.singleCheck(e.target.checked,id)
 }

 function allChange(e){
  taskStore.allCheck(e.target.checked)
 }
 
 function delTask (id){
  taskStore.delTask(id)
 }
  
 const [taskValue,setTaskValue] = useState();

 function addTask (e){
  if(e.keyCode===13){
    e.target.value = '';
    taskStore.addTask(
      {
        id: uuid(),
        name: taskValue,
        isDone: false,
      }
    )
  }
 }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          onChange={(e)=>setTaskValue(e.target.value)}
          onKeyUp={addTask}
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAll}
          onChange={allChange}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {
            taskStore.list.map(item=> ( 
              <li
              className={item.isDone?"todo completed":"todo"}
              key={item.id}
            >
              <div className="view">
                <input className="toggle" 
                type="checkbox" 
                checked={item.isDone}
                onChange={(e)=>onChange(e,item.id)}
                />
                <label >{item.name}</label>
                <button className="destroy" onClick={()=>delTask(item.id)}></button>
              </div>
            </li>
            ))
          }
        </ul>
      </section>
      <footer className='footer'>
        <ul>
          <li>任务总数:{taskStore.list.length}</li>
          <li>已完成任务:{taskStore.isFinishedLength}</li>
          <li>剩余任务:{taskStore.list.length-taskStore.isFinishedLength}</li>
        </ul>
      </footer>
    </section>
  )
}

export default observer  (Task)