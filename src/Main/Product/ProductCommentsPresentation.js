import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import {Main as RestConnector} from '../.././Classes'

export default class ProductCommentsPresentation extends Component
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
			{this.props.mainContainer.state.loggedUser &&
			<div className="m-2">
				<button className="btn btn-success" onClick={()=>{this.props.productContainer.state.addedCommentText = this.state.text; this.props.productContainer.addComment(); this.setState({text:""})}}> publish </button>
				<input className="form-control mr-sm-2 w-100" type="text" name="text" placeholder="text" onChange={this.handleInputChange}></input>
			<div className="card ">
			</div>
			</div>
			}
			{	this.props.productContainer.state.comments.map(c=>
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

	)}
}
