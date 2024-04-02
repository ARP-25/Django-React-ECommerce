import React from 'react'
import { useAuthStore } from '../../store/auths'
import { Link } from 'react-router-dom'




function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user
    ])


  return (
    <>  
        {isLoggedIn()
        ?   <div> 
                <h1> Dashboard </h1>
                <Link to="/logout">Logout</Link>
            </div>

        :   <div> 
                <h1>Home Page </h1>
                <Link to="/login">Login</Link><br />    
                <Link to="/register">Register</Link> 
            </div>
        }
    </>
  )
}

export default Dashboard
