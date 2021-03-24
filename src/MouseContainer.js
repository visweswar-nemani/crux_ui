import React, { useState } from 'react'
import HookCounter3 from './HookCounter3'

function MouseContainer() {
    const [display,setDisplay]=useState(true)
    return (
        <div>
            <button onClick={() => setDisplay(!display)}>Toggle Display</button>
            {display && <HookCounter3/>}
        </div>
    )
}

export default MouseContainer
