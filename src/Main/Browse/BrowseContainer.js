import React, { Component } from 'react';

import BrowseMenuPresentation from './BrowseMenuPresentation'
import BrowseProductsPresentation from './BrowseProductsPresentation'

import {Main as RestConnector} from '../.././Classes'
import {
	BrowserRouter as Router,
	Route,
	Link
	} from 'react-router-dom';


export default class BrowseContainer extends Component
{
constructor(props)
	{
	super(props);
	this.state=
		{
		categories:[],
		products:[],
		keywords:[]
		};
	this.fetchCategories();
	}

fetchCategories()
	{
	var self = this;
	RestConnector.get("all-categories")
		.then(res=>{
				let c = {}
				res.map(r=>c[r]=false)
				self.setState({categories:c})
				})
		.catch(err=>{
			console.log("err",err);
			self.setState({categories:{"error":false}})
			})
	}


fetchSearch(categories,keywords)
	{
	var self = this;
	let keywordStr = this.state.keywords.join() || "any"
	let categoryStr = Object.keys(self.state.categories).filter(k=>self.state.categories[k]).join() || "any"

	RestConnector.get("search-products",keywordStr,categoryStr)
		.then(res=>{
				//console.log("res",res)
				//var productos = []
				//res.map(r=>productos.push(new Product( //r.id,r.name,r.description,r.price,r.startSelling,r.stock,r.thumbnail,r.keywords,r.category,r.userName,r.sellerId)))
				this.setState({products:res})
				})
		.catch(err=>{
			console.log("err",err);
			self.setState({categories:{"error":false}})
			})
	}

addKeyword(keyword)
	{
	if(this.state.keywords.indexOf(keyword)<0)
		{
		let keywords = this.state.keywords;
		keywords.push(keyword)
		this.setState(keywords:keywords)
		}
	}

removeKeyword(keyword)
	{
	const io = this.state.keywords.indexOf(keyword)
	if(io>0)
		{
		let keywords = this.state.keywords.splice(io,1)
		this.setState(keywords:keywords)
		}
	}

	searchButton(input)
		{
		var self = this;
		if(input)
			{	this.addKeyword(input);}
		this.fetchSearch();
		}

render()
	{return(
	<div className="row">
		<div className="col-sm-2">
			<BrowseMenuPresentation mainContainer={this.props.mainContainer} browseContainer={this}></BrowseMenuPresentation>
		</div>
		<div className="col-sm-10">
		<BrowseProductsPresentation mainContainer={this.props.mainContainer} browseContainer={this}></BrowseProductsPresentation>
		</div>
	</div>
	)}
}
