import React, { Component } from 'react';
import {Main} from '.././Classes'
import {Product, Comment} from '.././Classes'
import {Link} from 'react-router-dom';

export default class ProductComp extends Component
{
constructor(props)
	{

	super(props)
	this.state =
		{
		comments:[],
		addedCommentText:""
 		}
	this.fetchProduct()
	this.fetchComments()
	}

	fetchProduct()
		{
		var self = this;
		Main.get("product-from-id/"+self.props.match.params.id)
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
		Main.get("comments-from-product/"+self.props.match.params.id)
			.then(res=>{
					var commentos = []
					res.map(r=>commentos.push(new Comment( r.text,r.publicationDate,r.userName,r.authorId,r.productId)))
					self.setState({comments:commentos})

					//self.setState({comments:res})
					})
			.catch(err=>{
				console.log("err",err);
				self.setState({comments:[]})
				})
		}

render()
	{
	return (
		<div>
		<p>product component {this.props.match.params.id}</p>
		{
		this.state.product ?
			(
			<div>
			<h3>{this.state.product.name}</h3>
			<p>{this.state.product.startSelling}</p>
			<img className="mx-auto" src={Main.IMGURL+this.state.product.thumbnail} alt="thumbnail img"></img>
			<div> <h3 className="d-inline"><span className="badge badge-primary">price: {this.state.product.stock} </span></h3>
			<p className="d-inline"> <b>items left in stock: {this.state.product.stock} </b></p>
			</div>
			<p>{this.state.product.description}</p>

			</div>
			) : (
			<span class="badge badge-success">product could not have been loaded available</span>
			)
		}




		{
		this.state.comments.map(c=>
			<div className="m-2">
			<div className="card ">
			 <div className="card-body">
		    <h5 className="card-title">
					<Link to={"/user/"+c.authorId} >{c.userName}</Link>
					<span className="float-right mb-2 text-muted">{c.publicationDate}</span>
				</h5>

		    <p className="card-text">{c.text}</p>
		  </div>
			</div>
			</div>
		)}
		</div>
		)
	}
}
