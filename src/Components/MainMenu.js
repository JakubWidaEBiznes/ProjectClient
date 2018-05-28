import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route,
	Link
	} from 'react-router-dom';

export default class MainMenu extends Component
{
constructor(props)
	{

	super(props)
	this.state =
		{

 		}
  this.handleInputChange = this.handleInputChange.bind(this);
	}

  handleInputChange(event)
		{
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState(
			{
			[name]: value
    	});
  }

//TODO: differetn view for logged in and out. logout connection
render()
	{
	return (
		<div >
		<nav className="navbar navbar-expand-lg navbar-light bg-light ">
		<Link className="navbar-brand" to="/">Start</Link>
		 <ul className="navbar-nav mr-auto">
			<li className="nav-item active">
				<Link className="nav-link" to="/browse">browse</Link>
			</li>
		</ul>

		<div className="form-inline my-2 my-lg-0">
			<input className="form-control mr-sm-2" type="username" name="username" placeholder="username" onChange={this.handleInputChange} ></input>
			<input className="form-control mr-sm-2" type="password" name="password" placeholder="password" onChange={this.handleInputChange}></input>
			<button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>{
			var self = this;
			this.props.login(self.state.username,self.state.password);
			}}>Login</button>
			<span className="navbar-nav nav-item active">
				<Link className="nav-link" to="/register">register</Link>
			</span>
		</div>

		</nav>
		</div>
		)
	}
}
