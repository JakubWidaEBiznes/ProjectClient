import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Validator} from '../.././Classes'

export default class RegisterContainer extends Component
{
constructor(props)
	{
	super(props);
	this.state=
		{
		validation:false,
		password:{validation:false,errors:[]},
		email:{validation:false,errors:[]},
		username:{validation:false,errors:[]},
		};
	var self =this;
	this.password=new Validator({longer:8,shorter:32,complex:""}),
	this.email=new Validator({email:""}),
	this.username=new Validator({longer:5,shorter:32}),
  this.handleInputChange = this.handleInputChange.bind(this);
	}

  handleInputChange(event)
		{
		let self =this;
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		//console.log(name,self)

		let o = self[name].update(value);

		//console.log(o)
		this.state[name] = o;

		this.setState(
			{
				[name]: o
    	},
			self.checkValidation()
			);
		//console.log(self.state);
		//this.checkValidation()

  }


checkValidation()
	{
		var self = this;
	if([this.state.password,this.state.email,this.state.username].every((o)=>{return o.validation}))
		{
		this.setState({validation:true})
		}
	else
		{
		this.setState({validation:false})
		}
		//console.log(self.state)
	}


//passing value in other component: <Sample value="???"></Sample>
render()
	{
	var self = this;
	return (
	<div>
	  <div className="form-group">
	    <label htmlFor="exampleInputEmail1">Email address</label>
	    <input type="email" className="form-control" name="email" id="email" placeholder="user@mail.com" onBlur={this.handleInputChange}></input>
			{
			this.state.email.errors &&
			<span className="badge badge-danger">{this.state.email.errors[0]}</span>
			}
	  </div>
	  <div className="form-group">
	    <label htmlFor="username">Username</label>
	    <input type="text" className="form-control" name="username" id="username" placeholder="username" onBlur={this.handleInputChange}></input>
			{
			this.state.email.errors &&
			<span className="badge badge-danger">{this.state.username.errors[0]}</span>
			}
	  </div>
	  <div className="form-group">
	    <label htmlFor="password1">Password</label>
	    <input type="password" className="form-control" name="password" id="password" placeholder="Password" onBlur={this.handleInputChange}></input>
			{
			this.state.email.errors &&
			<span className="badge badge-danger">{this.state.password.errors[0]}</span>
			}
	  </div>
	  <button className="btn btn-primary" onClick={()=>{this.props.registerContainer.register(self.state.username.value, self.state.email.value,self.state.password.value)}} disabled={!this.state.validation===true}>Submit</button>
			{
			this.props.registerContainer.state.error &&
			<span className="badge badge-danger">this.props.registerContainer.state.error.message</span>
			}
	</div>
		)
	}
}
