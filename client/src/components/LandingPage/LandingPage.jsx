import { Link } from 'react-router-dom';

import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


function LandingPage(){
    return (
        <>
        <Link
            to='/home'>
            <button>
                HOME
            </button>
        </Link>    
        
	    {/* Loguin form attempt 1*/}
<div className="vh-50">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-7">   {/* image sizing here */}
        <img src="https://www.realestatemarket.com.mx/images/2022/05-mayo/1305/se-suman-fondos-de-inversion-proptech-latam-2022-g.jpg"
          className="img-fluid" alt="Enter the Town" />
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <button type="button" className="btn btn-dark btn-floating mx-1">
            <FacebookIcon />  
	    </button>

            <button type="button" className="btn btn-dark btn-floating mx-1">
           <GitHubIcon />
	    </button>

            <button type="button" className="btn btn-dark btn-floating mx-1">
	    <LinkedInIcon />
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or if you have an Account:</p>
          </div>

	    {/* Email Field */} 
          <div className="form-outline mb-4">
            <input type="email" id="EmailField" className="form-control form-control-lg"
              placeholder="Enter a valid email address" />
            <label className="form-label" for="EmailField">Email address</label>
          </div>

          {/* Password Field */} 
          <div className="form-outline mb-3">
            <input type="password" id="PassField" className="form-control form-control-lg"
              placeholder="Enter password" />
            <label className="form-label" for="PassField">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
     


          {/* Remember check */} 
	    <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="RememberCheck" />
              <label className="form-check-label" for="RememberCheck">
                Remember me
              </label>
            </div>


          {/* Forgot pass Q */} 
            <a href="#!" className="text-body">Forgot your password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-dark btn-lg" 
              style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</div>












	    </>

    );
}

export default LandingPage;
