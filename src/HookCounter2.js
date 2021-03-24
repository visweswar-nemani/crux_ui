import React,{useState} from 'react'

function HookCounter2() {
    const initialCount =0
    const [count,setCount]=useState(0)
    
    const incrementFive = () =>{
        for(let i =0; i<5 ;i++){
            setCount(Prevcount => Prevcount+1)
            console.log("the value is :"+ count)
        }
        
    }
    return (
        <div>
            Count :{count}
            <button onClick={() => setCount(initialCount)}>Reset</button>
            <button onClick={() => setCount(count+1)}>Increment</button>
            <button onClick={() => setCount(count-1)}>Decrement</button>
            <button onClick={() => incrementFive()}>IncrementFive</button>

            
        </div>
    )
}

export default HookCounter2


