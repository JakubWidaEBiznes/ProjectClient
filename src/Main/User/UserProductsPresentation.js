import React, { Component } from 'react';
import {Main as RestConnector} from '../.././Classes'
import {Link} from 'react-router-dom';

export default class UserProductsPresentation extends Component
{
constructor(props)
	{
	super(props)
	}

render()
	{
	return (
		<div>
			{this.props.products && this.props.products.map(p=>
			<div className="w-25 d-inline-block">
			<div className="card p-2  m-2" >
				<img className="card-img-top w-50 mx-auto" src={RestConnector.IMGURL+p.thumbnail} alt="Card image cap"></img>
				<div className="card-body">
					<h5 className="card-title text-center">
						<Link to={"/product/"+p.id}>{p.name}</Link>
						</h5>
					<p className="card-text">{p.description.substring(0,128)+"..."}</p>
				</div>
			</div>
			</div>
				)
			}
		</div>
		)
	}
}
