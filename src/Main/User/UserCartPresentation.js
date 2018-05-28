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
			{ this.props.cart &&
			<div>
				<div className="card">
				<div>
					{ this.props.cart.map(p=>
					<div className="w-25 d-inline-block">
					<div className="card p-2  m-2" >
						<img className="card-img-top w-50 mx-auto" src={RestConnector.IMGURL+p.thumbnail} alt="Card image cap"></img>
						<div className="card-body">
							<h5 className="card-title text-center">
								<Link to={"/product/"+p.id}>{p.name}</Link>
								</h5>
							<p className="card-text">{p.description.substring(0,128)+"..."}</p>
							<p className="card-text">Price: {p.price} x{p.stock} = <b>{(p.price*p.stock).toFixed(2)}</b></p>
						</div>
					</div>
					</div>
						)
					}
				{this.props.cart &&
					<h5 className="p-2">Total: <b>{ this.props.cart.reduce((o,n)=>{return(o+(n.price*n.stock))},10) }</b>
					<button className="btn btn-primary" onClick={()=>{this.props.userContainer.buy()}}>Buy</button>
					</h5>}
				</div>
				</div>
			</div>
		}
		{!this.props.cart &&
		<h5 className="p-2">Your cart is empty</h5>
			}
		</div>
		)
	}
}
