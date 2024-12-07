import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const backendUrl = window.location.hostname === 'localhost' ? 
  'http://localhost:5000' : 
  'http://192.168.49.2:30010';

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({email: "", password: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${backendUrl}/api/loginuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            })
        });
        
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert('Enter Valid arguments');
        } else {
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(json.authToken);
            navigate('/')
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };
  return (
    <div>
      <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/createuser" className="m-3 btn btn-primary">New User</Link>
                </form>
            </div>
    </div>
  )
}
