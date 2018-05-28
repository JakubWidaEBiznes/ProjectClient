import React, { Component } from 'react';

import {Main} from '.././Classes'
import {Product} from '.././Classes'
import {Link} from 'react-router-dom';


export default class Browse extends Component
{
constructor(props)
	{
	super(props)
	//this.Main = new Main();
	this.state =
		{
		categories:{},
		keywords:[],
		searchInput:"",
		products:[]
 		}
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleCategoryChange = this.handleCategoryChange.bind(this);
	this.removeKeyword = this.removeKeyword.bind(this);
	this.addKeyword = this.addKeyword.bind(this);
	this.searchButton = this.searchButton.bind(this);
	this.fetchCategories()

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

		let newcats = this.state.categories;
		newcats[name]=value

		this.setState(
			{
			categories:newcats
			});
		}

	fetchCategories()
		{
		var self = this;
		Main.get("all-categories")
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

	addKeyword(keyword)
		{
		let i = this.state.keywords.indexOf(keyword);
		if(i == -1)
			{
			this.state.keywords.push(keyword)
			this.setState({keywords:this.state.keywords})
			}
		}

	removeKeyword(keyword)
		{

		let i = this.state.keywords.indexOf(keyword);
		if(i > -1)
			{
			this.state.keywords.splice(i,1)
		this.setState({keywords:this.state.keywords})
			}
		}

	searchButton()
		{
		var self = this;
		//let parts = this.state.searchInput.split()
		//parts.map((p)=>{self.addKeyword(p)})
		if(this.state.searchInput)
			{	this.addKeyword(this.state.searchInput);}
		this._fetchSearch();
		}

	_fetchSearch()
		{
		var self = this;
		let keywordStr = this.state.keywords.join() || "any"
		let categoryStr = Object.keys(self.state.categories).filter(k=>self.state.categories[k]).join() || "any"

		//console.log(keywordStr,categoryStr);

		Main.get("search-products/"+keywordStr+"/"+categoryStr)
			.then(res=>{
					console.log("res",res)
					var productos = []
					res.map(r=>productos.push(new Product( r.id,r.name,r.description,r.price,r.startSelling,r.stock,r.thumbnail,r.keywords,r.category,r.userName,r.sellerId)))
					this.setState({products:productos})
					})
			.catch(err=>{
				console.log("err",err);
				self.setState({categories:{"error":false}})
				})

		}

render()
	{
	return (
		<div>
		<div className="row">
			<div className="col col-sm-2 bg-light" >
						<p><b>Categories</b></p>
						{
						Object.keys(this.state.categories).map(c=>
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
						    <button className="btn btn-outline-secondary btn-sm" type="button" onClick={this.searchButton}>search</button>
						  </div>
						  <input type="text" className="form-control" name="searchInput" onChange={this.handleInputChange} placeholder=""></input>
						</div>


						{
						this.state.keywords.map(c=>
						<span className="btn-group" >
						<span className="btn btn-primary disabled btn-sm">{c}</span>
						<button className="btn btn-primary btn-sm" onClick={()=>this.removeKeyword(c)}>x</button>
						</span>
							)
						}
				</div>
			<div className="col col-sm-10">
						{
						this.state.products.map(p=>
						<div className="w-25 d-inline-block">
						<div className="card p-2  m-2" >
							<img className="card-img-top w-50 mx-auto" src={Main.IMGURL+p.thumbnail} alt="Card image cap"></img>
							<div className="card-body">
								<h5 className="card-title text-center">
									<Link to={"/product/"+p.id}>{p.name}</Link>
									</h5>
    						<p className="card-text">{p.description.substring(0,128)+"..."}</p>
    						{
								p.keywords.map((k)=>
									<span className="badge badge-primary" onClick={()=>this.addKeyword(k)}>{k}</span>
									)
								}
							</div>
						</div>
						</div>
							)
						}
				</div>
				</div>
		</div>
		)
	}
}
