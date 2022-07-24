import React from 'react'
import {useAuthState} from './Context'
import Dashbord from './Pages/Dashbord'
import Login from './Pages/Login'

export default function App() {
  const {token} = useAuthState()
  console.log(token);
    return (
        
           <>
           {token ? <Dashbord/> : <Login/>}
           </>
        
    )
}
