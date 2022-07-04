import React, { useState } from 'react';
import Nav from "./Nav"
import { Link } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";

const RegisterForm = () => {

    const [user, setUser] = useState({
      username: '', 
      password: '',
      password2: ''
    });
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
  
    const {username, password, password2} = user;  
  
    const onChange = (e) => setUser({...user, [e.target.name]: e.target.value})
  
    const onSubmit = async(e) => {
      e.preventDefault();
      var isValid = true;
      setErrorAlert(false);
      setSuccessAlert(false);
      if(password !== password2){
        isValid = false;
        setErrorAlert("Retype password");
      }
      
      if(isValid){
        await axios.post('http://localhost:3005/user/register', {
            username: username,
            password: password,
        }).then(function (response) {
            setUser({
              username: '', 
              password: '',
              password2: ''
            });
            setSuccessAlert(response.data.message);
          })
          .catch(function (error) {
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
              <div className="container register">
              <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-md-9 register-right">
                        {successAlert && 
                            <div className="alert alert-success" role="alert">
                              {successAlert}
                            </div>
                          }

                          {errorAlert && 
                            <div className="alert alert-danger" role="alert">
                              {errorAlert}
                            </div>
                          }
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Registration</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                          
                                        <div className="form-group">
                                        <input  type="text" placeholder="User Name"  className="form-control fields"  id="username" name='username' onChange={onChange} value={username} required/>                               </div>
                                        <hr/>
                                        <div class="form-group">
                                        <input  type="password" placeholder="Password" className="form-control fields" id="password" name='password' onChange={onChange} value={password} required />                                        </div>
                                        <hr/>
                                        <div class="form-group">
                                        <input  type="password" placeholder="Confirm Password" className="form-control fields" id="password2" name='password2' onChange={onChange} value={password2} required/>                                        </div>
                                        <hr/>
                                        
                                    </div>
                                    
                                   
                                        <input type="submit" class="btnRegister"  value="Register"/>
                                        

                                </div>
                                <div>
                                    <hr/>
                                            <p className="gender">If already registred, please click the on login</p>
                                        <Link className="login_btn1" to="/login">Login</Link>

                                        </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
</form>
            </div>
        
        </div>

    );
 }
            export default  RegisterForm;