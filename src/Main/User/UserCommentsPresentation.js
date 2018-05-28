import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class UserCommentsPresentation extends Component
{
constructor(props)
	{
	super(props)

	}

render()
	{
	let self = this;
	return (
		<div>
		{ this.props.comments &&
		<div>
			{	this.props.comments.map(c=>
				<div className="m-2">
				<div className="card ">
				 <div className="card-body">
					<h5 className="card-title">
						<Link to={"/product/"+c.productId} >{c.productName}</Link>
						<span className="float-right mb-2 text-muted">{c.publicationDate}</span>
					</h5>

					<p className="card-text">{c.text}</p>
				</div>
				</div>
				</div>
			)}
		</div>
		}
		</div>
		)
	}
}
