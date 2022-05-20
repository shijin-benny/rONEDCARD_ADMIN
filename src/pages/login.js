import React,{useState} from 'react'
// import lockimage from '../assets/img/lock.svg'
import  login  from '../assets/img/login.svg'
import axios from 'axios'
// import { Link } from 'react-router-dom'


function Login() {

    const initialState = {
        username: '',
        password:''
    }
    const [values,setValues]=useState(initialState)
    const [Error,setError]=useState('')
    const handleChange = (event) => {
        setValues({...values,[event.target.name]:event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('https://rone-card.herokuapp.com/api/adminlogin',values).then((res)=>{
          console.log(res.data);
          if(res.data.status===200){
            window.location.href='/dashboard'
          }else{
            console.log(res);
            setError(res.data.message)
          }
        }).catch((err)=>{
          console.log(err);
        }
        )
    }
    console.log(Error);
  return (
    <div className=' w-screen h-screen flex flex-col justify-center items-center lg:grid'>
                {/* <img src={lockimage} alt="lock" className='fixed hidden lg:block h-3/6 w-3/6' /> */}
                <form className='flex flex-col  items-center max-w-lg' >
                    <img src={login} alt="" className='w-42 pb-3' />
                    <h2 className='my-8 font-display text-3xl font-semibold'>Welcome Admin</h2>
                    {Error && <p className='ml-5 text-red-600'>{Error}</p>}
                    <div className='relative'>
                      <span className='absolute'>
                      <i className='material-icons text-2xl text-teal-600 border-r-2 py-2'>account_circle</i>
                      </span>                                    
                        <input type="text" placeholder='Enter username' className='pl-8 py-2 border-b-2 font-display focus:outline-none focus:border-teal-600 transition-all duration-500  text-lg'
                         name='username'
                         value={values.username}
                         onChange={handleChange}
                        />

                    </div>
                    <div className='relative mt-8' >
                        <span className='absolute'>
                        <i className='material-icons text-2xl text-teal-600 border-r-2 py-2'>lock</i>
                        </span>
                    
                        <input type="text" placeholder='Enter password' className='pl-8 py-2 border-b-2 font-display focus:outline-none focus:border-teal-600 transition-all duration-500  text-lg' 
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        />
                    </div>
                    <button className='py-3 px-20 mt-8 bg-red-500 rounded-full text-white font-bold uppercase text-lg transform hover:translate-y-1 hover:bg-teal-600 transition-all duration-500' onClick={handleSubmit}>Login</button>
                    <div className='mt-8 shadow-lg border-2 '>                      
                    </div>
                   
                </form>
             
            </div>
  )
}

export default Login