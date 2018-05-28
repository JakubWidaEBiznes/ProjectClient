import React, { Component } from 'react';

import {Main as RestConnector} from '../.././Classes'
import UserCommentsPresentation from './UserCommentsPresentation'
import UserProductsPresentation from './UserProductsPresentation'
import UserCartPresentation from './UserCartPresentation'
import {Link} from 'react-router-dom';


export default class User extends Component
{
constructor(props)
	{
	super(props)
	this.state =
		{
		user:null,
		cart:null,
		comments:null,
		sold:null,
		isLogged:false,

		chosenTab:"comments",
		choosableTabs:["comments","sold"]
 		}
	var self = this;
	this.wasLoggedFlag=false,
	this.fetchUser();


	}

componentDidUpdate()
	{
	var self = this;

	if(this.props.mainContainer.state.loggedUser && (this.props.mainContainer.state.loggedUser.id == this.state.user.id))
		{
		if(!this.wasLoggedFlag)
			{
			self.setState({choosableTabs:["comments","sold","cart","orders"]});
			self.fetchCart()
			self.fetchSellOrders()
			self.setState({isLogged:true,})
			this.wasLoggedFlag = true;
			}
		}
	else
		{
		if(this.wasLoggedFlag)
			{
			self.setState({choosableTabs:["comments","sold"]});
			self.setState({isLogged:false})
			this.wasLoggedFlag = false;
			}
		}
	}

fetchUser()
	{
	var self = this;
	RestConnector.get("user-from-id",self.props.match.params.id)
		.then(res=>{
				self.state.user = res;
				console.log(self.state)
				self.setState({user:res})
				self.fetchComments();
				self.fetchSold();
				})
		.catch(err=>{
			console.log("err",err);
			self.setState({error:err})
			})
	}

fetchComments()
	{
		var self = this;
	console.log("fetchin comments",self.state)
	if(self.state.user)
		{
		RestConnector.get("comments-from-user",self.state.user.id)
			.then(res=>{
					self.state.comments = res;

					self.setState({comments:res})
					})
			.catch(err=>{
				console.log("err",err);
				self.setState({error:err})
				})
		}
	}

	fetchCart()
	{
		var self = this;
	if(self.state.user)
		{
		RestConnector.get("user-cart-products",self.props.mainContainer.state.loggedUser.id)
			.then(res=>{
				self.setState({cart:res})
				})
			.catch(err=>{
				console.log("err",err);
				self.setState({error:err})
				})
		}
	}

	fetchSold()
	{
		var self = this;
		if(self.state.user)
		{
		console.log("solling")
		RestConnector.get("user-sells-products",self.state.user.id)
			.then(res=>{
				self.setState({sold:res})
				})
			.catch(err=>{
				console.log("err",err);
				self.setState({error:err})
				})
		}
	}

	buy()
	{
		var self = this;
		if(self.state.user)
		{
		console.log("buy cart")
		RestConnector.get("buy-cart-user",self.state.user.id)
			.then(res=>{
				self.setState({cart:null})
				})
			.catch(err=>{
				console.log("err",err);
				self.setState({error:err})
				})
		}
	}

	fetchSellOrders()
	{
		var self = this;
		if(self.state.user)
		{
		console.log("ordersSell")
		RestConnector.get("orders-sell-from-user",self.state.user.id)
			.then(res=>{
				self.setState({ordersSell:res})
				})
			.catch(err=>{
				console.log("err",err);
				self.setState({error:err})
				})
		}
	}

render()
	{return(
	<div>
			{ this.state.user &&
			<div>
			<div className="m-2">
				<div className="card ">
				 <div className="card-body">
					<h5 className="card-title">
						<span >{this.state.user.name}</span>
						<span className="float-right mb-2 text-muted">{this.state.user.joindate}</span>
					</h5>
				</div>
			</div>
		</div>

		<ul className="nav nav-tabs m-2">
			{ this.state.choosableTabs.map(t =>
		  <li className="nav-item">
		    <span className={"nav-link active"+ (this.state.chosenTab==t ? '' : 'active')} onClick={()=>{this.setState({chosenTab:t})}}>{t}</span>
		  </li>
				)
			}
		</ul>
			{this.state.chosenTab=="comments" && <UserCommentsPresentation comments={this.state.comments}/>}
			{this.state.chosenTab=="sold" && <UserProductsPresentation products={this.state.sold}/>}
			{this.state.chosenTab=="cart" && <UserCartPresentation cart={this.state.cart} userContainer={this}/>}
		</div>

		}
		{
		!this.state.user &&
		<span className="badge badge-danger">could not load user data</span>
		}
	</div>
	)}
}
