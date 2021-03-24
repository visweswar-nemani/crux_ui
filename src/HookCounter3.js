import React,{useState,useEffect} from 'react'

function HookCounter3() {


    const[name,setName]=useState({
        firstName:'',
        lastName:''
   })
   const[X,setX] =useState(0) 
   const[Y,setY] =useState(0) 

   const logMouseposition = (e) =>{
       console.log("mouse pos event")
       setX(e.clientX)
       setY(e.clientY)
   }

   useEffect( () => {
       console.log('In use effect')
       window.addEventListener('mousemove',logMouseposition)
   },[])
    
    return (
        <div>
            Hooks - X: {X} , Y: {Y}
        </div>
    )
}

export default HookCounter3

