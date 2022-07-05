import React, { useState} from 'react';
import axios from "axios";
import Nav from "./Nav"
import "../styles/login.css";
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
	const [user, setUser] = useState({
		username: '', 
		password: '',
	});
	const [errorAlert, setErrorAlert] = useState(false);
	const {username, password,} = user; 
	const navigate = useNavigate();
	const onChange = (e) => setUser({...user, [e.target.name]: e.target.value});
	const onSubmit = async(e) => {
		e.preventDefault();
		var isValid = true;
		setErrorAlert(false);
		if(username === ''){
			isValid = false;
			setErrorAlert("Username is required");
		}
		
		if(password === ''){
		  isValid = false;
		  setErrorAlert("Password is required");
		}
		if(isValid){
			await axios.post('http://localhost:3005/user/login', {
                username: username,
                password: password,
            }).then(function (response) {
                setUser({
					username: '', 
					password: '',
				});
                // handle success
                console.log(response);
                navigate("/profile");
              })
              .catch(function (error) {
                // handle error
                console.log(error);
                if (error.response) {
                    setErrorAlert(error.response.data.message);
                }
              })
		
	  	}
	
	}

  return(
<div style={{backgroundImage: `url("https://searchengineland.com/figz/wp-content/seloads/2014/08/social-network-media-data-ss-1920.jpg")`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh"}}> 
  <Nav/> 

<div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card-login">
			<div class="card-header">
				<h3>LOGIN</h3>
				<div class="d-flex justify-content-end social_icon">
				
				</div>
			</div>
			<div class="card-body">
				{errorAlert && 
					<div className="alert alert-danger" role="alert">
						{errorAlert}
					</div>
				}
				<form onSubmit={onSubmit}>
					<div class="input-group form-group">
						<div class="input-group-prepend">
						
						</div>
						<input name='username' onChange={onChange} value={username} type="text" class="form-control" placeholder="Username"/>
						
					</div>
          <hr/>
					<div class="input-group form-group">
						<div class="input-group-prepend">
					
						</div>
						<input name='password' onChange={onChange} value={password} type="password" class="form-control" placeholder="Password"/>
					</div>
          <hr/>
					<div class="row align-items-center remember">
						<input type="checkbox"/>Remember Me
					</div>
          <hr/>
					<div class="form-group">
						<input type="submit" value="Login" class="btn float-right login_btn"/>
					</div>
				</form>
			</div>
		
			
			</div>
		</div>
	</div>
</div>
    );
    }
    export default LoginForm;