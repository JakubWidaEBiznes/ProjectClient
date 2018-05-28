import React, { Component } from 'react';
import {Main as RestConnector} from '../.././Classes'
import {
	BrowserRouter as Router,
	Route,
	Link
	} from 'react-router-dom';

export default class BrowseProductPresentation extends Component
{
constructor(props)
	{

	super(props)
	this.state =
		{

 		}
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
	{
	return (
		<div >
			{
			this.props.browseContainer.state.products.map(p=>
			<div className="w-25 d-inline-block">
			<div className="card p-2  m-2" >
				<img className="card-img-top w-50 mx-auto" src={RestConnector.IMGURL+p.thumbnail} alt="Card image cap"></img>
				<div className="card-body">
					<h5 className="card-title text-center">
						<Link to={"/product/"+p.id}>{p.name}</Link>
						</h5>
					<p className="card-text">{p.description.substring(0,128)+"..."}</p>
					{
					p.keywords.map((k)=>
						<span className="badge badge-primary" onClick={()=>this.props.browseContainer.addKeyword(k)}>{k}</span>
						)
					}
				</div>
			</div>
			</div>
				)
			}
		</div>
		)
	}
}
