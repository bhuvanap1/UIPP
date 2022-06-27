import Nav from "./Nav"
import "../styles/login.css"
const LoginForm = () => {
  return(
<div> 
  <Nav/> 

<div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>LOGIN</h3>
				<div class="d-flex justify-content-end social_icon">
				
				</div>
			</div>
			<div class="card-body">
				<form>
					<div class="input-group form-group">
						<div class="input-group-prepend">
						
						</div>
						<input type="text" class="form-control" placeholder="Email"/>
						
					</div>
          <hr/>
					<div class="input-group form-group">
						<div class="input-group-prepend">
					
						</div>
						<input type="password" class="form-control" placeholder="Password"/>
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