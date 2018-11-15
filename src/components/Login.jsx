import React from "react";
import Joi from "joi";
import Form from "./common/form";
import { login, getCurrentUser } from "../services/loginService";
import {Redirect} from 'react-router-dom'
import logger from '../services/logService'

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    const email = this.state.data.email;
    const password = this.state.data.password;
    try {
    let result = await login({ email, password });  
   if(result.userType && result.userType === "newUser")
   {
    window.location =  `/forcePasswordUpdate/${result.userId}`;
    return;
   }
    const {state}   = this.props.location;
     window.location = state? state.from.pathname : "/dashboard"
    } catch (ex) {
       if(ex.response && ex.response.status === 403)
      {       
        
        const errors = this.state.errors;
        
        errors["email"] = ex.response.data.message;
        this.setState({errors})
      }
    }
  };

  render() {
    logger.logInfo(process.env)
if (getCurrentUser()) 
return <Redirect to ="/"/>

    return (

      <div className = "container mt-5">
      <h2>Please Sign in</h2>
     
      <form className="col-md-6 xs-12" onSubmit={e => this.handleSubmit(e)}>
        {this.renderInput("email", "Email:")}
        {this.renderInput("password", "Password:", "password")}
        {this.renderButton("Submit")}
      </form>
     
      </div>
    );
  }
}

export default Login;
