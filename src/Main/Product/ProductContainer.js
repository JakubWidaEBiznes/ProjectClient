import React, { Component } from 'react';

import {Main as RestConnector} from '../.././Classes'
import ProductPresentation from './ProductPresentation'
import ProductCommentsPresentation from './ProductCommentsPresentation'

import {
	BrowserRouter as Router,
	Route,
	Link
	} from 'react-router-dom';


export default class ProductContainer extends Component
{
constructor(props)
	{
	super(props)
	this.state =
		{
		product:undefined,
		comments:[],
		addedCommentText:""
 		}
	var self = this;
//	console.log(self);
	this.fetchProduct()
	this.fetchComments()
	this.fetchCart()
	}

	fetchProduct()
		{
		var self = this;
		RestConnector.get("product-from-id",self.props.match.params.id)
			.then(res=>{
					self.setState({product:res})
					})
			.catch(err=>{
				console.log("err",err);
				self.setState({product:null})
				})
		}

	fetchComments()
		{
		var self = this;
		RestConnector.get("comments-from-product",self.props.match.params.id)
			.then(res=>{
					//var commentos = []
					//res.map(r=>commentos.push(new Comment( r.text,r.publicationDate,r.userName,r.authorId,r.productId)))
					//self.setState({comments:commentos})

					self.setState({comments:res})
					})
			.catch(err=>{
				console.log("err",err);
				self.setState({comments:[]})
				})
		}

	addComment()
		{
		var self = this;
		if(self.props.mainContainer.state.loggedUser)
			{
			RestConnector.post("add-comment",{test:this.state.addedCommentText,userId:self.props.mainContainer.state.loggedUser.id,productId:self.props.match.params.id})
				.then(res=>{
					console.log("comment added")
					self.fetchComments();
					})
				.catch(err=>{
					console.log("err",err);
					self.setState({comments:[]})
					})
			}
		}

	addToCart()
		{
		var self = this;
		if(self.props.mainContainer.state.loggedUser)
			{
			console.log({userId:self.props.mainContainer.state.loggedUser.id,productId:self.props.match.params.id})
			RestConnector.post("add-to-cart",{userId:self.props.mainContainer.state.loggedUser.id,productId:self.props.match.params.id})
				.then(res=>{self.fetchCart()})
				.catch(err=>{
					console.log("err",err);
					self.setState({comments:[]})
					})
			}
		}

	removeFromCart()
		{
		var self = this;
		if(self.props.mainContainer.state.loggedUser)
			{
			RestConnector.post("remove-from-cart",{userId:self.props.mainContainer.state.loggedUser.id,productId:self.props.match.params.id})
				.then(res=>{self.fetchCart()})
				.catch(err=>{
					console.log("err",err);
					self.setState({comments:[]})
					})
			}
		}

	fetchCart()
		{
		var self = this;
		if(self.props.mainContainer.loggedUser)
			{
			RestConnector.get("remove-from-cart",self.props.mainContainer.state.loggedUser.id)
				.then(res=>{
					self.setState({cart:res});
					})
				.catch(err=>{
					console.log("err",err);
					self.setState({comments:[]})
					})
			}
		}

render()
	{return(
	<div>
		<ProductPresentation productContainer={this} mainContainer={this.props.mainContainer}></ProductPresentation>
		<ProductCommentsPresentation productContainer={this} mainContainer={this.props.mainContainer}></ProductCommentsPresentation>
	</div>
	)}
}
