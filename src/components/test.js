import React, { useEffect, useState } from 'react'

const Test = () => {
    const [add,setAdd]= useState(2);
    const [bac,setBac] = useState(false);
    useEffect(()=>{
        setBac(true);
    },[add])
  return (
    <>
    <div>test{add}</div>
    <button  onClick={()=>setAdd(add+1)}>add</button>
    <button onClick={()=>setAdd(add-1)}>add</button>
    <button onClick={()=>setBac(!bac)}>ch</button>
    {bac && <p>hi</p>}
    </>
  )
}

export default Test