import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route,
	Link
	} from 'react-router-dom';

export default class BrowseMenuPresentation extends Component
{
constructor(props)
	{

	super(props)
	this.state =
		{

 		}
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleCategoryChange = this.handleCategoryChange.bind(this);
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

	handleCategoryChange(event)
		{
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		let newcats = this.props.browseContainer.state.categories;
		newcats[name]=value

		this.props.browseContainer.setState(
			{
			categories:newcats
			});
		}



//TODO: differetn view for logged in and out. logout connection
render()
	{
			let self = this;
	return (
		<div className="bg-light p-2">
			<p><b>Categories</b></p>
			{

			Object.keys(self.props.browseContainer.state.categories).map(c=>
			<div className="form-check">
				<input className="form-check-input" type="checkbox" name={c} value={c} id={c} onChange={this.handleCategoryChange} ></input>
				<label className="form-check-label" htmlFor={c}>
					{c}
				</label>
			</div>
				)
			}
			<div className="input-group mb-3 input-group-sm">
				<div className="input-group-prepend">
					<button className="btn btn-outline-secondary btn-sm" type="button" onClick={()=>{this.props.browseContainer.searchButton(self.state.searchInput)}}>search</button>
				</div>
				<input type="text" className="form-control" name="searchInput" onChange={this.handleInputChange} placeholder=""></input>
			</div>


			{
			this.props.browseContainer.state.keywords.map(c=>
			<span className="btn-group" >
			<span className="btn btn-primary disabled btn-sm">{c}</span>
			<button className="btn btn-primary btn-sm" onClick={()=>this.props.browseContainer.removeKeyword(c)}>x</button>
			</span>
				)
			}
		</div>
		)
	}
}
