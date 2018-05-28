import React, { Component } from 'react';

import {default as Browse} from './Browse'
import {default as UserComp} from './UserComp'
import {default as ProductComp} from './ProductComp'
import {default as Start} from './Start'
import {default as MainMenu} from './MainMenu'
import {default as Register} from './Register'
import {
	BrowserRouter as Router,
	Route,
	Link
	} from 'react-router-dom';

import {Main as Maino} from '.././Classes'


export default class Main extends Component
{
constructor(props)
	{

	super(props)
	this.state =
		{
		loggedUser:null,
		error:null
 		}
	}

	login(username,password)
	{
	var self = this;
	Maino.post("login",{username:username,password:password})
		.then(res=>{
		//	console.log("login",res);
			self.setState({loggedUser:res})
				})
		.catch(err=>{
			console.log("err",err);
			self.setState({loggedUser:null,error:err})
			})
	}

	logout()
	{
	var self = this;
	Maino.post("logout",{})
		.then(res=>{
		//	console.log("login",res);
			self.setState({loggedUser:null})
				})
		.catch(err=>{
			console.log("err",err);
			self.setState({loggedUser:null,error:err})
			})
	}

//passing value in other component: <Sample value="???"></Sample>
render()
	{
	return (
		<div>

		<Router>
			<div>
				<MainMenu loggedUser={this.state.loggedUser} error={this.state.error} login={this.login.bind(this)} logout={this.logout.bind(this)}></MainMenu>

				<div className="container ">
					<Route exact path="/" component={Start} />
					<Route path="/user/:id" component={UserComp} />
					<Route path="/product/:id" component={ProductComp} />
					<Route path="/browse" component={Browse} />
					<Route path="/register" component={Register} />
				</div>
			</div>
		</Router>

		</div>
		)
	}
}
