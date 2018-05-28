import React, { Component } from 'react';

import RegisterPresentation from './RegisterPresentation';

import {Main as RestConnector} from '../.././Classes'
import {Link} from 'react-router-dom';


export default class RegisterContainer extends Component
{
constructor(props)
	{
	super(props);
	this.state={success:null,error:null};
	}

register(username,email,password)
	{
	//console.log("register",username,password)
	var self = this;
	RestConnector.post("register",{username:username,email:email,password:password})
		.then(res=>{
			self.setState({success:true})
			//self.getUserCart();
		//	console.log(self.state);
			})
		.catch(err=>{
			console.log("err",err);
			self.setState({error:err})
			})
	}


//passing value in other component: <Sample value="???"></Sample>
render()
	{
	if(this.state.success)
		{return (<p>Registration successfull. Please log in.</p>)}
	if(this.props.mainContainer.loggedUser)
		{return(<p>Please log out before registering</p>)}
	else
		{return(<RegisterPresentation registerContainer={this} mainContainer={this.props.mainContainer}></RegisterPresentation>)}
	}
}
