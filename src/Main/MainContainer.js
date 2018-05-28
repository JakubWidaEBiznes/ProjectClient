import React, { Component } from 'react';

import MenuPresentation from './MenuPresentation';
import StartPresentation from './Start';
import BrowseContainer from './Browse';
import ProductContainer from './Product';
import RegisterContainer from './Register';
import UserContainer from './User';
import {Main as RestConnector} from '.././Classes'
import {
	BrowserRouter as Router,
	Route,
	Link
	} from 'react-router-dom';


export default class MainContainer extends Component
{
constructor(props)
	{
	super(props);
	this.state={};
	}

	login(username,password)
	{
	console.log("login",username,password)
	var self = this;
	RestConnector.post("login",{username:username,password:password})
		.then(res=>{
			self.setState({loggedUser:res})
			self.getUserCart();
		//	console.log(self.state);
			})
		.catch(err=>{
			console.log("err",err);
			self.setState({loggedUser:null,error:err})
			})
	}

	logout()
	{
	var self = this;
	RestConnector.post("logout",{})
		.then(res=>{
			self.setState({loggedUser:null})
			})
		.catch(err=>{
			console.log("err",err);
			self.setState({error:err})
			})
	}

	getUserCart()
	{
		console.log("carting")
		var self = this;
		RestConnector.get("user-cart-products",self.state.loggedUser.id)
			.then(res=>{
				self.setState({userCart:res})
				})
			.catch(err=>{
				console.log("err",err);
				self.setState({error:err})
				})

	}

	addToCart(productId)
	{
		console.log("carting")
		var self = this;
		RestConnector.post("add-to-cart",{"userId":self.state.loggedUser.id,"productId":productId})
			.then(res=>{
				self.getUserCart()
				})
			.catch(err=>{
				console.log("err",err);
				self.setState({error:err})
				})

	}

	getPropsBrowseContainer()
	{
	return(<BrowseContainer mainContainer={this}></BrowseContainer>)
	}

//passing value in other component: <Sample value="???"></Sample>
render()
	{
	return (
		<div>

		<Router>
			<div>
				<MenuPresentation mainContainer={this}></MenuPresentation>
				<div className="container ">
          <Route exact path="/" component={StartPresentation} />
          <Route exact path="/browse" component={(r)=><BrowseContainer mainContainer={this} match={r.match} />} />
          <Route exact path="/product/:id" component={(r)=><ProductContainer mainContainer={this} match={r.match} />} />
          <Route exact path="/register" component={(r)=><RegisterContainer mainContainer={this} match={r.match} />} />
          <Route exact path="/user/:id" component={(r)=><UserContainer mainContainer={this} match={r.match} />} />
				</div>
			</div>
		</Router>

		</div>
		)
	}
}
