import React, { useState } from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import styles from "../styles/global.module.css";

export const getStaticProps = () => {
    let url = process.env.BASE_URL;
    return {
        props: {
            baseurl: url
        }
    }
}

const Login = (props) => {
    const [formdata, setFormdata] = useState({});
    const [submitStatus, setSubmitStatus] = useState(false);
    const router = useRouter();
    const {baseurl} = props;
    console.log('baseurl', baseurl);

    const loginFn = async () => {
        console.log('formdata', formdata, process.env.BASE_URL);
        const url =  baseurl + 'api/users/login';
        try{
            const response = await axios.post(url, formdata);
            console.log(response.data);
            if(response.data.userid) {
                localStorage.setItem('loginStatus', true);
                localStorage.setItem('username', response.data.email);
                localStorage.setItem('name', response.data.name)
                router.push('/');
            }
        }
        catch{
            setSubmitStatus(true);
        }
    }

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        let tempObj = {};
        tempObj[e.target.name] = e.target.value;
        setFormdata({...formdata, ...tempObj});
    }

  return (
    <div>
      
      {submitStatus && (
            <div class="alert alert-danger" role="alert">
                This is a danger alert—check it out!
                </div>
        )}
         <div className={styles.center_div}>
            <h3 className='mb-4 text-center'> Login</h3>
         <input type="email" name="email" className='form-control' placeholder='Enter E-mail' onChange={handleChange}/>
        <br /> 
        
         <input type="password" name="password" className='form-control' placeholder='Password' onChange={handleChange}/>
         <br /> 
         <h6> Don't have an account <a href="/registeration"> Register</a></h6>
         <br /> 
        
        <button className='btn btn-success' onClick={loginFn}>Submit</button>
       
        </div>

    </div>
  )
}

export default Login
