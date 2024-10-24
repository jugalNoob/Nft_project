import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style/for.css"
function Forget() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    let errors = {};

    // Your validation logic here

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const [optall , setOpt]=useState()
  const Opts=()=>{
    const optss=Math.floor(Math.random()*12345)
setOpt(optss)
  }

  
  const addUserdata = async (e) => {
    e.preventDefault();

    try {
      if (!password || !email  || !optall) {
        alert('Missing required fields');
      } else {
        const isValid = handleValidation();

        if (isValid) {
          const data = await fetch(`/Signup/${email}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
          });

          const res = await data.json();
          console.log(res);

          if (res.status === 201) {
            alert('Check your form');
          } else {
            navigate('/');
            console.log(email, password);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

<div className="allform">
<div className="Ramdoms">
  <center>
<h1>Opt:: {optall ? optall :"no opt"}</h1>
<br />
<button onClick={Opts}>click</button>
</center>
</div>
{/* $2a$12$LWrPyO3T9ncMiC8L4l9XzOkwONlkWTPpHmjH6fHMGizsfqqY7RPMO */}
<div className='forms'>

      <form onSubmit={addUserdata}>
        <center>
          <input type="text" name="" id="" onChange={(e)=>setOpt(e.target.value)}  placeholder='enter opt'/>
          <br />
          <br />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter email"
          />
          <br />
          <br />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
          />
          <br />
          <br />
          <button type="submit">forget</button>
        </center>
      </form>
      </div>
    </div>
    </div>
  );
}

export default Forget;


// XYZd7c3ac1939db26@Gmail.Com