import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import {Main as RestConnector} from '../.././Classes'

export default class ProductPresentation extends Component
{
constructor(props)
	{
	super(props)
	//this.props = {}
	this.state=
		{
		thisProductStockNumber:undefined
		}
	var self = this;
  this.handleInputChange = this.handleInputChange.bind(this);
	if(self.props.mainContainer.loggedUser && self.props.productContainer.cart)
		{
		self.props.productContainer.cart.forEach(p=>{if(p==self.props.productContainer.product){self.state.thisProductStockNumber = p.stock}})
		self.state.thisProductStockNumber = self.props.productContainer.cart}
	else
		{self.state.thisProductStockNumber = 0}
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

render()
	{return(

		<div >
				{
				this.props.productContainer.state.product ?
					(
					<div>
					<h3>{this.props.productContainer.state.product.name}</h3>
					<p>{this.props.productContainer.state.product.startSelling}</p>
					<img className="mx-auto" src={RestConnector.IMGURL+this.props.productContainer.state.product.thumbnail} alt="thumbnail img"></img>
					<div> <h3 className="d-inline"><span className="badge badge-primary">price: {this.props.productContainer.state.product.price} </span></h3>
					<p className="d-inline"> <b>items left in stock: {this.props.productContainer.state.product.stock} </b></p>
					</div>
					<p>{this.props.productContainer.state.product.description}</p>
					<h5>Seller: <Link to={"/user/"+this.props.productContainer.state.product.sellerId} > {this.props.productContainer.state.product.userName}</Link></h5>
					{
					this.props.mainContainer.state.loggedUser &&
						<div>
						<p>products in cart: {this.state.thisProductStockNumber}</p>
						<button className="btn btn-primary" onClick={()=>{this.props.productContainer.addToCart()}}>+1</button>
						<button className="btn btn-primary" onClick={()=>{this.props.productContainer.removeFromCart()}}>-1</button>
						</div>
					}



					</div>
					) : (
					<span className="badge badge-success">product could not have been loaded available</span>
					)
				}
		</div>

	)}
}
