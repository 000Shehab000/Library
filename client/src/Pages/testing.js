import { useEffect, useState } from "react";


const Testing =()=>{

    // const [counter, setCounter] =useState(2)
    // const dec =()=>{
    //     setCounter(counter-1)
    // }
    // const inc =()=>{
    //     setCounter(counter +1)
    // }

    // return(
    //     <>
    //     <button style={{padding:"10px"}} onClick={inc}>+</button>
    //     <p>{counter}</p>
    //     <button style={{padding:"10px"}} onClick={dec}>-</button>
    //     </>
    // )
    const [list,setList]=useState("posts")
    useEffect(()=>{
        console.log("useEffect Run");
    })
    return(
        <>
        <button onClick={()=>setList("posts")}>posts</button>
        <button onClick={()=>setList("users")}>users</button>
        <button onClick={()=>setList("comments")}>comments</button>
        <p>{list}</p>
        </>
    )

}

export default Testing;