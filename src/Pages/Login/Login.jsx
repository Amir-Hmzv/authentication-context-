import React from 'react';
import   './style.css'
import axios from 'axios'
import { useAuthDispatch,useAuthState } from '../../Context';
import {actionTypes} from '../../Context/reducer'
import { useLayoutEffect,useEffect,useState } from 'react';
    const fetchToken = async (username,password) => {
return axios.post(`http://localhost:3001/login`,{
    username,password
})
    }

    const fetchCurrentUserInfo =   (token) => {
    return axios.get(`http://localhost:3001/users/me`,{
        headers: {
            authorization : token
        }
    }).then(res => res.data)
    }


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)
        const handleLogin =  (e) => {
            e.preventDefault()
            fetchToken(username,password)
            .then(({data}) => {
                console.log(data);
                if(data.success) setToken(data.data)
                }
            )

        }
        const { loading } = useAuthState()
        const dispatch = useAuthDispatch()

        useLayoutEffect(() => {
            const token = localStorage.getItem('token')
            if (token) {
                dispatch({
                    type: actionTypes.LOGIN_REQUEST,
                })
                setToken(token)
            }
        }, [])


        useEffect(() => {
           if (token) {
            fetchCurrentUserInfo(token)
           .then(({success,data}) =>  {
            localStorage.setItem('token',token)
                if (success) {
                    dispatch({type:actionTypes.LOGIN_SUCCESS ,payload: {
                        user : data,
                        token:token
                    }})
                }
           })
           }
            
        
        }, [token])
    return (
        <>
        {
            loading ? <p>Loading....</p> :
            <div className="login">
        <h1>Login</h1>
        <form method="post" onSubmit={handleLogin}>
            <input  value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" required="required" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required="required" />
            <button type="submit" className="btn btn-primary btn-block btn-large">Let me in.</button>
        </form>
    </div>
        }
        
        </>
    );
};

export default Login;