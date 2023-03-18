import React from 'react'

const MainPage = () => {
  return (
    <div>
      <h1>PLEASE LOGIN</h1>
      <button onClick={()=>{
        auth.login(()=>{
          
        })
      }}>Login</button>
    </div>
  )
}

export default MainPage