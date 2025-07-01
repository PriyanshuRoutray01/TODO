import React from 'react'
import { useState } from 'react'
import { renderToReadableStream } from 'react-dom/server';

function App() {
  const [task, settask] = useState("")
  const [description, setdescription] = useState("")
  const [maintask, setmaintask] = useState([]);
  const submihandler=(e)=>{
    e.preventDefault();
    setmaintask([...maintask , {task,description}])
    settask("");
    setdescription("");
  }
  const deletehandler = (idx)=>{
    let copytask=[...maintask];
    copytask.splice(idx,1);
    setmaintask(copytask);

  }
  let rendertask="No Task Available";
  if(maintask.length>0){
    rendertask=maintask.map((e,idx)=>{
    return (<li key={idx} className='flex justify-between mb-3'>
<div className='flex text-center justify-between mb-2 px-3 py-2 w-2/3'>
<h3 className='text-3xl font-semiblod '>Task {idx+1} : {e.task}</h3>
    <h4 className='text-2xl font-medium '>{e.description}</h4>
    
    </div>
<button onClick={()=>{
  deletehandler(idx);
}} className='bg-red-500 text-2xl text-white rounded-md px-3 py-2 '>DELETE</button>
    </li> 
    )
      });
  }

    
    

  return (
 <>
 <h1 className='bg-black text-5xl text-white font-bold text-center px-5 py-3 mb-3 '>MY TODO LIST</h1>
 <form onSubmit={(e)=>{
  submihandler(e);
 }}>
  <input value={task} onChange={(e)=>{
    settask(e.target.value);
  }} className='m-5 px-5 py-3 border-zinc-500 border-4 text-2xl rounded-2xl text-black' placeholder='Enter your task' type='text'/>
  <input  value={description} onChange={(e)=>{
    setdescription(e.target.value);
  }}className='m-5 px-5 py-3  border-zinc-500 border-4 text-2xl rounded-2xl text-black' placeholder='Enter your description'type='text'/>
  <button  className='m-5 px-5 py-3 rounded-md text-white bg-black'>ADD TASK</button>
 </form>
 <hr/>
 <div className='p-8 bg-gray-200'>
  <ul>
{rendertask}
  </ul>

 </div>
 </>
  )
}

export default App